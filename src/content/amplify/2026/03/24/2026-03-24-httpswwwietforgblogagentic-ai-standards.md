---
author: IETF
cover_image: 'https://www.ietf.org/media/images/ietf-logo-500-square-250x250.original.jpg'
date: '2026-03-24T16:08:33.904Z'
dateFolder: 2026/03/24
description: >-
  When it comes to standards work around agentic AI, we’re at an exciting
  threshold. As more tools emerge, we’re seeing the amazing things it can
  accomplish. Now, we’re trying to figure out what parts of it need to be
  standardized.
isBasedOn: 'https://www.ietf.org/blog/agentic-ai-standards/'
link: 'https://www.ietf.org/blog/agentic-ai-standards/'
slug: 2026-03-24-httpswwwietforgblogagentic-ai-standards
tags:
  - ai
  - tech
title: 'Agentic AI communications: Identifying the standards we need'
---
<figure><img alt="pexels-max-johnson-719698503-18296012" src="https://www.ietf.org/media/images/pexels-max-johnson-719698503-18296012.original.jpg"/></figure>
<p>There’s lots of work going on in this space, particularly at the IETF. But first, I want to identify a few of the processes and problems that might merit standardization when it comes to multi-vendor interoperability of applications over the Internet. (Remember, these are just my opinions on the subject.)</p>
<p>During <a href="https://datatracker.ietf.org/meeting/124/proceedings">IETF 124</a> in Montreal, Jonathan Rosenberg and I held a side meeting on this topic. You can view the <a href="https://github.com/jdrosen/aiproto-wg/blob/main/charter.txt">strawman charter created for a potential working group</a>.</p>
<p>With agentic AI (i.e. systems that allow AI agents to act on a human’s behalf), there’s a lot of communication going on: There’s human-to-agent, agent-to-tools, agent-to-agent. The human-to-agent communication is often very specific to that particular agent and how it wants to interact, so I don’t see a need for too much standardization there. But I think agent-to-agent or agent-to-tool communication will need it, because this often involves agents from one organization interacting with agents from another organization.</p>
<p>Here are some questions to consider:</p>
<ul><li data-block-key="afllp">How do we know what other agents exist? How do we know their capabilities?</li><li data-block-key="6gmtc">When an agent needs to ask something of another agent, how will it be done? What information will that agent bring in as context? </li><li data-block-key="bmbu6">How can we control permissions and privacy when giving these agents our credentials?</li><li data-block-key="1k1v">How can these agents deal with multiple types of media at the same time (multimodal)?</li><li data-block-key="8mulo">How do we keep humans in the loop?</li></ul>
<p>Let’s say you’re planning your week at <a href="https://www.ietf.org/meeting/125/">IETF 125</a>, and you ask a chatbot (typing) to tell you the best restaurants in Shenzhen, and that chatbot responds with a list. As you continue to communicate with the chatbot to narrow down where you want to go, it will probably be easier to just switch to talking (audio) or perhaps look at photos from the restaurants.</p>
<p>This presents the need for multimodal capabilities with these tools. You might need images of a city map to know your proximity to the restaurants. And as the tool continues the conversation, it’s going to need to hold onto any context you’ve given it, whether that’s audio, text, images, Smell-O-Vision, etc.</p>
<p>Now say you’ve figured out where you want to have dinner, and you want the agent to make a reservation for you. It’ll need to now work with another agent, like one from OpenTable, to make the booking. That agent will need your credentials to make a reservation on your behalf, so how will it have access? And how can you limit what it knows about you? If it uses a 2FA system such as Visa Secure to access your credit card, how will that work?</p>
<p>The two AI agents can work together to choose a date, a time, and maybe a seating preference. This is where we need to keep humans in the loop. You can say yes, you want outdoor seating so you can enjoy a view of Shenzhen Bay. Or you can abort the mission altogether when it tells you the only availability is two weeks after IETF. Also, will you have to pay to make the reservation? If so, you will need to confirm this. (This opens the door to the topic of prompt fatigue. Will standardizing generate this among end-users?)</p>
<p>Our side meeting covered a lot of these topics, and even though we’re just at the beginning, we had 125 people in the room with roughly the same amount online, and we discussed a bunch of this work. Over the next few months, we’ll craft a proposed charter for an IETF working group that identifies some of the building blocks that need to be standardized to accelerate the full potential of agents. We will work with the creators of today's protocols and software along with users of these protocols to help figure out the right way to get from where we are today to where we want to be.</p>
<p>Doing this kind of work in a standards organization like the IETF has a big advantage: It brings lots of people’s views together as we try to find a solution that will work for many use cases and multiple vendors. The end result usually has a far greater reach and adoption than if the work was done by a single vendor.</p>
<p>So if you are interested in following this work or getting involved, follow the discussion on the <a href="https://mailman3.ietf.org/mailman3/lists/agent2agent.ietf.org/">IETF agent-to-agent mailing list</a>. You can also follow the <a href="https://github.com/jdrosen/aiproto-wg/blob/main/charter.txt">charter Github repo</a>.</p>
