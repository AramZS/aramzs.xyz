---
author: Hacker Fiction Net
cover_image: 'https://hackerfiction.net/img/hacker-fiction-square.jpeg'
date: '2021-06-18T16:50:56.000Z'
dateFolder: 2021/06/18
description: 'https://hackerfiction.net/blog/2021/june/wargames-review.html'
isBasedOn: 'https://hackerfiction.net/blog/2021/june/wargames-review.html'
link: 'https://hackerfiction.net/blog/2021/june/wargames-review.html'
slug: 2021-06-18-httpshackerfictionnetblog2021junewargames-reviewhtml
tags:
  - favorite
title: Hacker Fiction Net
---
<figure><img src="https://i.ytimg.com/vi/tAcEzhQ7oqA/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AG-AoAC8AGKAgwIABABGEIgQihyMA8=&amp;rs=AOn4CLD_Br4mTTVhD88HkrS6NBvXn1p-sw"/></figure>
<h3>Computers Over Humans</h3>
<p>The movie starts with two nuclear missile operators at their work stations in an underground bunker. An alarm goes off. The two men are to execute the launch procedure, killing hundreds of thousands of people. The stakes are immense. One of the operators refuses to turn his key to launch the missile.</p>
<p>It was a test, a test of the human factor, and the US decides to let computers take over launch control. Because computer programs don’t have flaws, right?</p>
<h3>The Movie’s First Hack</h3>
<p>High school whiz kid David Lightman (Matthew Broderick) is late for school because he’s playing arcade games and tops it up by pulling a joke on his teacher. He’s sent to the principal’s office.</p>
<p>While waiting for the principal, Lightman sneaks to check the current password to the school’s computer which he apparently knows is on a note right beside the computer itself. The password ”pencil" is far too simple by today’s security standards, but it’s not unlikely for its time. Neither is the fact that the school uses a shared password. For a similar hack to fly today it would have to be a personal, more complex password at minimum.</p>
<p>Lightman uses the password log in to the school’s computer through his modem and notices that both he and a girl in his class, Jennifer (Ally Sheedy) have received the grade F. He bumps their grades but Jennifer is upset and demands he changes hers back. This introduces the viewers to the moral of hacking.</p>
<h3>Brute Force Hacking</h3>
<p>An ad for a new computer game catches Lightman’s attention and he wants to get himself a copy for free by connecting to the game company’s computer. He has his computer call all numbers in Sunnyvale, CA, in search of available computers. It's a brute force hack and I find it cool because calling all numbers is a very big task for humans but not so much for a computer. A hacker knows how to leverage the power of the machine. Computers back in those days communicated over phone lines and if you knew the right phone number you could connect.</p>
<h3>Curiosity Killed the Cat</h3>
<p>He finds a system in Sunnyvale that offers games, but not the game he was looking for.</p>
<p>One of the games is called ”Global Thermonuclear War.” The audience already knows about the newly computerized missile launch system, which makes Lightman come across as naive when he wants to play this game. But why wouldn’t he?</p>
<p>It’s unclear whether online games are common when the movie takes place. Networked, multi-player games such as Multi-User Dungeon, or MUD, did already exist in the early 80s. But in most cases you would connect two computers directly to each other in the same room to have a two-player setup.</p>
<p>The system Lightman finds requires a password. When he tries one, the computer on the other end responds ”Identification not recognized by system. --Connection Terminated--.” He is unable to get access and needs help.</p>
<h3>The Idea of a Backdoor</h3>
<p>Lightman and Jennifer bring a print-out of the system’s game listing to two computer professionals, Jim (Maury Chaykin) and Malvin (Eddie Deezen).</p>
<p>A side note on Deezen: He's the movie industry's favorite nerd voice, playing the nerdy student in Grease, Mandark in Dexter's Laboratory, and the know-it-all kid in Polar Express. I love Deezen's voice.</p>
<p>Back to WarGames and getting help with that online games password. We’re going to go into detail here because there are at least four things to unpack. Below is the dialog from when Lightman asks the two pros Malvin and Jim about his finding.</p>
<p>Malvin: <em>Wow! Where did you get this?</em></p>
<p>Lightman: <em>I was trying to break into Protovision. I wanted to see the program for their new games.</em></p>
<p>Jim: <em>This didn’t come from Protovision.</em></p>
<p>Malvin: <em>Looks military to me. Definitely military. Probably classified too.</em></p>
<p>Lightman: <em>Yeah, but if it’s military, why does it have games like Checkers and Backgammon?</em></p>
<p>Jim: <em>Maybe because those are games that teach basic strategy.</em></p>
<p>Lightman: <em>Jim, how do I get into that system? I wanna play those games.</em></p>
<p>Malvin: <em>You’re not supposed to see any of that stuff. That system probably contains the new data encryption algorithm. You’ll never get in there.</em></p>
<p>Lightman: <em>Hey, I don’t believe that any system is totally secure. I bet you Jim could get in.</em></p>
<p>Jim: <em>Well, you’ll never get in through the frontline security, but you might look for a backdoor.</em></p>
<p>Malvin: <em>I can’t believe it, Jim. That girl is standing over there listening and you’re telling her about our backdoors?</em></p>
<p>Jim: <em>Mr. Potato Head! Backdoors are not secrets.</em></p>
<p>Lightman: <em>What’s a backdoor?</em></p>
<p>Jim: <em>Whenever I design a system, I always put in a simple password that only I know about. That way, whenever I wanna get back in, I can bypass whatever security they’ve added on. That’s basically what it is.</em></p>
<p>Lightman: <em>Yeah?</em></p>
<p>Jim: <em>OK, if you really want to get in, find out as much as you can about the guy who designed the system.</em></p>
<h4>Four Things To Unpack</h4>
<ol> <li> <p>From what we have seen from Lightman’s monitor, the printout only has the list of games. Sure, it contains a handful of combat and war games, but it’s hard to understand how Malvin and Jim can deduce that it’s a military system or that encryption is at play just from that list. Maybe online systems were so rare at the time that it was likely a military system?</p> </li> <li> <p>Then we have ”the new data encryption algorithm.” I bet you they refer to the <a href="https://en.wikipedia.org/wiki/Data_Encryption_Standard">Data Encryption Standard, DES</a>, that was developed in the mid-seventies. Malvin’s terminology here is unconvincing. Systems don’t ”contain” algorithms, they use them. If it’s the algorithm itself that’s supposedly sensitive, then it’s either wrong because the DES algorithm was made a public standard in 1977, or they need to point out that the particular <em>implementation</em> of the algorithm is sensitive. Sensitive in so far as Lightman might be finding bugs in it. But I think what the writers meant is that the system uses some modern type of encryption which makes it hard to break into. That’s just not what Malvin says.</p> </li> <li> <p>Lightman’s response to the impossible challenge is good. ”I don’t believe that any system is totally secure.” That’s real hacker mentality.</p> </li> <li> <p>Finally, the backdoor. When Jim says backdoors aren’t secret, what he means is that the <em>existence</em> of backdoors is not a secret. The backdoor itself, for instance a password, is of course secret. Jim even refers to them as ”a simple password that only I know about.” The important part here is that Lightman is provided with a way in that doesn't require months of work.</p> </li> </ol>
<h3>Researching the Target</h3>
<p>Finding the backdoor into the missile launch system is still hard and Lightman needs to research his target. This is an important task for professional hackers, especially ones that do so called social engineering, i.e. tricking humans into helping with access.</p>
<p>Lightman starts with the listed game ”Falken’s Maze” as his first clue. He goes to the library and discovers that Falken’s Maze was designed by famous researcher Stephen Falken. After a bunch of research and many failed login attempts, he finds the backdoor with the password ”Joshua,” the name of Falken’s deceased son.</p>
<h3>The Unintentional Hacker</h3>
<p>Lightman is finally able to play Global Thermonuclear War. We as an audience get to see that his gameplay actually triggers war preparations in the US military.</p>
<p>When Lightman later watches the news on TV he realizes that he has caused a real missile alert. He decides to destroy all evidence of his hack but the missile launch system, self-identifying as Joshua, calls Lightman's computer to say that the game is still on and that he needs to make his next move.</p>
<p>The FBI traces the phone connection and comes for Lightman in his house. All seems lost. How is he ever going to get out of this? And how will he be able to stop a global nuclear war?</p>
<h3>The Final Hack</h3>
<p>Lightman manages to escape through a neat hardware hack which involves a PIN code pad, is rejoined by Jennifer, and hunts down the now nihilist Dr. Falken on an island living by himself. They get Falken to try to stop the war.</p>
<p>Falken is able to convince the US military de-escalate but Joshua is hell-bent on finishing the game and embarks on a brute force attack to find the US launch codes himself when the military command refuses to continue playing.</p>
<p>Step by step Joshua gets closer to finding the code. This implies that you can discover a key or password one character at a time — a popular misconception. Only under special circumstances can you do so.</p>
<p>The final hack is when Lightman teaches Joshua the concept of a game you cannot win by having the computer play an endless streak of tic-tac-toe against itself. This knowledge leads Joshua to realize that the only winning move in ”Global Thermonuclear War” is not to play, an on-the-nose comment on the Atomic Age in which this movie was created.</p>
<h3>Remarks</h3>
<p>I still love this movie. The computer illiterate Jennifer tagging along the whiz kid Lightman enforces the girl/boy stereotypes of the time. Deliberately snapping out of being critical of that gives me a chance to enjoy how hacking and over-reliance on computer systems form the theme of the movie.</p>
<p>The fact that WarGames influenced President Reagan, and by extension the US cyber defense, shows the impact fiction can have. You can read about that in The Guardian's review of the non-fiction book <a href="https://www.theguardian.com/technology/2016/mar/20/dark-territory-review-ronald-reagan-matthew-broderick-war-games-american-cyberwar">Dark Territory</a>.</p>
<p>Published June 2021.</p>
