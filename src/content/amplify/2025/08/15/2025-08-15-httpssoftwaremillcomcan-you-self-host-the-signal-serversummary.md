---
author: Emil Bartnik
cover_image: >-
  https://softwaremill.com/user/pages/blog/285.can-you-self-host-the-signal-server/x5dfqmgjob9ykof.jpg?g-f3163bfc
date: '2025-08-16T01:39:21.614Z'
dateFolder: 2025/08/15
description: >-
  Signal is a secure and complicated messaging platform. Read the article and
  find out if it's possible to selfhost the Signal server on the local machine.
isBasedOn: 'https://softwaremill.com/can-you-self-host-the-signal-server/#summary'
link: 'https://softwaremill.com/can-you-self-host-the-signal-server/#summary'
slug: 2025-08-15-httpssoftwaremillcomcan-you-self-host-the-signal-serversummary
tags:
  - tech
title: Can You Self-Host the Signal Server?
---
<ul><li><a href="https://www.linkedin.com/in/bartnikemil"><figure></figure></a></li></ul>
<figure><img alt="Can You Self-Host the Signal Server? webp image" src="https://softwaremill.com/user/pages/blog/285.can-you-self-host-the-signal-server/x5dfqmgjob9ykof.jpg?g-f3163bfc"/><figcaption>Can You Self-Host the Signal Server? webp image</figcaption></figure>
<p>Signal is an awesome messenger that prioritizes privacy and supports end-to-end encryption. On top of that, the app is open-sourced, which means you can check and audit the code – and perhaps even run it.</p>
<p>In this post, I would like to share with you my attempt of running Signal on my local machine.</p>
<h2>Server</h2>
<p>On official <a href="https://github.com/signalapp">signal repository</a>, you can find multiple components: server, android app, libsignal, contact discovery service, and more.</p>
<p>Although the exact system architecture has not been officially published, I was able to create some high-lever architecture overviews with the help of AI.</p>
<figure><img alt="signal-app-schema" src="https://softwaremill.com/user/pages/blog/285.can-you-self-host-the-signal-server/signal-app-schema.png?g-f3163bfc"/></figure>
<p><em>Note: This diagram is simplified and does not contain all elements. </em></p>
<p>As you can see, the main component that is definitely required is <a href="https://github.com/signalapp/Signal-Server">server</a>, which is the part I started with. The repo is not well documented, but we can take a look at <code>LocalWhisperServerService</code>. This class from the <code>test</code> scope allows to run local instance of <a href="https://softwaremill.com/what-ive-learned-from-signal-server-source-code/">Signal Server</a>, with a disclaimer that not all options are available. To start up this test server, I just ran it using my IDE.</p>
<p>It also points to default test config <code>src/test/resources/config/test.yml</code> and secrets <code>src/test/resources/config/test-secrets-bundle.yml</code>. You can find more details about required dependencies of the server. Just from looking at it, it's clear it is not as easy as running a few containers, but maybe we can try to connect a mobile app to <code>LocalWhisperServerService</code>?</p>
<h2>Mobile App</h2>
<p>I downloaded the mobile app from this <a href="https://github.com/signalapp/Signal-Android">repository</a> and used <code>Android Studio</code> to navigate through the code easily.</p>
<p>After snooping around, I found <code>app/build.gradle.kts</code> with a bunch of URLs that represent different services. I replaced all URLs under the keys <code>SIGNAL_URL</code> with the IP address of my PC in the home network.</p>
<p>Then, I started an application in the emulator, and it was working, great success!</p>
<p>However, despite having a working app, it still couldn't connect with the locally running server. Let's investigate what might be the case.</p>
<p>Looking into output logs I was getting an error that only TLS connections are allowed, so I decided to try to get some domain and certificate. I found a "trick" that you can generate a valid certificate by getting <a href="https://www.duckdns.org/">duckdns</a> subdomain and using <code>Let's Encrypt</code>. To utilize the certificate, I ran <code>nginx-proxy-manager</code> locally within the container, with proper redirects to <code>LocalWhisperServerService</code>.</p>
<p>Second try and... It's not working again... Looks like the certificate comes from an untrusted CA, but the browser says everything is ok. It turns out the mobile app has its own trust store, and I needed to add root CA to <code>app/src/main/res/raw/whisper.store</code></p>
<p>Third try and... It's working – I was able to "register" the fake phone number.</p>
<p>The first step was CAPTCHA verification. After filling it out correctly, I received an error, and I was redirected back to the screen where I had filled in the phone number.</p>
<p>Trying to register the phone again directed me to the screen where I needed to enter the pass code. Since I was not setting up any SMS gateways, and it was “TestServer”, I tried to pass the last 6 digits of the phone. After typing the code, loader started to spin, and after few minutes there were no results, so I decided to click <code>Resend Code</code> and it worked. Later I found out that you can pass any code.</p>
<p>In the next step, I was asked to provide my first and last name. After that, I needed to pass a PIN number twice for my ‘account’. The procedure failed, with a pop-up error, but I was able to move forward, where I was redirected to the main page.</p>
<p>Let's start a second app and see if we can send some messages. The app starts up, but there comes another problem: to find another contact, you need <a href="https://github.com/signalapp/ContactDiscoveryService-Icelake">contact discovery service</a>.</p>
<h2>Contact Discovery Service</h2>
<p>Starting this service is not so easy. It uses a few native libraries that are specifically compiled for x86 architecture, which means there is no way to run it on MacOS.<br/>
 It's all because Signal cares about our privacy, and the contact discovery service uses enclaves to protect RAM from leaking your data. This is achieved by encrypted and obfuscated RAM access patterns, so any malicious actors won’t be able to “guess” them. This is well explained in the following <a href="https://signal.org/blog/private-contact-discovery/">Signal's Blog</a>.</p>
<p>Maybe it's possible to run it inside a container? Unfortunately it's not entirely possible. Again, service requires native libraries, and one of them needs to be compiled, which is done... via container.</p>
<p>After giving it a good few trials, I decided to try VM with the Ubuntu machine, and I was able to run it there.</p>
<p>Ok, so much trouble just to run to Contact Discovery Service, I should be able to connect to it, right?</p>
<p>I changed URLs pointing to Contact Discovery Service in the <code>app/build.gradle.kts</code> in the mobile app repository (config fields with key <code>SIGNAL_CDSI_URL</code>). I ran the application, but there was no trace of outgoing requests, and I could find error logs indicating that I was unable to connect to the service.</p>
<p>After looking around, I found that the connection to this service is managed by <a href="https://github.com/signalapp/libsignal">libsignal</a> - a protocol-shared library. It also means that the connection URL is there (the ones from <code>app/build.gradle.kts</code> seems to be unused). Fortunately, it is possible to build a mobile app with the local version of <code>libsignal</code>, by uncommenting and filling <code>libsignalClientPath</code> and <code>org.gradle.dependency.verification</code> properties in the <code>gradle.properties</code> file. <code>libsignalClientPath</code> must point to the <code>libsignal</code> repository location on the machine.</p>
<p>I changed the URLs in <code>/rust/net/src/env.rs</code> in the <code>libsignal</code> repository for <code>DOMAIN_CONFIG_CDSI</code> properties, rebuilt the mobile app, loaded it, and... I was still getting the error that the connection failed.</p>
<p>At this point, I decided to give up my trial as it was just the tip of the iceberg, and debugging and discovering every component would take a lot of time</p>
<h2>libsignal</h2>
<p>So, now we know that it's really hard to self-host the Signal server (if possible at all), but what about the protocol and shared library? Maybe I can build my own server using this library?</p>
<p>I decided to give it a try, and so I built a simple PoC server that uses <code>libsignal</code> and <code>MySql</code> to store messages and device info for later retrieval.</p>
<p>The code is available in the following <a href="https://github.com/softwaremill/sample-signal-app">repository</a>.</p>
<p>It is divided into two subprojects:</p>
<ul><li><code>client</code> is a console app that is a protocol client that can encrypt, decrypt, receive, and send messages.</li><li><code>server</code> is a spring boot server that saves all necessary information and messages, making the process asynchronous.</li></ul>
<p>The communication between <code>client</code> and <code>server</code> is done via HTTP.<br/>
 To run both, follow instructions from repository's <code>README.md</code></p>
<h3>Device registration</h3>
<p>To be able to encrypt and decrypt messages, first we need to generate:</p>
<ul><li><code>org.signal.libsignal.protocol.IdentityKeyPair</code></li><li><code>org.signal.libsignal.protocol.state.SignedPreKeyRecord</code></li><li>a list of <code>org.signal.libsignal.protocol.state.PreKeyRecord</code></li></ul>
<p>Generated data should be saved for later use in the implemented <code>org.signal.libsignal.protocol.state.SignalProtocolStore</code> so your "credentials" are not lost, however, for simplicity, I used an <code>InMemory</code> implementation available in <code>libsignal</code> and saved data there. This means that each application run generates new credentials.</p>
<p>To allow other users to establish a session with us, we need to send the following data to the server during registration:</p>
<ul><li>IdentityKey (public)</li><li>SignedPreKey (public) - part of <code>SignedPreKeyRecord</code></li><li>PreKeySignature - part of <code>SignedPreKeyRecord</code></li><li>PreKeys</li></ul>
<p>Later from this data server can send <code>PreKeyBundle</code> to the requesting device.</p>
<p>Here is a code snippet from the example repository:</p>
<pre><code>    println("Enter your username:")
    val username = readln()
    val serverClient = ServerClient(serverURL = URI("http://localhost:8080"))
    val identityKeyPair = IdentityKeyPair.generate()
    val protocolStore = InMemorySignalProtocolStore(identityKeyPair, 2137)

    val preKeys = generatePreKeys(1, 100)
    preKeys.forEach { protocolStore.storePreKey(it.id, it) }

    val signedPreKey = generateSignedPreKey(identityKeyPair, 0)
    protocolStore.storeSignedPreKey(signedPreKey.id, signedPreKey)

    val deviceDTO = serverClient.registerUser(username, identityKeyPair, signedPreKey, preKeys) ?: return</code></pre>
<h3>Establishing session</h3>
<p>A session can be established in two ways:</p>
<ul><li>by fetching <code>org.signal.libsignal.protocol.state.PreKeyBundle</code> from the server</li><li>by receiving <code>org.signal.libsignal.protocol.message.PreKeySignalMessage</code> - this is usually the first message from an other device.</li></ul>
<p>The initiator needs to first fetch from a server <code>PreKeyBundle</code> related to the receiver device. After that, it needs to create a <code>org.signal.libsignal.protocol.SessionBuilder</code> and run <code>process(PreKeyBundle)</code> method. This step allows to save all necessary information inside <code>SignalProtocolStore</code>, which later will be used when encrypting and decrypting messages.</p>
<p>Here is the part responsible for that in the example repository:</p>
<pre><code>    val receiverInformation = getAndSaveUserInformation(serverClient, receiverName, otherUsers)
    if (!protocolStore.containsSession(receiverInformation.toSignalProtocolAddress())) {
        val userBundle = serverClient.getUserBundle(receiverName)
        SessionBuilder(protocolStore, receiverInformation.toSignalProtocolAddress())
            .process(userBundle.toPreKeyBundle(deviceDTO.deviceId))
    }</code></pre>
<h3>Sending Messages</h3>
<p>To send a message, you need to create an <code>org.signal.libsignal.protocol.SessionCipher</code> passing <code>SignalProtocolStore</code> and receivers <code>SignalProtocolAddress</code>.</p>
<p><strong>Note:</strong> For simplification purposes data required for <code>SignalProtocolAddress</code> is generated by the server, and fetched whenever needed.</p>
<p>After obtaining <code>SessionCipher</code>, you can simply call <code>org.signal.libsignal.protocol.SessionCipher#encrypt(byte[])</code> method. The returned encrypted message is sent to the server, so it can be later fetched by the other device.</p>
<p>Example:</p>
<pre><code>    val cipher = SessionCipher(protocolStore, receiverInformation.toSignalProtocolAddress())
    val ciphertextMessage = cipher.encrypt(message.toByteArray())
    serverClient.sendMessage(username, receiverName, ciphertextMessage)</code></pre>
<h3>Receiving Messages</h3>
<p>To receive messages, the device calls a server endpoint which returns all messages from the inbox together with information about the sender and message type. A message can be decrypted only once, and it is deleted from the server after being fetched.</p>
<p>To decrypt a message, you need to create (or obtain) <code>SessionCipher</code> related to the message sender. To properly decrypt a message, it needs to be casted to the proper type:</p>
<ul><li><code>PreKeySignalMessage</code> when it's the first message from the device</li><li><code>SignalMessage</code> for other messages</li></ul>
<p>Casting is controlled by <code>messageType</code> that is saved and returned by the server.</p>
<p><strong>Note:</strong> Although there are other message types available in <code>libsignal</code>, I focused on only 2 for simplicity.</p>
<p>When <code>PreKeySignalMessage</code> is decrypted, a session with a given device is established, so there is no need to fetch additional data from the server.</p>
<p>You can see the example <a href="https://github.com/softwaremill/sample-signal-app/blob/main/client/src/main/kotlin/Main.kt#L83">here</a>.</p>
<p>It's worth mentioning that <code>libsignal</code> is published under the <code>AGPL-3.0</code> license, which means that every software that uses it must be published with the same license.</p>
<p>The library is awesome and it allows you to create software with end-to-end encryption, however it's designed purely for the Signal ecosystem, and types and structures seem to be suited only for it.</p>
<p>The library is mainly implemented in <code>rust</code> which makes debugging really hard, especially in Java / Kotlin clients.</p>
<h2>Summary</h2>
<p>Signal is a secure and complicated messaging platform. Self-hosting the entire service is almost impossible due to the documentation's limited availability, the stack's complexity, and the options to customize. On the other hand, writing a custom server is also a challenging task, even when using the available <code>libsignal</code>. It requires open-sourcing your code, a good understanding of the Signal Protocol, and handling multiple edge cases that you don't think of every day.</p>
