---
author: Terence Eden
cover_image: 'https://shkspr.mobi/blog/wp-content/uploads/2025/07/OS-Selection.webp'
date: '2025-10-07T12:57:08.178Z'
dateFolder: 2025/10/07
description: >-
  If you've spent any time using Linux, you'll be used to installing software
  like this:  The README says to download from this link. Huh, I'm not sure how
  to unarchive .tar.xz files - guess I'll search for that. Right, it says run
  setup.sh hmm, that doesn't work. Oh, I need to set the permissions. What was
  the chmod command again? OK, that's working. Wait, it needs sudo. Let me run
  that again.…
isBasedOn: 'https://shkspr.mobi/blog/2025/10/how-to-actually-test-your-readme/'
link: 'https://shkspr.mobi/blog/2025/10/how-to-actually-test-your-readme/'
slug: 2025-10-07-httpsshksprmobiblog202510how-to-actually-test-your-readme
tags:
  - code
title: How to *actually* test your readme
---
<p>If you've spent any time using Linux, you'll be used to installing software like this:</p>
<blockquote> <p>The README says to download from this link. Huh, I'm not sure how to unarchive .tar.xz files - guess I'll search for that. Right, it says run <code>setup.sh</code> hmm, that doesn't work. Oh, I need to set the permissions. What was the <code>chmod</code> command again? OK, that's working. Wait, it needs <code>sudo</code>. Let me run that again. Hang on, am I in the right directory? Here it goes. What, it crapped out. I don't have some random library - how the hell am I meant to install that? My distro has v21 but this requires &lt;=19. Ah, I also need to upgrade something which isn't supplied by repo. Nearly there, just need to compile this obscure project from SourceForge which was inexplicably installed on the original dev's machine and then I'll be good to go. Nope. Better raise an issue on GitHub. Oh, look, it is tomorrow.</p> </blockquote>
<p>As a developer, you probably don't want to answer dozens of tickets complaining that users are frustrated with your work. You thought you made the README really clear and - hey! - it works on your machine.</p>
<p>There are various solutions to this problem - developers can release AppImages, or Snaps, or FlatPaks, or Docker or whatever. But that's a bit of stretch for a solo dev who is slinging out a little tool that they coded in their spare time. And, even those don't always work as seamlessly as you'd hope.</p>
<p>There's an easier solution:</p>
<ol> <li>Follow the steps in your README</li> <li>See if they work.</li> <li>…</li> <li>That's it.</li> </ol>
<p>OK, that's a bit reductive! There are a million variables which go into a test - so I'm going to introduce you to a secret <em>zeroth</em> step.</p>
<ol start="0"> <li>Spin up a fresh Virtual Machine with a recent-ish distro.</li> </ol>
<p>If you are a developer, your machine probably has a billion weird configurations and obscure libraries installed on it - things which <em>definitely</em> aren't on your users' machines. Having a box-fresh VM means than you are starting with a blank-slate. If, when following your README, you discover that the app doesn't install because of a missing dependency, you can adjust your README to include <code>apt install whatever</code>.</p>
<p>Personally, I like <a href="https://flathub.org/apps/org.gnome.Boxes">Boxes</a> as it gives you a simple choice of VMs - but there are plenty of other Virtual Machine managers out there.</p>
<figure><img alt="List of Linux OSes." src="https://shkspr.mobi/blog/wp-content/uploads/2025/07/OS-Selection.webp"/><figcaption>List of Linux OSes.</figcaption></figure>
<p>Pick a standard OS that you like. I think the latest Ubuntu Server is pretty lightweight and is a good baseline for what people are likely to have. But feel free to pick something with a GUI or whatever suits your audience.</p>
<p>Once your VM is installed and set up for basic use, take a snapshot.</p>
<figure><img alt="Pop up showing a snapshot of a virtual machine." src="https://shkspr.mobi/blog/wp-content/uploads/2025/07/revert.webp"/><figcaption>Pop up showing a snapshot of a virtual machine.</figcaption></figure>
<p>Every time you want to test or re-test a README, revert back to the <em>original</em> state of your box. That way you won't have odd half-installed packages laying about.</p>
<p>Your next step is to think about how much hand-holding do you want to do?</p>
<p>For example, the default Debian doesn't ship with git. Does your README need to tell people to <code>sudo apt install git</code> and then walk them through configuring it so that they can <code>git clone</code> your repo?</p>
<p>Possibly! Who is your audience? If you've created a tool which is likely to be used by newbies who are just getting started with their first Raspberry Pi then, yeah, you probably will need to include that. Why? Because it will save you from receiving a lot of repeated questions and frustrated emails.</p>
<p>OK, but most developers will have <code>gcc</code> installed, right? Maybe! But it doesn't do any harm to include it in a long list of <code>apt get …</code> anyway, does it? Similarly, does everyone know how to upgrade to the very latest npm?</p>
<p>If your software is designed for people who are experienced computer touchers, don't fall into the trap of thinking that they know everything you do. I find it best to assume people are intelligent but not experienced; it doesn't hurt to give <em>slightly</em> too much detail.</p>
<p>The best way to do this is to record <em>everything</em> you do after logging into the blank VM.</p>
<ol start="0"> <li>Restore the snapshot.</li> <li>Log in.</li> <li>Run all the commands you need to get your software working.</li> <li>Once done, run <code>history -w history.txt</code> <ul> <li>That will print out <em>every</em> command you ran. </li> </ul> </li> <li>Copy that text into your README.</li> </ol>
<p>Hey presto! You now have README instructions which have been tested to work. Even on the most bare-bones machine, you can say that your README will allow the user to get started with your software with the minimum amount of head-scratching.</p>
<p>Now, this isn't foolproof. Maybe the user has an ancient operating system running on obsolete hardware which is constantly bombarded by cosmic rays. But at least this way your issues won't be clogged up by people saying their install failed because <code>lib-foobar</code> wasn't available or that <code>./configure</code> had fatal errors.</p>
<p>A great example is <a href="https://github.com/xiph/opus/blob/main/README">the Opus Codec README</a>. I went into a fresh Ubuntu machine, followed the readme, ran the above history command, and got this:</p>
<pre><code>sudo apt-get install git autoconf automake libtool gcc make
git clone https://gitlab.xiph.org/xiph/opus.git
cd opus
./autogen.sh
./configure
make
sudo make install
</code></pre>
<p>Everything worked! There was no missing step or having to dive into another README to figure out how to bind flarg 6.9 with schnorp-unstable.</p>
<p>So that's my plea to you, dear developer friend. Make sure your README contains both the necessary <em>and</em> sufficient information required to install your software. For your sake, as much as mine!</p>
<p>You're quite right. Feel free to send a pull request to correct this post - as I shall be doing with any unhelpful READMEs I find along the way.</p>
