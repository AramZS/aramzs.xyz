---
dateCreated: 2025-08-17
aliases:
  - Cat-ShapedWi-FiDefender
public:
---
# Cat-Shaped Wi-Fi Defender: Hands-on Hacker Hunting With Microcontrollers 

- Defensive wifi - good to teach 
- Can use it for self defense and offense 
- Signals intelligence and forensics - it is useful for that 
- hack.gay 
- YouTube channels - Retia, SecurityFwd 
- Null by Channel was their old channel. 
- Github examples github.com/skickar/CatGotYourPassword 
- Serial terminal - serialterminal.com 
- Flashing tool - nugget.dev 
- Retia Discord - discord.gg/rjVJbauAUX
- youtube.com/@SecurityFWD 
- youtube.com/@RetiaLLC 
- Learn safely and ethically 
	- don't 
		- attack devices you don't own or have permission to exploit 
		- getting attacked in the wild 
	- Attack yourself to learn self-defense instead 
		- use your own devices as a lab 
		- audit your own devices to make them more secure 
- Do not use the de-authentication module until told. 
- Hotspot we'll be using.
- How to scan for wifi data leaks your phone is always transmitting 
- using wifi beacons to actively pull personal info from smartphones
- Tracking locations of smartphones that scan evil QR codes 
- Wifi phishing attacks that steal your home or work wi-fi passwords 
- Many phones send out large bursts of networks they've connected to in the past 

## Discover Networks stored on a phone 

- The links to WiFi don't stop when you turn off the wifi because your GPS is assisted by wifi hotspot detection. They scan it, send it to an API, and return an approx GPS info. 
- Skyhook - creates the wifi networks that are immediately next to Zuckerberg's pool. Fools phone into thinking you are there. 
- Only thing that turns off the wifi radio is airplane mode. 
- Some phones may even have wifi on in airplane mode. 

## Beacon Swarms 

- Actively extract saved networks 
- Make a swarm of WiFi beacons that look like real wi-fi networks but can't be joined. 
- If a nearby wifi device has a matching network name stored it will try to connect and fail. 
- This information can be used to infer where the device has been previously or expose the owner's idenitty 
- This is an active attack and can be detected 
- Fake wifi beacon from the place you've been and attached to. 

## Poisoned QR Codes 

- Tag a phone for tracking & MITM 
- QR code to inject an evil network into a smartphone and access it 

## Wi-Fi Phishing 

- Easy and effective 
- Disable valid wi-fi network with a deauth attack (we won't do this part) 
- Create a fake network pretending to be from the router with no password. 
- When victim connects a spoofed login page appears. 

## Microcontroller 

- Inexpensive, fine to break, no OS, program in specific languages that you compile for it. 
- Can flash through a chrome browser. 
- This specific one can't do a full handshake, but can pull metadata. 
- New ones don't support raw packet writing 

## Going 

- blog.spacehuhn.com 
- [Nugget Dev Suite](https://nugget.dev/) will connect to your nugget
- Can do the Open Drone ID Drone Swarmer 
	- New Drone ID system uses 2.3ghz so we can put out fake drone IDs to make a fake swarm of drones. 
- Nugget Deauther (friendly version) is the one with the screen 
- The Deauth Detector scans for the type of attacks we are trying. Can check if someone is jamming you deliberatly. 
- You will have to plug it in, flash it, and unplug it and plug it back in
- Use the site's Serial Terminal to connect to the device then you can enter `help` to get more commands and `chicken` to confirm that you are on the right packge. 
- `scan` to get a list of wifi hotspots 
- Sometimes you just have to hit erase and flash it twice. \
- Serial Terminal app on Google Play store 
- Add serial dial out on Linux
- 3D modeling/slicer software operates on the port. Killed by "kuira" (sp?)
- RSSI - the lower it is the closer you are to the wifi source 
- For android you have to set your baud rate to 115200 
- Can get a more extensive terminal at [Spacehuhn Serial Terminal](https://terminal.spacehuhn.com/)
- Can also use the terminal at serialterminal.com 
- `help scan` gives you command info
- default `scan` scans for channels not in the US
- Only 3 channels in the 2.7ghz don't overlap so mostly they cluster around 1, 6 and 11 
- "Stations" on the scan tells you who is connected to what access point. Mac address is provided by manufacturer and that tells you who makes it sometimes 
- Probe requests tells you information about what networks your device has connected to before by mac address 
- [GitHub - skickar/CatGotYourPassword: Repo for Missoula class](https://github.com/skickar/CatGotYourPassword) has sample commands. 
- Modes: `st` == station scan. `ap` == access point. 
- Specify channels - `scan -m st -ch 1,6,11 -t 60 -ct 5000`
- Micro contorller doesn't look at 5ghz 
- Convience background list - wants to get you preconnected to the networks as quickly as possible. 

### BeaconSwarm 

- Very public through there is a way to target it to an individual person. 
- If you have any of the wifis stored in your phone it will attempt to auto connect to one of the fake beacons. 
- Once they've connected to you you can become a man in the middle. 
- Can identify important people quickly. 
- beacon command 
- Example - [CatGotYourPassword/beacon\_swarm.txt at main · skickar/CatGotYourPassword · GitHub](https://github.com/skickar/CatGotYourPassword/blob/main/beacon_swarm.txt) 
	- `beacon "A_Guest","Ace Hotel","Americas Best Value Inn","Amoeba - Guest","Budget Inn","CableWiFi","Camden","CenterWiFi","CityofLosAngelesGuest","CoffeeBeanWifi","Comfort Inn","Cricket-Guest","DHS_Guest","DaysInnOnline","Dennys_Guest_WIFI","FBI-SurveillanceVan","Google Starbucks","Guest","Guest T-Mobile","Guestnet","Hazelitas-guest","Hollywood Guest Inn","Hollywood Palms Inn & Suites","JWMarriott_GUEST","JWMarriott_LOBBY","Jacks_Guest","LAFILM Guest","LATTC-Visitor","LATimes-Guest","LAUSD-Guest","LAX-C guest","McDonalds Free WiFi","Moment Hotel","Netflix","Oh Ranger! Wi-Fi","PATH Wifi","Paulist-guest","Philz Coffee","Public Health Guest","Rodeway Inn","Roosevelt","SETUP","Saharan Motor Hotel","Sandhouse Wi-Fi","Staff","Starbucks WiFi","Stella Barra Guest","Students","Sunset 8 Motel","THEMELT","TWCWiFi","TWGuest","Tender Greens","URBAN_GUEST_WIFI","USC Guest Wireless","WHOPPERWIFI","WK-Guest","WL-GUEST","WLAN-GUEST","Wendys_Guest","WhopperWifi","WlanVPN","admin-guest","att-wifi","attwifi" -mon`
- `-mon` lets you monitor which devices nearby recognize the wifis and try to connect. 
- Can prove a person has been to a place 
- Karma attack uses the information that someone has connected to a network before to take over the data connection. 
- "wifi pineapple" will automatically run this attack - a sign is that old networks are popping up out of nowhere. A sign of an active attack. 
- Medium wifi device. 
- We would have to walk around and look at signal strenght to find where it is. 
- If it stops working, just re-scan it. 
- Promiscous scanning is not available to all wifi hardware. 
- probe requests - calls out for specific networks. 
- To track it down we want to focus on the channel the device is broadcasting on. 
- `rssi -ap 9` start tracking access point number 9 on the scan list 
	- Can also connect to stations or just by mac addresses 
- Scan `fing`, `nmap` or something like that to map everything on the network. 

### Evil QR Codes 

- You can make a wi-fi QR code which is sneaky because it adds data the user can't see 
- but you can broadcast that network and get them to connect 
- You can add hidden wifi 
- [pure JS WiFi QR Code Generator](https://qifi.org/) will let you create a wifi QR code. 
- May not even prompt you to join the network just adds it. 
- You could also use NFC tags. 
- Some radiosets do random things where they add stuff to the packets that can create a type of fingerprint on a wifi packet. 

### WiFi phishing attacks 

- Check for the pixie dust attack 
	- WPS setup flaw
- Wifi Password cracking - grab hotspot and run passwords at it. 
- Deauth attack turned off our connection to that network. 
- A fake auth page 
	- Uses the MAC address to pretend it is the right brand of router 
	- It checks against the actual router and makes sure you have the right password that you put in
	- It's an open source linux page. 
	- asks for your wifi password 
	- Shipped it to a company mailroom to a person that didn't exist, it captures the password, and then it gets returned in the mail. 
- `deauth` are the commands that let you run the de-authentication attack. 
	- protocol based jamming 
	- Used to take out wifi security cameras. 
	- Sends a deauth packet instructing you to disconnect 
	- Can it be mitigated? 
		- Enable protected management frames on your network (signs deauth network frames)
		- WPA3 is harder to attacks
	- The "deauth detecter" is a thing you can put on the nugget and give you a visual indicator that you are being blocked by someone. 
		- It will turn red, look angry, and have the eyes crossed out. 
		- You can recompile it to only detect attacks against the mac address against your ap. 
	- Good against IOT 
		- Some can even have firmware flashed via wifi. 
- Relies on a captive portal. 
	- pops it up on your screen from the OS
	- can change the phishing page by recompiling in an arduino 
	- Doesn't need a cert 
- `ap` command can create an access point. 
	- Can join the fake network. 
	- can see information about the device that is connected. 
- If your protected network suddenly pops up with the same name but without a password protection that's a bad sign. 
- Never type your wifi password into a website. 
- Set saved wifi networks to not auto-join 
- Use a VPN to prevent an evil network from snooping or modifying your traffic. 
- Don't add networks via QR codes - scan it and get the actual text if you have to. `H:true` is bad, hidden networks are bad and not really secure. 
- Teach a friend. 