---
author: piratebox.cc
cover_image: ''
date: '2025-08-15T05:11:23.308Z'
dateFolder: 2025/08/15
description: Raspberry Pi(rate)Box 1. 1.
isBasedOn: 'https://piratebox.cc/raspberry_pi:diy'
link: 'https://piratebox.cc/raspberry_pi:diy'
slug: 2025-08-15-httpspirateboxccraspberrypidiy
tags:
  - tech
  - privacy
title: Raspberry Pi(rate)Box
---
<p><b>Raspberry Pi(rate)Box 1.1.4 </b><b>is now available for download via BitTorrent!</b> See our <b>easy DIY instructions below </b> for details on how to <b>build your own Pi(rate)Box.</b> <b><a href="https://piratebox.cc/faq">And learn more about the PirateBox project here</a>.</b></p>
<figure><img alt="Pi(rate)Box" src="https://piratebox.cc/_media/pirate-pi.1.jpg?w=800&amp;tok=8a91c9"/></figure>
<h1>PirateBox 1.1 Features</h1>
<p><b>Responsive design</b> for ease of use with phones and tablets; <b>UPnP Media Server</b> for local streaming of movies and songs; <b>Image and Message Board</b> for 4chan-like functionality; <b>chat room</b> for anonymous communications; <b>browser-based file sharing system!</b></p>
<p><strong>PirateBox</strong> is an <strong>anonymous offline mobile file-sharing and communications system</strong> built with <strong>free software</strong> and inexpensive <strong>off-the-shelf hardware</strong>. You can use it to transform any space into a free and open offline communications and file sharing network. <strong><a href="https://piratebox.cc/faq">Learn more about PirateBox on our FAQ page!</a></strong></p>
<p>We are providing a custom Raspberry Pi image, which is built on top of <a href="https://wiki.archlinux.org/">ArchLinux</a>. You can learn more about it on our <a href="https://piratebox.cc/raspberry_pi:os_adjustments">RapsberryPi Operating System Adjustments</a> page. If you prefer building the PirateBox on Raspbian or Armbian you can find a manual setup page <a href="https://piratebox.cc/raspberry_pi:diy:armbian">here</a>. This is useful, if you want to use other one-chip computers, like the OrangePi. There are separate instructions available for: <a href="https://piratebox.cc/other:chip">ChiPirate-BOX: the chipest and cheapest Pirate-BOX ever</a>.</p>
<p>For support, be sure to check out the <strong><a href="https://piratebox.cc/raspberry_pi">PirateBox Raspberry Pi page</a></strong> and the <strong><a href="http://forum.piratebox.cc/list.php?7">Raspberry Pi(rate)Box discussion board</a></strong> on our <strong><a href="http://forum.piratebox.cc">PirateBox Forum</a></strong>.</p>
<p>The following instructions are for installing <strong>PirateBox</strong> on a Raspberry Pi.</p>
<p><b>1.</b> <strong>Raspberry Pi</strong>, <a href="https://en.wikipedia.org/wiki/Raspberry_Pi#Specifications">learn about</a> the different models. <a href="https://shop.pimoroni.com">Pimoroni</a> provides pretty nice sets including cases, psu and SDCards.</p>
<p><em>Disclaimer: Buying this article through amazon.com gives as some affiliate money.</em></p>
<p><b>3.</b> <strong>USB Wi-Fi Adapter <a href="https://piratebox.cc/raspberry_pi:piratebox_wifi_compatibility">(compatible devices)</a></strong> - <strong>Note:</strong> RPi3 &amp; Zero-W contains a built in wifi card.</p>
<p><b>5.</b> <strong>USB Flash Drive</strong> (single partition, FAT32 formatted) The Kingston DT 16GB works well <strong><a href="http://www.amazon.com/exec/obidos/ASIN/B00DYQYITG/pira0e-20/">(Amazon)</a></strong> <strong><a href="http://www.newegg.com/Product/Product.aspx?Item=9SIA12K11S3818&amp;cm_re=Kingston_DTSE9H_16GB-_-20-239-003-_-Product">(Newegg)</a></strong></p>
<p><b>7.</b> <strong>Computer with ethernet port</strong> - <strong>Note:</strong> Model A, RPi Zero and RPi Zero-W do not have an ethernet port.</p>
<p>All steps (setting alarm password, post installation steps) can be done via an attached keyboard and monitor. On early versions of the RaspberryPi you encountered USB power issues with a WiFi adapter attached, which is the reason the complete manual based on using SSH. In addition, it is teaching you how to use a remote shell. There is no GUI pre-installed on the PirateBox-archlinux images, so you will have a CLI as well, but in some cases it might be easier to use a keyboard &amp; monitor then a network connection.</p>
<p><b>1.</b> Using a <strong>BitTorrent client</strong> (<a href="https://www.transmissionbt.com/">Transmission for OS X and Linux</a>) (<a href="http://deluge-torrent.org/">Deluge for Windows, OS X or Linux</a>) on your computer, download a copy of the</p>
<ul> <li> For Raspberry Pi 1 A, B, B+, Zero &amp; Zero-W : <a href="magnet:?xt=urn:btih:ac3d307f5b777d6e36dfed1bb96ad2c29a0f55d5&amp;dn=piratebox_rpi_1.1.4-27-02-2018.img.zip&amp;tr=udp%3A%2F%2Ftracker.piratebox.cc%3A7070&amp;tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969">piratebox_rpi_1.1.4-27-02-2018.img.zip</a> (SHA256 Checksum: 81635482b91c7464d24754615ea2e8c44be84f454dc0e8feaf1a4fa05753ca3c) </li> </ul>
<p><strong>Note:</strong> Please help seed this file for other PirateBox downloaders!</p>
<p><strong>Note:</strong>  If you encounter a slow starting of the torrent download using the magnet link, you may pick up the corresponding torrent file in <a href="https://forum.piratebox.cc/read.php?9,21880,21880#msg-21880">this forum post</a>. You can also use direct downloads via our <strong><a href="https://piratebox.cc/mirrors">Alternative download sources</a></strong></p>
<p><strong>Note:</strong> Our RPi images since 1.1.3 contain some customization which should treat the SDCard well. One of the consequences of these changes is, that you should shutdown the RPi properly. The Linux Kernel will write data on the disk on a 5 minute interval during being idle to preserve some SDCard cycles. You can learn more about it on our <a href="https://piratebox.cc/raspberry_pi:os_adjustments">RapsberryPi Operating System Adjustments</a> page.</p>
<p><b>2.</b> Extract the <strong>piratebox_rpi*.zip</strong> file and follow the Raspberry Pi <strong>SD Card Setup instructions</strong> <strong><a href="http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_card_using_Mac_OSX">(OS X instructions)</a></strong> <strong><a href="http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Windows">(Windows instructions)</a></strong> <strong><a href="http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Linux_.28including_on_a_Pi.21.29">(Linux instructions)</a></strong> to install the image to your SD card.</p>
<p><b>3.</b> Once you have finished copying the <strong>Raspberry Pi(rate)Box</strong> image to your SD card, insert it into the Raspberry Pi and connect it via ethernet cable to your home router. <strong>Be sure your USB Wi-Fi adapter and FAT32 formatted USB drive are both plugged in</strong> (see “Stuff You'll Need” section above for more info on compatible devices).</p>
<p><b>4.</b> Wait 2-3 minutes for your Pi to fully boot and then open a terminal window (for OS X, go to Applications &gt; Utilities &gt; Terminal; for Windows, install and open <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/">PuTTY</a>) and ssh into your PirateBox:</p>
<pre>ssh alarm@alarmpi</pre>
<p>The password is: <strong>alarm</strong></p>
<p><strong>Note:</strong> If you are using PuTTY, enter in the hostname field “<code>alarm@alarmpi</code>” or “<code>alarm@192.168.77.1</code>”</p>
<p><b>5.</b> Once you have logged in, change your password (to something you'll remember!) by using the passwd command:</p>
<pre>passwd </pre>
<p>You will be prompted to enter and then confirm your new password.</p>
<p>Root user is not allowed to login via remote, you do not need to set a password for root. Use <strong>sudo</strong> to invoke commands as root.</p>
<p>The default password for user <em>root</em> is <strong>root</strong>. It is strongly recommended to change this password as well. You can do this while being logged in as alarm running this command:</p>
<pre>sudo passwd root</pre>
<p><strong>Note:</strong> At this point, the PirateBox AP should be available, if you have a supported WiFi stick attached. For problems see here <a href="https://piratebox.cc/raspberry_pi:mods?&amp;#using_alternative_hostapd_binaries_and_drivers_for_tested_devices">this mod guide</a> or post to the RPi forum mentioning the failed WiFi auto detection.</p>
<p><b>6.</b> <strong>Optional:</strong> By default, the PirateBox stores the uploaded files into the root filesystem. This is sufficient for first tests, but for larger installations you should consider using a different partition or medium. The extracted image uses around 2GB of the SD Card, so you can use the remaining SD card storage, or your USB flash drive. This process is documented on the <a href="https://piratebox.cc/raspberry_pi:mods">Raspberry Pi(rate)Box Mods</a> page.</p>
<p><b>7.</b> Your PirateBox ist started automatically as soon as a supported WiFi stick is detected.</p>
<p><b>8.</b> You are now ready to activate the Kareha Image and Discussion Board, enable your USB drive as share and start the UPnP server. See the <strong><a href="https://piratebox.cc/raspberry_pi:diy#post-installation">post-installation</a></strong> instructions below for details.</p>
<p>Once you have installed or upgraded your PirateBox, follow these final steps to activate the Kareha Image and Discussion Board and configure and start the UPnP media server.</p>
<p><b>1.</b> Power up your PirateBox (make sure it is not connected via ethernet cable) and join the SSID “<strong>PirateBox: Share freely</strong>” network. Open a terminal window (for OS X, go to Applications &gt; Utilities &gt; Terminal; for Windows, install and open <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/">PuTTY</a>) and ssh into your PirateBox:</p>
<pre>ssh alarm@192.168.77.1</pre>
<p><b>2.</b> Recommended: Activate the USB Stick (FAT32 only) <code>sudo  /opt/piratebox/rpi/bin/usb_share.sh</code> or (since <strong>1.1.3</strong>) the spare space on the SDCard as storage using the command <code>sudo /opt/piratebox/rpi/bin/sdcard_share.sh</code>.</p>
<p><b>3.</b> Activate the Kareha Image and Discussion Board by using the board-autoconf tool:</p>
<pre>sudo /opt/piratebox/bin/board-autoconf.sh</pre>
<p><b>4.</b> Activate the “timesave functionality” once:</p>
<pre> sudo /opt/piratebox/bin/timesave.sh /opt/piratebox/conf/piratebox.conf install
 sudo systemctl enable timesave </pre>
<p><b>5.</b> Activate the UPnP Media Server by copying over the config file:</p>
<pre>sudo cp /etc/minidlna.conf /etc/minidlna.conf.bkp
sudo cp /opt/piratebox/src/linux.example.minidlna.conf /etc/minidlna.conf</pre>
<p><strong>Note:</strong> Optionally, you can edit the config file (change the display name, etc) with:</p>
<pre>sudo nano /etc/minidlna.conf</pre>
<p><b>6.</b> Finally, start the UPnP Media Server with:</p>
<pre>sudo systemctl start minidlna
sudo systemctl enable minidlna</pre>
<p><b>7.</b> Your PirateBox should be ready to use! Be sure to also check out the <strong><a href="http://forum.piratebox.cc/list.php?7">Raspberry Pi(rate)Box discussion board</a></strong> on our <strong><a href="http://forum.piratebox.cc">PirateBox Forum</a></strong>.</p>
