---
author: th0m.as
cover_image: ''
date: '2025-07-21T16:37:17.685Z'
dateFolder: 2025/07/21
description: My Blog.
isBasedOn: 'https://blog.th0m.as/misc/fingerprint-reversing/'
link: 'https://blog.th0m.as/misc/fingerprint-reversing/'
slug: 2025-07-21-httpsblogth0masmiscfingerprint-reversing
tags:
  - code
title: Reversing a Fingerprint Reader Protocol
---
<p>TLDR: The sensor uses TLS-PSK over USB. We overwrite the PSK and are able to read images.</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/fingerprint_scan.gif"><img src="https://blog.th0m.as/misc/fingerprint-reversing/fingerprint_scan.gif"/></a><figcaption>Scan of not-my-finger. </figcaption></figure>
<p>I recently got a new Laptop (<code>Lenovo Ideapad 5 - 15are05</code>). Linux compatibility is quite good, as documented in the <a href="https://wiki.archlinux.org/index.php/Lenovo_IdeaPad_5_15are05">Arch Wiki</a>. One part that is not working is the fingerprint reader. In this blog post I describe my approach to reverse engineering the fingerprint reader's windows driver and USB protocol. This results in a python script, capable of streaming images from the sensor at around 15 FPS. Fingerprint recognition, as implemented by for example <a href="https://fprint.freedesktop.org/">libfprint</a>, is not available yet. More recently, a <a href="https://gitlab.freedesktop.org/libfprint/libfprint/-/issues/376#note_906650">Discord community</a> was formed, with the goal to support all kinds of Goodix devices in libfprint.</p>
<p>All code can be found in my GitHub Repository <a href="https://github.com/tlambertz/goodix-fingerprint-reversing">tlambertz/goodix-fingerprint-reversing</a>.</p>
<h2>Contents</h2>
<ul> <li><a href="https://blog.th0m.as/misc/fingerprint-reversing/#contents">Contents</a></li> <li><a href="https://blog.th0m.as/misc/fingerprint-reversing/#future">Future</a></li> </ul>
<h2>Getting an overview of the device.</h2>
<p>The first step is figuring out what sensor I have. It is USB based, as <code>lsusb</code> shows:</p>
<pre><code>Bus 003 Device 005: ID 27c6:55a2 Shenzhen Goodix Technology Co.,Ltd. Goodix FingerPrint Device
</code></pre>
<p>A Goodix sensor with the device id <code>27c6:55a2</code>. As the main driver for fingerprint scanner support on Linux is <code>libfprint</code>, I check there first. Unfortunately, my device is listed on the <a href="https://gitlab.freedesktop.org/libfprint/wiki/-/wikis/Unsupported-Devices">Unsupported Devices List</a>. There is not much other information about this specific product id to be found online.</p>
<p>I later found a <a href="https://gitlab.freedesktop.org/libfprint/libfprint/-/issues/112">very helpful libfprint issue</a> for a similar device, but only once I had some more keywords to google. @jjjollyjim had already done very similar work, but did not publish his implementation of the protocol. He did however publish a partial <a href="https://github.com/JJJollyjim/wireshark-goodix">wireshark dissector</a>, which came in handy.</p>
<h3>Logging USB traffic</h3>
<p>We know that the reader works with Windows, which therefore has to provide a valid driver for the device. This will be very helpful, as we have an 'easy' target to reverse engineer. All we need to do is to reproduce what the Windows driver does in Linux. My first hope was that the protocol is simple, so that a basic driver can be implemented just by examining and replaying USB traffic.</p>
<p>To investigate this, we will observe the interactions between driver and device. One way to do that is using a Windows VM, running with virt-manager on my Linux host. The Goodix USB device is passed through to the VM. This allows me to capture all of the USB traffic in Linux, even early startup packets, with <code>wireshark</code> and the <code>usbmon</code> kernel module.</p>
<p>The kernel module has to be loaded manually with <code>sudo modprobe usbmon</code>. Each USB bus provides a separate capture device, so wireshark lists multiple (<code>usbmon0, usbmon1, usbmonX</code>). To choose the correct one, look at the bus in the <code>lsusb</code> output. In my case I choose <code>usbmon3</code>.</p>
<p>We see a lot of data going to and from the device, wrapped in <code>USB_BULK</code> packets. These seem to contain a custom goodix protocol.</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/wireshark.png"><img src="https://blog.th0m.as/processed_images/724395a146e8fa4f00.png"/></a><figcaption>First Wireshark Capture.</figcaption></figure>
<p>Clicking through the packets, we see some plaintext strings: <code>GF3206_RTSEC_APP_10056</code>, <code>This is the description string</code>, <code>MILAN_RTSEC_IAP_10027</code>, <code>Client_identity</code>.</p>
<p>By googling these strings, I found a <a href="https://biometrics.mainguet.org/types/fingerprint/fingerprint_sensors_productsi.htm">List of Fingerprint Sensor Products</a>, which lists my device as <code>(2015) GF3206: 54x176 pixels @500dpi</code>, but nothing more.</p>
<p>The first thing I wanted to see, was whether I was able to extract the raw image from the USB capture. If this is possible, the driver is likely quite simple. Most packets are too small (&lt;128 bytes) to contain relevant image data. The only bigger packets are exactly 14930 bytes, and are only sent when windows scans a finger. As such they likely contain the wanted image. But looking at their content and entropy, they seem to be entirely random. This means they are either compressed or encrypted. In cases like these, I like to use <a href="https://gchq.github.io/CyberChef/">Cyberchef's</a> <code>magic</code> function, which tries common encodings and compressions automatically. It did not cook up anything useful, though.</p>
<p>The next step is taking a closer look at the driver. As it has to be capable of receiving the image, we 'simply' have to find the relevant code there and understand what it does.</p>
<h3>Windows Driver</h3>
<p>Windows has two different kinds of drivers. Some run in the kernel, some in userspace (see <a href="https://docs.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode">Windows: User mode and kernel mode</a>). Goodix uses a user mode driver. This is good for us, as debugging a kernel driver would have been really annoying.</p>
<h4>Finding the driver</h4>
<p>To get information about the exact driver used by windows, we use the device manager.</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/devicemanager.png"><img src="https://blog.th0m.as/processed_images/704014c3cb1b532c00.png"/></a><figcaption>Device Manager / Goodix / Driver Details.</figcaption></figure>
<p>We get a list of many files, not all of them are in use though. I briefly opened some of them with Ghidra, and was surprised that many were similar to each other, just different implementations of the same protocol. As it turns out, this is for compatibility with different host features, like Intel SGX. In my case <code>wbdi.dll</code> contains the code that is actually used for my device.</p>
<p><code>WUDFRd.sys</code> is the <code>User-mode Driver Framework Reflector</code>, a generic kernel driver used for user-mode drivers, so not specifically relevant here.</p>
<p>I also used <a href="https://www.voidtools.com/">Everything</a> (an incredibly fast full-disk file search tool I cannot recommend enough!) to search for <code>Goodix</code>. This revealed a folder with some logs:</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/goodixfolder.png"><img src="https://blog.th0m.as/processed_images/951a5e8a7a2213ce00.png"/></a><figcaption>Goodix Folder, containing logs. Logs contain lots of encrypted and base64 encoded data.</figcaption></figure>
<p>I then looked for processes which have one of these dll's loaded (for example by running <code>tasklist /M GoodixEngineAdapter.dll</code>). This turned out to be <code>svchost</code>. I also ran Procmon and filtered by goodix. This showed lots of reads and writes to the goodix logfiles by <code>svchost</code>.</p>
<p>Unfortunately, this was a false lead. The service does actually do some goodix-stuff, but not the low-level device communication I had expected. As I learned, this is instead done via the Usermode Driver Framework in <code>WUDFHost.exe</code>.</p>
<h4>Another way of finding all relevant driver files.</h4>
<p>As it turns out, Windows stores device drivers in separate folders in a Driver File Repository. By sorting the <code>FileRepository</code> folder by modification date, we can quickly find newly installed drivers. This has the advantage that all files that belong to the driver are in one place.</p>
<p>In my case, we can find the goodix driver in <code>C:\Windows\System32\DriverStore\FileRepository\wbdiusb.inf_amd64_d9f7089f2e88d175</code>:</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/wbdifolder.png"><img src="https://blog.th0m.as/processed_images/fb4fb3d11886e8ef00.png"/></a><figcaption>All Goodix driver files.</figcaption></figure>
<h4>Usermode Driver Framework (UMDF)</h4>
<p>To understand how usermode drivers work, I found it helpful to read up on how to build one: <a href="https://docs.microsoft.com/en-us/windows-hardware/drivers/usbcon/implement-driver-entry-for-a-usb-driver--umdf-">How to write your first USB client driver (UMDF)</a>. As this post is already quite long, I will only briefly summarize the important parts here. Take a look at the following picture:</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/UMDF.png"><img src="https://blog.th0m.as/processed_images/1246b84dd952d38e00.png"/></a><figcaption><p>Usermode Driver Framework (UMDF). <a href="https://docs.microsoft.com/en-us/windows-hardware/drivers/usbcon/implement-driver-entry-for-a-usb-driver--umdf-">Microsoft Documentation</a>, CC BY 4.0</p> </figcaption></figure>
<ol> <li>When an <code>Application</code> wants to talk to a device, it issues a request to the Kernel via the <code>Windows API</code> (1) </li> <li>Kernel redirects request into <code>WUDFHost.exe</code> (2-4) </li> <li>UMDF talks to the <code>Client Driver</code>. This is the actual "custom part", which the vendor implements. (5)</li> <li>The driver processes request, creates some responses to send to the device, hands them off to UMDF again</li> <li>Actual device interaction happens through <code>Winusb.DLL</code> and the kernel (6-9)</li> </ol>
<p>For us this means that we can debug the <code>WUDFHost.exe</code> process, and capture all relevant parts of the driver-device data parsing!</p>
<h2>Debugging the Driver</h2>
<p>To debug the driver I use the excellent <a href="https://x64dbg.com/">x64dbg</a>. My first goal was getting a rough overview what is happening. As we already know the driver writes quite a lot of encrypted logs, this was my first target. Finding the logging function in Ghidra is trivial, as almost all functions log something. Creating a breakpoint here allowed me to print all arguments to all log invocations. This had some drawbacks though. First, it was too slow, and the USB connection was timing out, interrupting the normal driver flow. Second, the messages were not formatted yet.</p>
<p>A closer look at the log function revealed that it has the capability to log to debug via the Windows API <code>OutputDebugStringW</code>. This is normally runtime gated, but a simple <a href="https://github.com/tlambertz/goodix-fingerprint-reversing/tree/main/patches">binary patch</a> (applied via x64dbg's patching feature) took care of that. Now all driver log messages appear in the x64dbg log window. A full <a href="https://github.com/tlambertz/goodix-fingerprint-reversing/blob/main/logs/3_wbdi_singleunlock.log">example log</a> is included in my GitHub repo.</p>
<p>I have not reversed the log encryption, because dumping from the debugger directly was easier. @mpi3d managed to disable encryption by setting some registry keys, which I have not tried to reproduce yet: <a href="https://gitlab.freedesktop.org/libfprint/libfprint/-/issues/376#note_876020">Issue</a>.</p>
<p>As these logs are incredibly verbose, they proved immensely helpful. They revealed the rough driver flow is as expected:</p>
<ol> <li>query version and firmware, set some config registers</li> <li>check if finger is on the sensor</li> <li>request an image</li> <li>image is sent back</li> </ol>
<p>Creating breakpoints in functions which log interesting strings allowed me to correlate usb messages to log output via timing.</p>
<p>An example log message looks like</p>
<pre><code>[pid:  2148][tid:  6316][03-14 07:38:01.287][debug][GxlogicAlgorithm.c][IsNeedRollback          :0123] &gt;&gt; now preoverlay: 0, maxPreoverlayRatio:100\n
</code></pre>
<p>It includes file, function name and line number. The availability of function names makes reversing much easier. Almost every function has log output, so it's almost like we have symbols available.</p>
<h3>The Protocol</h3>
<p>The USB protocol used by the goodix sensor is packet based. All communication is initiated by the driver. It sends a command and waits for a response. Each command is ack'd by the device before sending a response.</p>
<p>Looking at the log we gathered before, we see a hint as to why the image has so high entropy:</p>
<blockquote> <p><code>Wait For Tls Handshake over</code>.</p> </blockquote>
<p>They are using TLS over USB! TLS is not decryptable with a passive attack. We either need to setup the connection ourselves, or dump the used key. Annoyingly, the TLS setup is done when the driver is loaded, before we are able to attach to the driver to dump logs. In the next section we remidy this. But first, lets examine the non-encrypted part of the protocol a bit.</p>
<p>Most packets are limited in length to 128 bytes. If a response is longer, it is split into multiple packets. The first one contains the correct length, the later ones have no header at all and contain just data. This makes confident reassembly a bit more complicated.</p>
<p>The protocol consists of two layers. An outer wrapper, which just contains a packettype, a length and the payload, and the payload itself. The format of the payload depends on the type set in the wrapper. It most often is <code>A0</code>, in which case the payload is a plaintext command:</p>
<pre><code data-lang="rust">struct wrapperpacket {
  uint8 packettype;
  uint16 length;       // length of payload without this header
  uint8 header_chksum; // sum of three previous bytes
  uint8 payload[length];
}

// Packettype A0. Normal, plaintext packet.
struct normalpacket {
  uint8 cmd;
  uint16 length;       // length of data without this header, including the checksum at the end
  uint8 data[length-1];
  uint8 chksum;        // 0xaa - sum(previous bytes)
}

// Packettype B0. Used during TLS handshake
// Packettype B2. Used when sending TLS encrypted image data
</code></pre>
<h3>Creating a Wireshark Disector</h3>
<p><code>@jjjollyjim</code> has published an <a href="https://github.com/JJJollyjim/wireshark-goodix">wireshark dissector</a> for a similar fingerprint reader, which I took as a baseline. An improved disector can be found <a href="https://github.com/tlambertz/goodix-fingerprint-reversing/blob/main/wireshark-dissector/goodix_message.lua">in my repo</a>.</p>
<p>There are two ways to create Wireshark disectors. They can either be compiled, or be written in Lua. While Lua does not have access to the full dissector API, it is often enough and way easier to write and iterate. I found this <a href="https://false.ekta.is/2013/11/decoding-vendor-specific-usb-protocols-with-wireshark-lua-plugins/comment-page-1/">Guide</a> to have some helpful pointers into writing a Lua based USB dissector.</p>
<p>To install a custom disector, you simply copy it into <code>~/.local/lib/wireshark/plugins/3.4</code>. During development, the shortcut <code>Strg+Shift+L</code>, which hot-reloads all Lua scripts is immensely helpful for fast iteration.</p>
<p>The resulting decoded protocol looks as follows:</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/wireshark-decoded.png"><img src="https://blog.th0m.as/processed_images/6248c2268d515c0100.png"/></a><figcaption>Wireshark, Overview</figcaption></figure>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/wireshark-decoded2.png"><img src="https://blog.th0m.as/processed_images/2b506f9dc3699da400.png"/></a><figcaption>Wireshark, McuGetImage decoded</figcaption></figure>
<p>Wireshark is even able to show us information about the TLS packets. Unfortunately, it cannot decrypt TLS packets outside of a TCP stream, even if we provide the PSK. This is because TLS is stateful, and Wireshark needs to know which sequence of TLS packets belong together. But there is no API to provide this information, outside of a TCP stream, where packets are strictly ordered. As a workaround it is possible to send the data 1:1 over TCP, capture this in a separate pcap, enter the PSK key in the wireshark settings, and then decrypt it. This proved unnecessary though.</p>
<h3>Debugging Initialization, changing the PSK</h3>
<p>The WUDFHost process only spawns when the driver is needed, and then immediately runs the device initialization code, which makes debugging it more difficult. As this is a common problem when developing drivers, Windows provides a registry key do delay initialization until after a debugger is attached to WUDFHost (<code>HostProcessDbgBreakOnStart</code>, see <a href="https://flylib.com/books/en/3.141.1.164/1/">How to Prepare for UMDF Debugging</a>). Using windbg this works fine, but with x64dbg the process exits early after attaching. I have no idea why that happens, please let me know if you have an idea.</p>
<p>It seems the Goodix Devs had a similar problem, and implemented their own workaround: a debug registry key: <code>HKEY_LOCAL_MACHINE\SOFTWARE\Goodix\FP\DebugMe</code>. If this is set, the driver loops for a few minutes during initialization (in function <code>initThread</code>). This provides more than enough time to attach x64dbg. We can then use the debugger to break out of the loop. This is not the only registry key read, there are ~15. I have not looked into them yet, but one called <code>securityReviewSwitch</code> might we interesting to look at.</p>
<p>This early attach enables us to get the log output of TLS intialization, and, more importantly, it enables us to interfere with it. The log shows that they are using TLS-PSK, a version of TLS that works without certificates. Instead, it uses a mutually known pre-shared-key (PSK). To talk to the sensor we need to know this PSK! THe windows driver obviously knows it, so we should be able to get a hold of it.</p>
<p>In the log we find a crucial method: <code>ProcessPsk</code>. This is the method that checks/sets the PSK key used by the TLS connection! Lets look at a log excerpt:</p>
<pre><code>ProcessPsk          psk process...
ProcessPsk          1.check psk if valid(total times:3)
PresetPskIsValidR     1.get sgx[psk] from mcu
PresetPskIsValidR     2.unseal sgx[psk] &amp; cal the local_hash
CalculatePmk            1.gen raw_pmk
CalculatePmk            2.calculate pmk
PresetPskIsValidR     3.get hmac of pmk from mcu
PresetPskIsValidR     4.verify hmac of local and mcu
ProcessPsk          psk is valid!
</code></pre>
<p>The driver reads two values from the sensor (mcu). First, an encrypted PSK. Contrary to the log messages, it is NOT sealed in an SGX enclave, but rather encrypted with windows's <code>CryptProtectData</code>. This encrypts data to the currently logged in user. The laptop has an AMD processor, so SGX is not available. It might very well be that on Intel SGX is used.</p>
<p>Secondly, the driver queries a hash of the PMK. The PMK (preshared master key) is the actual key used by TLS and is computed from the PSK. This way, the driver can verify that the decryption of the PSK was successful and both devices have the same PMK.</p>
<p>Now the crucial question is: How does the fingerprint sensor get the PMK in the first place? It obviously needs it, unencrypted, to be able to establish a communication. To investigate this, I spun up a clean windows VM and observed the first connection ever between the driver and the device. This revealed crucial information:</p>
<pre><code>ProcessPsk         psk process...
...
PresetPskIsValidR    2.unseal sgx[psk] &amp; cal the local_hash"
GfUnsealData           CryptUnprotectData failed, error: -2146893813
...
ProcessPsk         3.write psk to mcu(times:1)(total times:3)
PresetPskWriteKey    0.generate random psk
PresetPskWriteKey    1.seal psk by sgx
PresetPskWriteKey    2.encrypt psk by wb
PresetPskWriteKey    3.write to mcu
ProcessPsk         4.write psk successfully ,check again
PresetPskIsValidR      .....
ProcessPsk         psk is valid!
</code></pre>
<p>AHA! The driver queries the encrypted PSK from the device. But it was encrypted with a different windows VM, so the <code>CryptUnprotectData</code> call fails! It then proceeds to generate a new, random, PSK and sends it to the device. This represents a trust-on-first-use security model. But I am not sure if there is any way for the user to detect a changed PSK if the driver just sends a new one...</p>
<p>Our Linux driver should be able to do the same! But it seems Goodix is really worried about an attacker sniffing packets, and wanted to prevent a passive observer to sniff the PSK. As such, the PSK is not transmitted in the clear, but encrypted with a whitebox.</p>
<p>Whitebox is an interesting field of cryptography. It is applied to symmetrical ciphers. That means encryption and decryption key are the same. The goal of a whitebox is to provide an encryption function to an adversary, which will NOT be able to get the key out of this box. As such, he will be unable to decrypt. This prevents passive sniffing.</p>
<p>But we simply want to know one valid PSK - encrypted PSK pair and can therefore use the whitebox as-is, without needing the key.</p>
<p>One way to do this, is to set a breakpoint in <code>PresetPskWriteKey</code>, and just change the PSK in memory right after it is generated and before it is encrypted.</p>
<figure><figcaption><p>Ghidra. Decompilation of <code>PresetPskWriteKey</code>.</p> </figcaption></figure>
<p>I provide an example plain-ciphertext pair for my device:</p>
<pre><code data-lang="python">PSK =      bytes.fromhex("0000000000000000000000000000000000000000000000000000000000000000")
PSK_WB =   bytes.fromhex("ec35ae3abb45ed3f12c4751f1e5c2cc05b3c5452e9104d9f2a3118644f37a04b6fd66b1d97cf80f1345f76c84f03ff30bb51bf308f2a9875c41e6592cd2a2f9e60809b17b5316037b69bb2fa5d4c8ac31edb3394046ec06bbdacc57da6a756c5")
PMK_HASH = bytes.fromhex("81b8ff490612022a121a9449ee3aad2792f32b9f3141182cd01019945ee50361")
</code></pre>
<p>Another way to get a valid, arbitrary <code>PSK - PSK_WB</code> pair is to break the whitebox, which in this case barely deserves its name. If you were able to follow up to here, I am sure you will be able to break it. This will nonetheless be left as an excercise for the reader, because Goodix might have good reasons to keep it a secret.</p>
<h3>Some notes on reversing the TLS functions</h3>
<p>Looking at strings contained in the binary, I fairly quickly determined that it was using the mbedtls library. This was good to know, as mbedtls has a very wide range of distinct error codes for each function. For example, <code>-0x6380</code> is used in <code>mbedtls_cipher_update</code>, allowing to easily identify the function. This is likely something that can also be done by function signatures, but I did not need to know many functions and was to lazy to generate the signatures.</p>
<p>The TLS library has its own logging, which is normally runtime disabled. I found the place where it is set, and used a breakpoint to set it to <code>trace</code> level.</p>
<h2>Figuring out the Image Format</h2>
<p>By writing our own PSK to the device, we are able to establish communication and receive an image. The decrypted image has substancially less entropy, so decryption is almost guaranteed to be correct. But a simple visualization still looks like noise with no fingerprint visible. We need to figure out how the image is encoded.</p>
<p>From the initial research we know the sensor likely has a resolution of 54x176. To verify this, we can use the GIMP Raw Image dialog. It allows to easily modify the width and see a live result, which makes finding repeating patterns easy.</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/gimp-raw-fp.png"><img src="https://blog.th0m.as/processed_images/bba2233b868d52a200.png"/></a><figcaption>Raw decrypted fingerprint image in GIMP. Note the repeating structure in the image -&gt; Width is 84 bytes. </figcaption></figure>
<p>We could also have done this with a simple hex editor. The received image is 14788 bytes, and we see repeating zeroes every 84 bytes. This means that the final 4 bytes are extra and likely a checksum.</p>
<p>The row count of 176 matches. Each contains 84 bytes, which we expect to be 54 pixels. This matches if each pixel is 12 bits in depth, as 84⋅8/12=54.</p>
<p>Figuring out how the bits are packed required further reverse engineering of the code, which revealed a quite curious method: Every four pixels are packed into 6 bytes, according to the following pattern:</p>
<pre><code>6 input bytes:   01 23 45 67 89 ab
unpack to
  0x123
  0x670
  0xb45
  0x89a
</code></pre>
<p>YAY! Finally a decoded image!</p>
<figure><a href="https://blog.th0m.as/misc/fingerprint-reversing/empty_fingerprint.png"><img src="https://blog.th0m.as/processed_images/5972f4518a123f1e00.png"/></a><figcaption>Empty Fingerprint image. There are some vertical lines, which are present in every image and could be calibrated for. </figcaption></figure>
<h2>Creating a Python Driver PoC</h2>
<p>I have written a first proof-of-concept driver in python: <a href="https://github.com/tlambertz/goodix-fingerprint-reversing/blob/main/capture.py">capture.py</a>.</p>
<p>It connects to the device, changes the PSK to all zero if needed, sets up a TLS connection and waits for the finger to be placed on the device and requests an image. As TLS is only specced to be used via TCP, all python libraries I found expect a socket to interact with. DTLS, which is intended to be wrapped in other protocols, is slightly different and thus incompatible.</p>
<p>To work around this, I simply open my own socket and proxy the TLS communication through it. This also enables wireshark to sniff the interface and decrypt all traffic, which might be helpful when debugging.</p>
<p>As a simple TLS server I opted for the <code>openssl</code> included one:</p>
<pre><code data-lang="sh">openssl s_server -nocert -psk 0000000000000000000000000000000000000000000000000000000000000000 -port 4433 -quiet
</code></pre>
<p>To plot the image I use pyplot. The maximum framerate I was able to get from the sensor was 16 FPS:</p>
<figure><figcaption><p>Scan of not-my-finger.</p> </figcaption></figure>
<p>For the Sensor to be actually useful (like unlocking your laptop), libfprint support is required. I have briefly looked into adding support myself, but was turned off by their use of object oriented C. There also would be the need to integrate some TLS library into libfprint. I might come back to this in the future though.</p>
<p>In the meantime, there is a new <a href="https://discord.gg/6xZ6k34Vqg">Discord server</a>, where many owners of goodix devices have gathered to work on a unified driver. It seems every goodix scanner type is slightly different. As of 27/05/2021, images were extracted from 4 out of 11 models.</p>
<p>Feel free to join as well, if to contribute or just to lurk :)</p>
