---
author: 'https://github.com/MicrosoftEdge/'
cover_image: >-
  https://opengraph.githubassets.com/5e0693b3a522424cf58afe705b8a352762eaae691f3235458f05158148895314/MicrosoftEdge/MSEdgeExplainers
date: '2025-11-13T05:50:40.892Z'
dateFolder: 2025/11/13
description: >-
  Home for explainer documents originated by the Microsoft Edge team -
  MicrosoftEdge/MSEdgeExplainers
isBasedOn: >-
  https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md
link: >-
  https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md
slug: >-
  2025-11-13-httpsgithubcommicrosoftedgemsedgeexplainersblobmainpwawidgetsreadmemd
tags:
  - code
title: MSEdgeExplainers/PWAWidgets/README.md at main · MicrosoftEdge/MSEdgeExplainers
---
<p><a data-hotkey=".,Mod+Alt+." href="https://github.dev/">Open in github.dev</a> <a data-hotkey="Shift+.,Shift+&gt;,&gt;" href="https://github.dev/">Open in a new github.dev tab</a> <a data-hotkey=",,Mod+Alt+," href="https://github.com/codespaces/new/MicrosoftEdge/MSEdgeExplainers/tree/main?resume=1">Open in codespace</a> </p>
<h2>Expand file tree</h2>
<p>t</p>
<p>More file actions</p>
<p>More file actions</p>
<h1>PWA-driven Widgets Explainer</h1>
<p>Author: <a href="https://github.com/aarongustafson">Aaron Gustafson</a></p>
<h2>Status of this Document</h2>
<p>This document is a starting point for engaging the community and standards bodies in developing collaborative solutions fit for standardization. As the solutions to problems described in this document progress along the standards-track, we will retain this document as an archive and use this section to keep the community up-to-date with the most current standards venue and content location of future work and discussions.</p>
<ul> <li>This document status: <strong>Active</strong></li> <li>Expected venue: <a href="https://wicg.io/">W3C Web Incubator Community Group</a></li> <li><strong>Current version: this document</strong></li> </ul>
<h2>Introduction</h2>
<p>Native applications can expose information and/or focused tasks within operating systems using widgets. Examples of this include Android Home Screen Widgets, macOS Dashboard and Today Panel Widgets, the Apple Touch Bar, Samsung Daily Cards, Mini App Widgets, smart watch app companions, and so on. When building Progressive Web Apps, it would useful to be able to project aspects of the web app onto these surfaces.</p>
<h2>Goals</h2>
<ul> <li>Enable developers to build lightweight, template-driven PWA-driven Widgets.</li> <li>Enable developers to configure widgets using the Web App Manifest.</li> <li>Enable developers to update widgets from their Service Worker.</li> <li>Enable developers to respond to user interaction within their widgets from within their Service Worker.</li> <li>Enable support for multiple widget hosts within a host operating system.</li> <li>Enable users to have multiple instances of a given widget (optionally, with distinct settings values).</li> </ul>
<h2>Non-goals</h2>
<ul> <li>Enable developers to designate a web page to act as a Widget (see <a href="https://github.com/aarongustafson/pwa-widgets#Rich-Widgets">Rich Widgets in my original proposal</a>).</li> </ul>
<h2>Use Cases</h2>
<ul> <li>A streaming video service could offer access to all of the shows or movies you have in your queue that is distinct from the actual player. It might live in a widget on one device, but, with access to all of the plumbing of the PWA itself, could enable users to control the services’ PWA running on the user’s smart TV.</li> <li>A stock tracking app could offer a widget for viewing current stock prices for stocks you are watching.</li> <li>A calendar service could provide a daily agenda at a glance.</li> </ul>
<h2>Definitions</h2>
<h3>Nouns</h3>
<dl> <dt>Widget</dt><dd> <p>A discrete user experience that represents a part of a website or app’s functionality. Refers to the prototypical definition of an experience (e.g., follow an account), <em>not</em> the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">individual representations of this widget</a> (e.g., follow bob) that exist in a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a>.</p> </dd> <dt>Widget Host</dt><dd> <p>A container that manages and renders widgets.</p> </dd> <dt>Widget Instance</dt><dd> <p>The interactive experience of a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget">Widget</a> within a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a>. Multiple instances of a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget">Widget</a> may exist within a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a>. These distinct instances may have associated <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-settings">settings</a>.</p> </dd> <dt>Widget Settings</dt><dd> <p>Configuration options, defined on a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget">Widget</a> and unique to a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instance</a>, that enable that instance to be customized.</p> </dd> <dt>Widget Provider</dt><dd> <p>An application that exposes Widgets. A browser would likely be the Widget Provider on behalf of its PWAs and would act as the proxy between those PWAs and any <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a>.</p> </dd> <dt>Widget Registry</dt><dd> <p>The list of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-install">installable</a> <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget">Widgets</a> <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-register">registered</a> by <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-provider">Widget Providers</a>.</p> </dd> <dt>Widget Service</dt><dd>Also: Widget Platform</dd><dd> <p>Manages communications between <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Hosts</a> and <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-provider">Widget Providers</a>.</p> </dd> </dl>
<h3>Verbs</h3>
<dl> <dt>Install</dt><dd>Also: Instantiate</dd><dd> <p>Create a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instance</a>.</p> </dd> <dt>Register</dt><dd> <p>Add a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget">Widget</a> to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-registry">Widget Registry</a>.</p> </dd> <dt>Uninstall</dt><dd> <p>Destroy a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instance</a>.</p> </dd> <dt>Unregister</dt><dd> <p>Remove a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget">Widget</a> from the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-registry">Widget Registry</a>.</p> </dd> <dt>Update</dt><dd> <p>Push new data to a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instance</a>.</p> </dd> </dl>
<h2>Templated Widgets</h2>
<p>In order to provide a lightweight experience, this proposal suggests that Widgets be template-driven, similar to <a href="https://notifications.spec.whatwg.org/#lifetime-and-ui-integrations">Notifications</a>. Templated widgets may be more limited in their customization through use of the PWA’s <code>icons</code>, <code>theme_color</code>, and <code>background_color</code> or they may be customizable through use of a templating language (such as Adaptive Cards). A <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> should provide a set of common templates — such as an agenda, calendar, mailbox, task list — but its complete list of available templates will likely vary. This proposal suggests <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#Suggested-template-types">this list of widgets template types</a> as a reasonable starting point.</p>
<h3>Suggested template types</h3>
<p>For social and productivity apps:</p>
<ul> <li>calendar-agenda</li> <li>calendar-day</li> <li>calendar-week</li> <li>calendar-month</li> </ul>
<p>For address books, directories, and social apps:</p>
<ul> <li>contacts-list</li> <li>contacts-item</li> </ul>
<p>For general purposes (e.g., news, promotions, media, social):</p>
<ul> <li>content-carousel</li> <li>content-feed</li> <li>content-item</li> </ul>
<p>For productivity apps:</p>
<ul> <li>email-list</li> <li>task-item</li> <li>task-list</li> </ul>
<p>For auth-requiring Widgets:</p>
<ul> <li>login-prompt</li> </ul>
<p><a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/template-samples/README.md">A selection of template samples</a>, composed using Adaptive Cards, accompany this Explainer.</p>
<h3>Data flow</h3>
<p>Widgets support user interaction through one or more <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#Defining-a-WidgetAction">developer-defined <code>WidgetAction</code> objects</a>, which are analogous to a <a href="https://notifications.spec.whatwg.org/#dictdef-notificationaction"><code>NotificationAction</code></a>.</p>
<p>Data flow in a Templated Widget is largely managed in two ways:</p>
<ol> <li>Data flows from the Service Worker to a Widget instance as part of the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsupdatebyinstanceid"><code>widgets.updateByInstanceId()</code></a> and <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsupdatebytag"><code>widgets.updateByTag()</code></a> methods.</li> <li>Data (in the form of interaction) flows from a Widget to the associated PWA’s Service Worker via a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-related-events"><code>WidgetEvent</code></a>.</li> </ol>
<p>Here is an example of how this might look in the context of a Periodic Sync:</p>
<figure><a data-target="animated-image.originalLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/sync.gif"><img alt="" data-target="animated-image.originalImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/sync.gif"/></a></figure>
<p> <a data-target="animated-image.replacedLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/sync.gif"> <figure><img alt="sync.gif" data-target="animated-image.replacedImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/sync.gif"/></figure> </a> </p>
<p>This video shows the following steps:</p>
<ol> <li>As part of a Periodic Sync, the Service Worker makes a <code>Request</code> to the host or some other endpoint.</li> <li>The <code>Response</code> comes back.</li> <li>As the Service Worker is aware of which widgets rely on that data, via the <code>WidgetDefinition</code> provided during <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-install">install</a>, the Service Worker can identify which widgets need updating. (This is internal logic and not shown in the video).</li> <li>The Service Worker takes that data — perhaps packaging it with other instructions — and uses <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsupdatebyinstanceid"><code>widgets.updateByInstanceId()</code></a> (or <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsupdatebytag"><code>widgets.updateByTag()</code></a>) to update the specific widgets that make use of that data.</li> </ol>
<p>To show a more complicated example, consider what should happen if certain Widgets depend on authentication and the user happens to log out in the PWA or a browser tab. The developers would need to track this and ensure the Service Worker is notified so it can replace any auth-requiring Widgets with a prompt back into the app to log in.</p>
<p>Here’s how that might work:</p>
<figure><a data-target="animated-image.originalLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/logout.gif"><img alt="" data-target="animated-image.originalImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/logout.gif"/></a></figure>
<p> <a data-target="animated-image.replacedLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/logout.gif"> <figure><img alt="logout.gif" data-target="animated-image.replacedImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/logout.gif"/></figure> </a> </p>
<p>This video shows:</p>
<ol> <li>The user logging out from the context of a <code>Client</code>. When that happens, the <code>Client</code>, sends a <code>postMessage()</code> to the Service Worker, alerting it to the state change in the app.</li> <li>The Service Worker maintains a list of active Widgets and is aware of which ones require authentication (informed by the <code>auth</code> property of the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#defining-a-widget"><code>WidgetDefinition</code></a>). Knowing auth has been revoked, the Service Worker pushes a new template to each auth-requiring Widget with a notice and a button to prompt the user to log in again.</li> </ol>
<p>The next step in this flow is for the user to log back in. They could do that directly in the Client, but let’s use the <code>WidgetAction</code> provided in the previous step:</p>
<figure><a data-target="animated-image.originalLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/login.gif"><img alt="" data-target="animated-image.originalImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/login.gif"/></a></figure>
<p> <a data-target="animated-image.replacedLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/login.gif"> <figure><img alt="login.gif" data-target="animated-image.replacedImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/login.gif"/></figure> </a> </p>
<p>This video shows:</p>
<ol> <li>The user clicking the "Login" action in the Widget. This triggers a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-related-events"><code>WidgetEvent</code></a> named "login".</li> <li>The Service Worker is listening for that action and redirects the user to the login page of the app, either within an existing <code>Client</code> (or in a new <code>Client</code> if one is not open).</li> <li>The user logs in and the app sends a <code>postMessage()</code> to the Service Worker letting it know the user is authenticated again.</li> <li>The Service Worker grabs new data for its auth-related widgets from the network.</li> <li>The Service Worker pipes that data back into the auth-requiring Widgets using <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsupdatebyinstanceid"><code>widgets.updateByInstanceId()</code></a> (or <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsupdatebytag"><code>widgets.updateByTag()</code></a>).</li> </ol>
<p>You can see more examples in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#Widget-related-Events">the <code>WidgetEvent</code> section</a>.</p>
<h2>Defining a Widget</h2>
<p>One or more Widgets are defined within the <code>widgets</code> member of a Web App Manifest. The <code>widgets</code> member would be an array of <code>WidgetDefinition</code> objects.</p>
<h3>Sample <code>WidgetDefinition</code> Object</h3>
<pre>{
  "name": "Agenda",
  "description": "Your day, at a glance",
  "tag": "agenda",
  "template": "agenda",
  "data": "/widgets/data/agenda.ical",
  "type": "text/calendar",
  "auth": true,
  "multiple": false,
  "update": 900,
  "actions": [ ],
  "settings": [ ],
  "icons": [ ],
  "screenshots": [ ],
  "backgrounds": [ ]
}</pre>
<h3>Required properties</h3>
<ul> <li><code>name</code> - <code>DOMString</code>. Serves as the title of the Widget that should be presented to users.</li> <li><code>tag</code> - <code>DOMString</code>. Serves as a way to reference the widget within the Service Worker as a <code>WidgetClient</code> and is analogous to a <a href="https://notifications.spec.whatwg.org/#tag">Notification <code>tag</code></a>. <code>WidgetClient</code> still needs to be defined, but would be similar to <a href="https://www.w3.org/TR/service-workers/#ref-for-dfn-window-client"><code>WindowClient</code></a>.</li> <li><code>template</code> - the template the developer would like the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> to use; if unsupported, the host may offer an analogous widget experience (determined using the <code>type</code> value) or the widget would not be offered.</li> <li><code>data</code> - the <code>URL</code> where the data for the widget can be found; if the format is unsupported, the widget would not be offered.</li> <li><code>type</code> - the MIME type of the data feed for the widget; if unsupported, the widget would not be offered.</li> </ul>
<h3>Optional business logic properties</h3>
<ul> <li><code>auth</code> - Boolean. Informational. Whether or not the Widget requires auth. False if not included.</li> <li><code>multiple</code> - Boolean. Whether or not the multiple instances of this widget are allowed, on a per widget host basis. False if not included.</li> <li><code>update</code> - Unsigned Integer. Informational. The frequency (in seconds) a developer wishes for the widget to be updated; for use in registering a Periodic Sync. The actual update schedule will use the Service Worker’s Periodic Sync infrastructure.</li> <li><code>actions</code> - An array of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#Defining-a-WidgetAction"><code>WidgetAction</code> objects</a> that will be exposed to users (if the template supports them) within an action-supporting template and trigger an event within the origin’s Service Worker.</li> <li><code>settings</code> - A array of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#Defining-a-WidgetSettingDefinition"><code>WidgetSettingDefinition</code> objects</a> that enable multiple instances of the same widget to be configured differently within a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> (e.g., a weather widget that displays a single locale could be installed multiple times, targeting different cities).</li> </ul>
<h3>Optional Display-related properties</h3>
<ul> <li><code>short_name</code> - <code>DOMString</code>. An alternative short version of the <code>name</code>.</li> <li><code>description</code> - <code>DOMString</code>. A description of what the widget does or its purpose.</li> <li><code>icons</code> - an array of alternative icons to use in the context of this Widget; if undefined, the Widget icon will be the chosen icon from <a href="https://w3c.github.io/manifest/#icons-member">the Manifest’s <code>icons</code> array</a>.</li> <li><code>backgrounds</code> - an array of alternative background images (as <a href="https://www.w3.org/TR/image-resource/"><code>ImageResource</code> objects</a>) that could be used in the template (if the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> and template support background images).</li> </ul>
<p>A Manifest’s <a href="https://w3c.github.io/manifest/#theme_color-member"><code>theme_color</code></a> and <a href="https://w3c.github.io/manifest/#background_color-member"><code>background_color</code></a>, if defined, may also be provided alongside this data.</p>
<h3>Promotional properties</h3>
<ul> <li><code>screenshots</code> - <code>Array</code>. Analogous to <a href="https://w3c.github.io/manifest-app-info/#screenshots-member">the <code>screenshots</code> member of the Manifest</a>. It is an array of <a href="https://www.w3.org/TR/image-resource/#dom-imageresource"><code>ImageResource</code> objects</a> with optional <a href="https://w3c.github.io/manifest-app-info/#platform-member"><code>platform</code></a> values that can associate the screenshot with how it shows up in a specific <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a>. Developers should be sure to include a <a href="https://w3c.github.io/manifest-app-info/#label-member"><code>label</code></a> value in each <a href="https://www.w3.org/TR/image-resource/#dom-imageresource"><code>ImageResource</code> object</a> for accessibility.</li> </ul>
<h3>Extensibility</h3>
<p>Some widget platforms may wish to allow developers to further refine a Widget’s appearance and/or functionality within their system. We recommend that those platforms use <a href="https://www.w3.org/TR/appmanifest/#extensibility">the extensibility of the Manifest</a> to allow developers to encode their widgets with this additional information, if they so choose.</p>
<p>For example, if using something like <a href="https://docs.microsoft.com/en-us/adaptive-cards/templating/">Adaptive Cards</a> for rendering, a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> might consider adding something like the following to the <code>WidgetDefinition</code>:</p>
<pre>"ms_ac_template": "/widgets/templates/agenda.ac.json",</pre>
<p>This could be used to override the <code>template</code> value in scenarios where the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> supports this feature.</p>
<h2>Defining a <code>WidgetAction</code></h2>
<p>A <code>WidgetAction</code> uses the same structure as a <a href="https://notifications.spec.whatwg.org/#dictdef-notificationaction">Notification Action</a>:</p>
<pre>{
  "action": "create-event",
  "title": "New Event",
  "icons": [ ]
}</pre>
<p>The <code>action</code> and <code>title</code> properties are required. The <code>icons</code> array is optional but the icon may be used in space-limited presentations with the <code>title</code> providing its <a href="https://w3c.github.io/aria/#dfn-accessible-name">accessible name</a>.</p>
<p>When activated, a <code>WidgetAction</code> will dispatch a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-related-events"><code>WidgetEvent</code></a> (modeled on <a href="https://notifications.spec.whatwg.org/#example-50e7c86c"><code>NotificationEvent</code></a>) within its Service Worker. Within the Service Worker, the event will contain a payload that includes a reference to the Widget itself and the <code>action</code> value.</p>
<h2>Defining a <code>WidgetSettingDefinition</code></h2>
<p>A <code>WidgetSettingDefinition</code> defines a single field for use in a widget’s setting panel.</p>
<pre>{
  "label": "Where do you want to display weather for?",
  "name": "locale",
  "description": "Just start typing and we’ll give you some options",
  "type": "autocomplete",
  "options": "/path/to/options.json?q={{ value }}",
  "default": "Seattle, WA USA"
}</pre>
<p>Breaking this down:</p>
<ul> <li><code>label</code> is the visible text shown to the end user and acts as the accessible label for the field.</li> <li><code>name</code> is the internal variable name used for the field (and is the key that will be sent back to the PWA).</li> <li><code>description</code> is the <em>optional</em> accessible description for a field, used to provide additional details/context.</li> <li><code>type</code> is the field type that should be used. Support for the following field types are recommended: <ul> <li>Basic text field types: "text" || "email" || "password" || "number"</li> <li>One of many selection (requires <code>options</code>): "boolean" || "radio" || "select"</li> <li>Many of many selection (requires <code>options</code>): "checkbox"</li> <li>Temporal: "date" || "datetime"</li> <li>Auto-complete (requires <code>options</code>): "autocomplete"</li> </ul> </li> <li><code>options</code> is used for specific field <code>type</code>s noted above. It can be either an array of options for the field or a URL string referencing an endpoint expected to return an array of values. If the list is dynamic (as in the case of an "autocomplete" field), the URL endpoint may be passed the current <code>value</code> of the field via the reference "{{ value }}".</li> <li><code>default</code> is the <em>optional</em> default value for the setting.</li> </ul>
<h2>Registering Available Widgets</h2>
<p>In order for <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Hosts</a> to be aware of what widgets are available for install, the available widgets must be added to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-registry">Widget Registry</a> in some way. That registration should include the following details from the Web App Manifest and the Widget itself:</p>
<ul> <li>manifest["name"]</li> <li>manifest["short_name"] (optionally)</li> <li>manifest["icons"] (optionally)</li> <li>manifest["lang"]</li> <li>manifest["dir"]</li> <li>manifest["theme_color"] (optionally)</li> <li>manifest["background_color"] (optionally)</li> <li>widget["name"]</li> <li>widget["short_name"] (optionally)</li> <li>widget["icons"] (optionally)</li> <li>widget["screenshots"] (optionally)</li> </ul>
<p>The steps for <b>parsing widgets from a Web App Manifest</b> with Web App Manifest manifest:</p>
<ol> <li>Let widgets be a new list.</li> <li>Let collected_tags be a new list.</li> <li>Run the following steps in parallel: <ol> <li>For each manifest_widget in manifest["widgets"]: <ol> <li>If manifest_widget["tag"] exists in collected_tags, continue.</li> <li>Let widget be a new object.</li> <li>Set widget["definition"] to the value of manifest_widget.</li> <li>Set widget["instances"] to an empty array.</li> <li>Set widget["installable"] to the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#determining-installability">determining widget installability</a> with manifest_widget, manifest, and Widget Host.</li> <li>If widget["installable"] is true <ol> <li>Run the steps necessary to register manifest_widget with the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-registry">Widget Registry</a>, with any useful manifest members.</li> </ol> </li> <li>Add manifest_widget["tag"] to collected_tags.</li> <li>Add widget to widgets.</li> </ol> </li> </ol> </li> <li>Store a copy of widgets for use with the Service Worker API.</li> </ol>
<p>The steps for <b>determining install-ability</b> with <code>WidgetDefinition</code> widget, Web App Manifest manifest, and Widget Host host are as follows:</p>
<ol> <li>If host requires any of the above members and they are omitted, classify the Widget as uninstallable and exit.</li> <li>If widget["template"] and widget["data"] are omitted, classify the Widget as uninstallable and exit.</li> <li>If widget["template"] is not an acceptable template generic name according to host, classify the Widget as uninstallable and exit.</li> <li>If widget["type"] is not an acceptable MIME type for widget["data"] according to host, classify the Widget as uninstallable and exit.</li> <li>If host has additional requirements that are not met by widget (e.g., required <code>WidgetDefinition</code> extensions), classify the Widget as uninstallable and exit.</li> <li>Classify the widget as installable.</li> </ol>
<h2>Service Worker APIs</h2>
<p>This proposal introduces a <code>widgets</code> attribute to the <a href="https://www.w3.org/TR/service-workers/#serviceworkerglobalscope-interface"><code>ServiceWorkerGlobalScope</code></a>. This attribute references the <code>Widgets</code> interface (which is analogous to <code>Clients</code>) that exposes the following Promise-based methods:</p>
<ul> <li><code>getByTag()</code> - Requires an tag that matches a Widget’s <code>tag</code>. Returns a Promise that resolves to a <code>Widget</code> or <em>undefined</em>.</li> <li><code>getByInstanceId()</code> - Requires an instance id that is used to find the associated <code>Widget</code>. Returns a Promise that resolves to a <code>Widget</code> or <em>undefined</em>.</li> <li><code>getByHostId()</code> - Requires an host_id that matches a Widget’s <code>host</code>. Returns a Promise that resolves to an array of zero or more <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widget-object"><code>Widget</code> objects</a>.</li> <li><code>matchAll()</code> - Requires <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#Options-for-Matching">an <code>options</code> argument</a>. Returns a Promise that resolves to an array of zero or more <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widget-object"><code>Widget</code> objects</a> that match the <code>options</code> criteria.</li> <li><code>updateByInstanceId()</code> - Requires an instance <code>id</code> and a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widgetpayload-object">payload Object</a>. Returns a Promise that resolves to <em>undefined</em> or Error.</li> <li><code>removeByInstanceId()</code> - Requires an instance <code>id</code>. Returns a Promise that resolves to <em>undefined</em> or Error.</li> <li><code>updateByTag()</code> - Requires an tag and a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widgetpayload-object">payload Object</a>. Returns a Promise that resolves to <em>undefined</em> or Error.</li> <li><code>removeByTag()</code> - Requires an tag. Returns a Promise that resolves to <em>undefined</em> or Error.</li> </ul>
<p>Each Widget defined in the Web App Manifest is represented within the <code>Widgets</code> interface. <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widget-object">A <code>Widget</code> Object</a> is used to represent each defined widget and any associated <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widgetinstance-object">Widget Instances are exposed within that object</a>.</p>
<h3>The <code>Widget</code> Object</h3>
<p>Each Widget is represented within the <code>Widgets</code> interface as a <code>Widget</code>. Each Widget’s representation includes the original <code>WidgetDefinition</code> (as <code>definition</code>), but is mainly focused on providing details on the Widget’s current state and enables easier interaction with its <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instances</a>:</p>
<pre>{
  "installable": true,
  "definition": { },
  "instances": [ ]
}</pre>
<p>All properties are Read Only to developers and are updated by the User Agent as appropriate.</p>
<ul> <li><code>installable</code> - Boolean. Indicates whether the Widget is installable (based on UA logic around regarding data <code>type</code>, chosen <code>template</code>, etc.).</li> <li><code>definition</code> - Object. The original, as-authored, <code>WidgetDefinition</code> provided in the Manifest. Includes any <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#Extensibility">proprietary extensions</a>).</li> <li><code>instances</code> - Array. A collection of <code>WidgetInstance</code> objects representing the current state of each instance of a Widget (from the perspective of the Service Worker). Empty if the widget has not been <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-install">installed</a>.</li> </ul>
<h3>The <code>WidgetInstance</code> Object</h3>
<pre>{ 
  "id": {{ GUID }},
  "host": {{ GUID }},
  "settings": { },
  "updated": {{ Date() }},
  "payload": { }
}</pre>
<p>All properties are Read Only to developers and are updated by the implementation as appropriate.</p>
<ul> <li><code>id</code> - String. The internal GUID used to reference the <code>WidgetInstance</code> (typically provided by the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a>).</li> <li><code>host</code> - String. Internal pointer to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> that has installed this <code>WidgetInstance</code>.</li> <li><code>settings</code> - Object. If the Widget has <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-settings">settings</a>, the key/values pairs set for this <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">instance</a> are enumerated here.</li> <li><code>updated</code> - Date. Timestamp for the last time data was sent to the <code>WidgetInstance</code>.</li> <li><code>payload</code> - Object. The last payload sent to this <code>WidgetInstance</code>.</li> </ul>
<p>The steps for <b>creating a <code>WidgetInstance</code></b> with id, host, and payload are as follows:</p>
<ol> <li>Let instance be a new Object.</li> <li>If id is not a String or host is not a String or payload is not a <code>WidgetPayload</code>, throw an Error.</li> <li>Set instance["id"] to id.</li> <li>Set instance["host"] to host.</li> <li>Set instance["settings"] to payload["settings"].</li> <li>Set instance["payload"] to payload.</li> <li>Set instance["updated"] to the current timestamp.</li> <li>Return instance.</li> </ol>
<p>The steps for <b>creating a default <code>WidgetSettings</code> object</b> with <code>Widget</code> widget are as follows:</p>
<ol> <li>Let settings be a new Object.</li> <li>For each setting in wiget["definition"]["settings"] <ol> <li>If setting["default"] is not null: <ol> <li>Set settings[setting["name"]] to setting["default"].</li> </ol> </li> <li>Else: <ol> <li>Set settings[setting["name"]] to an empty string.</li> </ol> </li> </ol> </li> <li>Return settings.</li> </ol>
<h3>Finding Widgets</h3>
<p>There are four main ways to look up information about a Widget: by <code>tag</code>, by instance <code>id</code>, by Widget Host, and <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsmatchall">by characteristics</a>.</p>
<h4><code>widgets.getByTag()</code></h4>
<p>The <code>getByTag</code> method is used to look up a specific <code>Widget</code> based on its <code>tag</code>.</p>
<ul> <li><strong>Argument:</strong> tag (String)</li> <li><strong>Returns:</strong> <code>Widget</code> or <em>undefined</em></li> </ul>
<p><code>getByTag( tag )</code> must run these steps:</p>
<ol> <li>If the argument tag is omitted, return a Promise rejected with a TypeError.</li> <li>If the argument tag is not a String, return a Promise rejected with a TypeError.</li> <li>Let promise be a new Promise.</li> <li>Let options be an new Object.</li> <li>Set options["tag"] be the value of tag.</li> <li>Run these substeps in parallel: <ol> <li>Let search be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsmatchall">matchAll(options)</a> with options.</li> <li>Wait until search settles.</li> <li>If search rejects with an exception, then: <ol> <li>Reject promise with that exception.</li> </ol> </li> <li>Else if search resolves with an array, matches, then: <ol> <li>If matches is an empty array, then: <ol> <li>Resolve promise with <em>undefined</em>.</li> </ol> </li> <li>Else: <ol> <li>Resolve promise with the first element of matches.</li> </ol> </li> </ol> </li> </ol> </li> <li>Return promise.</li> </ol>
<h4><code>widgets.getByInstanceId()</code></h4>
<p>The <code>getByInstanceId</code> method is used to look up a specific <code>Widget</code> based on the existence of a <code>WidgetInstance</code> object whose <code>id</code> matches id.</p>
<ul> <li><strong>Argument:</strong> id (String)</li> <li><strong>Returns:</strong> <code>Widget</code> or <em>undefined</em></li> </ul>
<p><code>getByInstanceId( id )</code> must run these steps:</p>
<ol> <li>If the argument id is omitted, return a Promise rejected with a TypeError.</li> <li>If the argument id is not a String, return a Promise rejected with a TypeError.</li> <li>Let promise be a new Promise.</li> <li>Let options be an new Object.</li> <li>Set options["id"] be the value of id.</li> <li>Run these substeps in parallel: <ol> <li>Let search be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsmatchall">matchAll(options)</a> with options.</li> <li>Wait until search settles.</li> <li>If search rejects with an exception, then: <ol> <li>Reject promise with that exception.</li> </ol> </li> <li>Else if search resolves with an array, matches, then: <ol> <li>If matches is an empty array, then: <ol> <li>Resolve promise with <em>undefined</em>.</li> </ol> </li> <li>Else: <ol> <li>Resolve promise with the first element of matches.</li> </ol> </li> </ol> </li> </ol> </li> <li>Return promise.</li> </ol>
<h4><code>widgets.getByHostId()</code></h4>
<p>The <code>getByHostId</code> method is used to look up all <code>Widget</code>s that have a <code>WidgetInstance</code> whose <code>host</code> matches id.</p>
<ul> <li><strong>Argument:</strong> id (String)</li> <li><strong>Returns:</strong> Array of zero or more <code>Widget</code> objects</li> </ul>
<p><code>getByHostId( id )</code> must run these steps:</p>
<ol> <li>If the argument id is omitted, return a Promise rejected with a TypeError.</li> <li>If the argument id is not a String, return a Promise rejected with a TypeError.</li> <li>Let promise be a new Promise.</li> <li>Let options be an new Object.</li> <li>Set options["host"] be the value of id.</li> <li>Run these substeps in parallel: <ol> <li>Let search be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsmatchall">matchAll(options)</a> with options.</li> <li>Wait until search settles.</li> <li>If search rejects with an exception, then reject promise with that exception.</li> <li>Let matches be the resolution of search.</li> <li>Resolve promise with matches.</li> </ol> </li> <li>Return promise.</li> </ol>
<h4><code>widgets.matchAll()</code></h4>
<p>The <code>matchAll</code> method is used to find up one or more <code>Widget</code>s based on options criteria. The <code>matchAll</code> method is analogous to <code>clients.matchAll()</code>. It allows developers to limit the scope of matches based on any of the following:</p>
<ul> <li> <p><code>tag: "tag_name"</code> - Only matches a Widget whose <code>tag</code> matches <code>tag</code> value.</p> </li> <li> <p><code>instance: "id"</code> - Only matches a Widget that has a Widget Instance whose <code>id</code> matches the <code>instance</code> value.</p> </li> <li> <p><code>host: "id"</code> - Only matches Widgets that have a Widget Instance whose <code>host</code> matches the <code>host</code> value.</p> </li> <li> <p><code>installable: true</code> - Only matches Widgets supported by a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> on this device.</p> </li> <li> <p><code>installed: true</code> - Only matches Widgets that are currently installed on this device (determined by looking for 1+ members of each Widget’s <code>instances</code> array).</p> </li> <li> <p><strong>Argument:</strong> options (Object)</p> </li> <li> <p><strong>Returns:</strong> Array of zero or more <code>Widget</code> objects</p> </li> </ul>
<p><code>matchAll( options )</code> method must run these steps:</p>
<ol> <li>Let promise be a new Promise.</li> <li>Run the following steps in parallel: <ol> <li>Let matchedWidgets be a new list.</li> <li>For each service worker <code>Widget</code> widget: <ol> <li>If options["installable"] is defined and its value does not match widget["installable"], continue.</li> <li>If options["installed"] is defined: <ol> <li>Let instanceCount be the number of items in widget["instances"].</li> <li>If options["installed"] is <code>true</code> and instanceCount is 0, continue.</li> <li>If options["installed"] is <code>false</code> and instanceCount is greater than 0, continue.</li> </ol> </li> <li>If options["tag"] is defined and its value does not match widget["tag"], continue.</li> <li>Let matchingInstance be null.</li> <li>For each instance in widget["instances"]: <ol> <li>If options["instance"] is defined: <ol> <li>If instance["id"] is equal to options["instance"] <ol> <li>Set matchingInstance to instance and exit the loop.</li> </ol> </li> </ol> </li> <li>If options["host"] is defined: <ol> <li>If instance["host"] is equal to options["host"] <ol> <li>Set matchingInstance to instance and exit the loop.</li> </ol> </li> </ol> </li> <li>If matchingInstance is null, continue.</li> </ol> </li> <li>If matchingInstance is null, continue.</li> <li>Add widget to matchedWidgets.</li> </ol> </li> <li>Resolve promise with a new frozen array of matchedWidgets.</li> </ol> </li> <li>Return promise.</li> </ol>
<h3>Working with Widgets</h3>
<p>The <code>Widgets</code> interface enables developers to work with individual widget instances or all instances of a widget.</p>
<h4>The <code>WidgetPayload</code> Object</h4>
<p>In order to create or update a widget instance, the Service Worker must send the data necessary to render that widget. This data is called a payload and includes both template- and content-related data. The members of a <code>WidgetPayload</code> are:</p>
<ul> <li><code>template</code> - String. A named template to use for the Widget. Note: this value may be overridden by the User Agent, depending on the target <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a>.</li> <li><code>data</code> - String. The data to flow into the Widget template. If a developer wants to route JSON data into the Widget, they will need to <code>stringify()</code> it first.</li> <li><code>settings</code> - Object. The settings for the widget instance (if any).</li> </ul>
<p>The payload ultimately delivered to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a> will vary. In some cases it may need to include one or more members of the <code>WidgetDefinition</code> or even members of the Web App Manifest itself (e.g., <code>theme_color</code>).</p>
<p>The <code>template</code> value ultimately sent to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a> may also vary by implementation. It is also open to augmentation by the user agent. If, for example, the service supports a custom template (e.g., <code>ms_ac_template</code>), the User Agent may replace the template string with the value of that template, derived according to its own logic.</p>
<h4>Widget Errors</h4>
<p>Some APIs may return an Error when the widget cannot be created, updated, or removed. These Errors should have descriptive strings like:</p>
<ul> <li>"Widget Host not found"</li> <li>"Widget template not supported"</li> <li>"Widget instance not found"</li> <li>"Data required by the template was not supplied."</li> </ul>
<h4><code>widgets.updateByInstanceId()</code></h4>
<p>Developers will use <code>updateByInstanceId()</code> to push data to a new or existing <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instance</a>. This method will resolve with <em>undefined</em> if successful, but should throw <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-errors">a descriptive Error</a> if one is encountered.</p>
<ul> <li><strong>Arguments:</strong> instanceId (String) and payload (<a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-payload"><code>WidgetPayload</code> Object</a>)</li> <li><strong>Returns:</strong> <em>undefined</em></li> </ul>
<p><code>updateByInstanceId( instanceId, payload )</code> method must run these steps:</p>
<ol> <li>Let promise be a new promise.</li> <li>If instanceId is null or not a String or payload is null or not an Object or this’s active worker is null, then reject promise with a TypeError and return promise.</li> <li>Let widget be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsgetbyinstanceid">getByInstanceId(instanceId)</a> with instanceId.</li> <li>Let widgetInstance be null.</li> <li>For i in widget["instances"]: <ol> <li>If i["id"] is equal to instanceId <ol> <li>Set widgetInstance to i and exit the loop.</li> </ol> </li> <li>Else continue.</li> </ol> </li> <li>If widgetInstance is null, reject promise with an Error and return promise.</li> <li>Let hostId be widgetInstance["host"].</li> <li>If widgetInstance["settings"] is null or not an Object <ol> <li>Set payload["settings"] to the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#creating-a-default-widgetsettings-object">creating a default <code>WidgetSettings</code> object</a> with widget.</li> </ol> </li> <li>Else <ol> <li>Set payload["settings"] to widgetInstance["settings"].</li> </ol> </li> <li>Set payload to the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#injecting-manifest-members-into-a-payload">injecting manifest members into a <code>WidgetPayload</code></a> with payload.</li> <li>Let operation be the result of updating the widget instance on the device (e.g., by calling the appropriate <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a> API) with instanceId and payload. <ol> <li>If operation is an Error <ol> <li>Reject promise with operation and return promise.</li> </ol> </li> <li>Else <ol> <li>Let instance be the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#creating-a-widget-instance">creating an instance</a> with instanceId, hostId, payload.</li> <li>Set widgetInstance to instance.</li> <li>Resolve promise.</li> </ol> </li> </ol> </li> <li>Return promise.</li> </ol>
<h4><code>widgets.updateByTag()</code></h4>
<p>Developers will use <code>updateByTag()</code> to push data to all <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Instances</a> of a Widget. This method will resolve with <em>undefined</em> if successful, but should throw <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-errors">a descriptive Error</a> if one is encountered.</p>
<ul> <li><strong>Arguments:</strong> tag (String) and payload (<a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-payload"><code>WidgetPayload</code> Object</a>)</li> <li><strong>Returns:</strong> <em>undefined</em></li> </ul>
<p><code>updateByTag( tag, payload )</code> method must run these steps:</p>
<ol> <li>Let promise be a new promise.</li> <li>If tag is null or not a String or payload is not a <code>WidgetPayload</code> or this’s active worker is null, then reject promise with a TypeError and return promise.</li> <li>Let widget be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsgetbytag">getByTag(tag)</a> with tag.</li> <li>Set payload["settings"] to the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/creating-a-default-widgetsettings-object">creating a default <code>WidgetSettings</code> object</a> with widget.</li> <li>Set payload to the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#injecting-manifest-members-into-a-payload">injecting manifest members into a <code>WidgetPayload</code></a> with payload.</li> <li>Let instanceCount be the length of widget["instances"].</li> <li>Let instancesUpdated be 0.</li> <li>For each widgetInstance in widget["instances"]</li> <li>Run the following steps in parallel: <ol> <li>Let operation be the result of updating the widget instance on the device (e.g., by calling the appropriate <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a> API) with widgetInstance["id"] and payload.</li> <li>If operation is an Error <ol> <li>Reject promise with operation and return promise.</li> </ol> </li> <li>Else <ol> <li>Let instance be the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#creating-a-widget-instance">creating an instance</a> with widgetInstance["id"], widgetInstance["host"], and payload.</li> <li>Set widgetInstance to instance.</li> <li>Increment instancesUpdated.</li> </ol> </li> </ol> </li> <li>If instancesUpdated is not equal to instanceCount, then reject promise with an Error and return promise.</li> <li>Resolve and return promise.</li> </ol>
<h4><code>widgets.removeByInstanceId()</code></h4>
<p>Developers will use <code>removeByInstanceId()</code> to remove an existing Widget Instance from its Host. This method will resolve with <em>undefined</em> if successful, but should throw <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-errors">a descriptive Error</a> if one is encountered.</p>
<ul> <li><strong>Arguments:</strong> instanceId (String)</li> <li><strong>Returns:</strong> <em>undefined</em></li> </ul>
<p><code>removeByInstanceId( instanceId )</code> method must run these steps:</p>
<ol> <li>Let promise be a new promise.</li> <li>If instanceId is null or not a String or this’s active worker is null, then reject promise with a TypeError and return promise.</li> <li>Let operation be the result of removing the widget instance on the device (e.g., by calling the appropriate <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a> API) with instanceId.</li> <li>If operation is an Error <ol> <li>Reject promise with operation and return promise.</li> </ol> </li> <li>Else <ol> <li>Let removed be false.</li> <li>Let widget be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsgetbyinstanceid">getByInstanceId(instanceId)</a> with instanceId.</li> <li>For each instance in widget["instances"] <ol> <li>If instance["id"] is equal to instanceId <ol> <li>Remove instance from widget["instances"]</li> <li>Set removed to true.</li> <li>Exit the loop.</li> </ol> </li> <li>Else <ol> <li>Continue.</li> </ol> </li> </ol> </li> <li>If removed is false, then reject promise with an Error and return promise.</li> </ol> </li> <li>Resolve and return promise.</li> </ol>
<h4><code>widgets.removeByTag()</code></h4>
<p>Developers will use <code>removeByTag()</code> to remove all Instances of a Widget. This method will resolve with <em>undefined</em> if successful, but should throw <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widget-errors">a descriptive Error</a> if one is encountered.</p>
<ul> <li><strong>Arguments:</strong> tag (String)</li> <li><strong>Returns:</strong> <em>undefined</em></li> </ul>
<p><code>removeByTag( tag )</code> method must run these steps:</p>
<ol> <li>Let promise be a new promise.</li> <li>If tag is null or not a String or this’s active worker is null, then reject promise with a TypeError and return promise.</li> <li>Let widget be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsgetbytag">getByTag(tag)</a> with tag.</li> <li>Let instanceCount be the length of widget["instances"].</li> <li>Let instancesRemoved be 0.</li> <li>For each instance in widget["instances"]</li> <li>Run the following steps in parallel: <ol> <li>Let operation be the result of removing the widget instance on the device (e.g., by calling the appropriate <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a> API) with instance["id"]. <ol> <li>If operation is an Error <ol> <li>Reject promise with operation and return promise.</li> </ol> </li> <li>Else <ol> <li>Remove instance from widget["instances"]</li> <li>Increment instancesRemoved.</li> </ol> </li> </ol> </li> </ol> </li> <li>If instancesRemoved is not equal to instanceCount, then reject promise with an Error and return promise.</li> <li>Resolve and return promise.</li> </ol>
<h2>Widget-related Events</h2>
<p>There are a host of different events that will take place in the context of a Service Worker.</p>
<h3>WidgetEvent</h3>
<p>The <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetevent"><code>WidgetEvent</code></a> is a generic event for widgets with the below types.</p>
<ul> <li>"widgetinstall" - Executed when a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> is requesting installation of a widget.</li> <li>"widgetuninstall" - Executed when a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> is requesting un-installation of a widget.</li> <li>"widgetsave" - Executed when a Widget has settings and the user saves the settings for a specific <code>WidgetInstance</code>.</li> <li>"widgetresume" - Executed when a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> is switching from its inactive to active state.</li> </ul>
<p>A <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetevent"><code>WidgetEvent</code></a> is an object with the following properties:</p>
<ul> <li><code>widget</code> - Required for widget-specific events. This is a reference to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widget-object"><code>Widget</code></a> (if any) associated with the event</li> <li><code>instanceId</code> - Required for widget-specific events. This is the GUID for the specific <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instance</a> (if any) associated with the event.</li> <li><code>hostId</code> - Required for host-specific events. This is the GUID for the specific <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> (if any) associated with the event.</li> </ul>
<h4>A Sample <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetevent"><code>WidgetEvent</code></a> Object</h4>
<pre>{
  "widget": { },
  "instanceId": "{{ GUID }}"
}</pre>
<p>Here’s how the actual <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetevent"><code>WidgetEvent</code></a> could be handled:</p>
<pre>self.addEventListener('widgetinstall', (event) =&gt; {
  console.log("installing", event.widget, event.instance_id);
  event.waitUntil(
    createInstance( instance_id, widget )
  );

});</pre>
<p>The <b>steps for creating a WidgetEvent</b> with Widget Service Message message are as follows:</p>
<ol> <li>Let event be a new <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetevent"><code>WidgetEvent</code></a> (inherits ExtendableEvent).</li> <li>Run the following steps in parallel: <ol> <li>Set event["data"] to a new object.</li> <li>If message is a request to refresh all widgets <ol> <li>Set type to "widgetresume".</li> <li>Set event["hostId"] to the id of the Widget Host bound to message.</li> <li>Return event.</li> </ol> </li> <li>Else if message is a request to install a widget, set type to "widgetinstall".</li> <li>Else if message is a request to uninstall a widget, set type to "widgetuninstall".</li> <li>Else if message is a request to update a widget’s settings, set type to "widgetsave".</li> <li>Let instanceId be the id of the Widget Instance bound to message.</li> <li>Set event["instanceId"] to instanceId.</li> <li>Let widget be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsgetbyinstanceid">getByInstanceId(instanceId)</a> with instanceId.</li> <li>Set event["widget"] to widget.</li> </ol> </li> <li>Return event</li> </ol>
<h3>widgetinstall</h3>
<p>When the User Agent receives a request to create a new instance of a widget, it will need to create a placeholder for the instance before triggering the WidgetClick event within the Service Worker.</p>
<p>Required <code>WidgetEvent</code> data:</p>
<ul> <li><code>instanceId</code></li> <li><code>widget</code></li> </ul>
<p>The <b>steps for creating a placeholder instance</b> with <code>WidgetClickEvent</code> event:</p>
<ol> <li>Let widget be event["widget"].</li> <li>If widget is undefined, exit.</li> <li>Let payload be an object.</li> <li>Set payload["settings"] to the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#creating-a-default-widgetsettings-object">creating a default <code>WidgetSettings</code> object</a> with widget.</li> <li>Let instance be the result of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#creating-a-widget-instance">creating an instance</a> with event["instanceId"], event["hostId"], and payload.</li> <li>Append instance to widget["instances"].</li> </ol>
<p>Here is the flow for install:</p>
<figure><a data-target="animated-image.originalLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/install.gif"><img alt="" data-target="animated-image.originalImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/install.gif"/></a></figure>
<p> <a data-target="animated-image.replacedLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/install.gif"> <figure><img alt="install.gif" data-target="animated-image.replacedImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/install.gif"/></figure> </a> </p>
<ol> <li>A "widgetinstall" signal is received by the User Agent, <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#creating-a-placeholder-instance">the placeholder instance is created</a>, and the event is passed along to the Service Worker.</li> <li>The Service Worker makes a <code>Request</code> for the <code>widget.definition.data</code> endpoint.</li> <li>The Service Worker then creates a <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widgetpayload-object">payload</a> and passes that along to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a> via the <code>updateByInstanceId()</code> method.</li> </ol>
<h3>widgetuninstall</h3>
<p>Required <code>WidgetEvent</code> data:</p>
<ul> <li><code>instanceId</code></li> <li><code>widget</code></li> </ul>
<p>The "uninstall" process is similar:</p>
<figure><a data-target="animated-image.originalLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/uninstall.gif"><img alt="" data-target="animated-image.originalImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/uninstall.gif"/></a></figure>
<p> <a data-target="animated-image.replacedLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/uninstall.gif"> <figure><img alt="uninstall.gif" data-target="animated-image.replacedImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/uninstall.gif"/></figure> </a> </p>
<ol> <li>The "widgetuninstall" signal is received by the User Agent and is passed to the Service Worker.</li> <li>The Service Worker runs any necessary cleanup steps (such as un-registering a Periodic Sync if the widget is no longer in use).</li> <li>The Service Worker calls <code>removeByInstanceId()</code> to complete the removal process.</li> </ol>
<p>Note: When a PWA is uninstalled, its widgets must also be uninstalled. In this event, the User Agent must prompt the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a> to remove all associated widgets. If the UA purges all site data and the Service Worker during this process, no further steps are necessary. However, if the UA does not purge all data, it must issue uninstall events for each Widget Instance so that the Service Worker may unregister related Periodic Syncs and perform any additional cleanup.</p>
<h3>widgetsave</h3>
<p>Required <code>WidgetEvent</code> data:</p>
<ul> <li><code>instanceId</code></li> <li><code>widget</code></li> <li><code>data</code></li> </ul>
<p>The "widgetsave" process works like this:</p>
<ol> <li>The "widgetsave" signal is received by the User Agent.</li> <li>Internally, the <code>WidgetInstance</code> matching the <code>instanceId</code> value is examined to see if a. it has settings and a. its <code>settings</code> object matches the inbound <code>data</code>.</li> <li>If it has settings and the two do not match, the new <code>data</code> is saved to <code>settings</code> in the <code>WidgetInstance</code> and the "widgetsave" event issued to the Service Worker.</li> <li>The Service Worker receives the event and can react by issuing a request for new data, based on the updated settings values.</li> </ol>
<h3>widgetresume</h3>
<p>Many <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Hosts</a> will suspend the rendering surface when it is not in use (to conserve resources). In order to ensure Widgets are refreshed when the rendering surface is presented, the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> will issue a "widgetresume" event.</p>
<p>Required <code>WidgetEvent</code> data:</p>
<ul> <li><code>hostId</code></li> </ul>
<p>Using this event, it is expected that the Service Worker will enumerate the Widget Instances associated with the <code>hostId</code> and Fetch new data for each.</p>
<figure><a data-target="animated-image.originalLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/resume.gif"><img alt="" data-target="animated-image.originalImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/resume.gif"/></a></figure>
<p> <a data-target="animated-image.replacedLink" href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/media/resume.gif"> <figure><img alt="resume.gif" data-target="animated-image.replacedImage" src="https://github.com/MicrosoftEdge/MSEdgeExplainers/raw/main/PWAWidgets/media/resume.gif"/></figure> </a> </p>
<h3>WidgetClickEvent</h3>
<p>The <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetclickevent"><code>WidgetClickEvent</code></a> is sent to the Service Worker when a user interacts (click/tap) with a Widget. The event handler of <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetclickevent"><code>WidgetClickEvent</code></a> will be capable of making <a href="https://www.w3.org/TR/service-workers/#dom-clients-openwindow"><code>clients.openWindow()</code></a> to open the PWA.</p>
<p>A <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetclickevent"><code>WidgetClickEvent</code></a> is an object with the following properties:</p>
<ul> <li><code>action</code> - Always required. This is the primary way to disambiguate events. The names of the events may be part of a standard lifecycle or app-specific, based on any <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#Defining-a-WidgetAction"><code>WidgetAction</code> that has been defined</a>.</li> <li><code>data</code> - Always required. This object comprises key/value pairs representing data sent from the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> as part of the event. This could be, for example, the settings values to be saved to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instance</a>. An empty object if no data is sent.</li> <li><code>widget</code> - Required for widget-specific events. This is a reference to the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#the-widget-object"><code>Widget</code></a> (if any) associated with the event</li> <li><code>instanceId</code> - Required for widget-specific events. This is the GUID for the specific <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instance</a> (if any) associated with the event.</li> <li><code>hostId</code> - Required for host-specific events. This is the GUID for the specific <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-host">Widget Host</a> (if any) associated with the event.</li> </ul>
<h4>A Sample <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetclickevent"><code>WidgetClickEvent</code></a> Object</h4>
<pre>{
  "action": "login",
  "widget": { },
  "instanceId": "{{ GUID }}",
  "data": { }
}</pre>
<p>You can see a basic example of this in use in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#user-login">the user login video, above</a>. There is a walk through of the interaction following that video, but here’s how the actual <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetclickevent"><code>WidgetClickEvent</code></a> could be handled:</p>
<pre>self.addEventListener('widgetclick', (event) =&gt; {

  const action = event.action;

  // If user is being prompted to login 
  if ( action == "login" ) {
    // open a new window to the login page &amp; focus it
    clients
        .openWindow( "/login?from=widget" )
        .then(windowClient =&gt; 
          windowClient ? windowClient.focus() : null
        );
  }

});</pre>
<p>The <b>steps for creating a WidgetClickEvent</b> with Widget Service Message message are as follows:</p>
<ol> <li>Let event be a new WidgetClickEvent (inherits <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetevent"><code>WidgetEvent</code></a>).</li> <li>Run the following steps in parallel: <ol> <li>Set event["data"] to a new object.</li> <li>Set event["action"] to the user action bound to message.</li> <li>Let instanceId be the id of the Widget Instance bound to message.</li> <li>Set event["instanceId"] to instanceId.</li> <li>Let widget be the result of running the algorithm specified in <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#widgetsgetbyinstanceid">getByInstanceId(instanceId)</a> with instanceId.</li> <li>Set event["widget"] to widget.</li> <li>If message includes bound data, <ol> <li>Set event["data"] to the data value bound to message.</li> </ol> </li> </ol> </li> <li>Return event</li> </ol>
<h2>Proactively Updating a Widget</h2>
<p>While the events outlined above allow developers to respond to widget interactions in real-time, developers will also likely want to update their widgets at other times. There are three primary methods for getting new data into a widget without interaction from a user or prompting via the <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-service">Widget Service</a>:</p>
<h3>Server Push</h3>
<p>Many developers are already familiar with Push Notifications as a means of notifying users of timely updates and information. Widgets offer an alternative means of informing users without interrupting them with a notification bubble.</p>
<p>In order to use the <a href="https://www.w3.org/TR/push-api/">Push API</a>, a user must grant the developer <a href="https://www.w3.org/TR/push-api/#permission">the necessary permission(s)</a>. Once granted, however, developers could send widget data as part of any Server Push, either alongside pushes intended as Notifications or ones specifically intended to direct content into a widget.</p>
<h3>Periodic Sync</h3>
<p>The <a href="https://developer.mozilla.org/docs/Web/API/Web_Periodic_Background_Synchronization_API">Periodic Sync API</a> enables developers to wake up their Service Worker to synchronize data with the server. This Service Worker-directed event could be used to gather updates for any <a href="https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/PWAWidgets/README.md/#dfn-widget-instance">Widget Instances</a>.</p>
<p>Caveats:</p>
<ol> <li>This API is currently only supported in Chromium browsers.</li> <li>Sync frequency is currently governed by site engagement metrics and is capped at 2× per day (once every 12 hours). We are investigating whether the frequency could be increased for PWAs with active widgets.</li> </ol>
<h3>Server-sent Events</h3>
<p><a href="https://html.spec.whatwg.org/multipage/server-sent-events.html">Server-sent Events</a> are similar to a web socket, but only operate in one direction: from the server to a client. The <code>EventSource</code> interface is available within worker threads (including Service Workers) and can be used to "listen" for server-sent updates.</p>
<h2>Example</h2>
<p>Here is how this could come together in a Service Worker:</p>
<pre>const periodicSync = self.registration.periodicSync;

async function registerPeriodicSync( widget )
{
  // if the widget is set up to auto-update…
  if ( "update" in widget.definition ) {
    registration.periodicSync.getTags()
      .then( tags =&gt; {
        // only one registration per tag
        if ( ! tags.includes( widget.definition.tag ) ) {
          periodicSync.register( widget.definition.tag, {
              minInterval: widget.definition.update
          });
        }
      });
  }
  return;
}

async function  unregisterPeriodicSync( widget )
{
  // clean up periodic sync?
  if ( widget.instances.length === 1 &amp;&amp;
       "update" in widget.definition )
  {
    periodicSync.unregister( widget.definition.tag );
  }
  return;
}

async function updateWidgets( host_id )
{
  const config = host_id ? { hostId: host_id }
                         : { installed: true };
  
  let queue = [];
  await widgets.matchAll( config )
    .then(async widgetList =&gt; {
      for (let i = 0; i &lt; widgetList.length; i++) {
        queue.push(updateWidget( widgetList[i] ));
      }
    });
  await Promise.all(queue);
  return;
}

async function updateWidget( widget ){
  // Widgets with settings should be updated on a per-instance level
  if ( widget.hasSettings )
  {
    let queue = [];
    widget.instances.map( async (instance) =&gt; {
      queue.push(updateInstance( instance, widget ));
    });
    await Promise.all(queue);
    return;
  }
  // other widgets can be updated en masse via their tags
  else
  {
    let opts = { headers: {} };
    if ( "type" in widget.definition )
    {
      opts.headers.accept = widget.definition.type;
    }
    await fetch( widget.definition.data, opts )
      .then( response =&gt; response.text() )
      .then( data =&gt; {
        let payload = {
          template: widget.definition.template,
          data: data
        };
        widgets.updateByTag( widget.definition.tag, payload );
      });
    return;
  }
}

async function createInstance( instance_id, widget )
{
  await updateInstance( instance_id, widget )
    .then(() =&gt; {
      registerPeriodicSync( widget );
    });
  return;
}

async function updateInstance( instance, widget )
{
  // If we only get an instance id, get the instance itself
  if ( typeof instance === "string" ) {
    let instance_id = instance;
    instance = widget.instances.find( i =&gt; i.id === instance );
    if ( instance ) {
      instance = { id: instance_id };
      widget.instances.push( instance );
    }
  }
  if ( typeof instance !== "object" )
  {
    return;
  }
  if ( !instance.settings ) {
    instance.settings = {};
  }
  let settings_data = new FormData();
  for ( let key in instance.settings ) {
    settings_data.append(key, instance.settings[key]);
  }
  let opts = {};
  if (  settings_data.length &gt; 0 )
  {
    opts = {
      method: "POST",
      body: settings_data,
      headers: {
        contentType: "multipart/form-data"
      }
    };
  }
  if ( "type" in widget.definition )
  {
    opts.headers.accept = widget.definition.type;
  }
  await fetch( widget.definition.data, opts )
    .then( response =&gt; response.text() )
    .then( data =&gt; {
      let payload = {
        template: widget.definition.template,
        data: data,
        settings: instance.settings
      };
      widgets.updateByInstanceId( instance.id, payload );
    });
  return;
}

async function removeInstance( instance_id, widget )
{
  console.log( `uninstalling ${widget.definition.name} instance ${instance_id}` );
  unregisterPeriodicSync( widget )
    .then(() =&gt; {
      widgets.removeByInstanceId( instance_id );
    });
  return;
}
  
self.addEventListener("widgetinstall", function(event) {
  const host_id = event.hostId;
  const widget = event.widget;
  const instance_id = event.instanceId;
  
  console.log("installing", widget, instance_id);
  event.waitUntil(
    createInstance( instance_id, widget )
  );
});
  
self.addEventListener("widgetuninstall", function(event) {
  const host_id = event.hostId;
  const widget = event.widget;
  const instance_id = event.instanceId;
  
  console.log("uninstalling", widget, instance_id);
  event.waitUntil(
    removeInstance( instance_id, widget )
  );
});
  
self.addEventListener("widgetresume", function(event) {
  const host_id = event.hostId;
  const widget = event.widget;
  const instance_id = event.instanceId;
  
  console.log("resuming all widgets");
  event.waitUntil(
    // refresh the data on each widget
    updateWidgets( host_id )
  );
});

self.addEventListener("widgetclick", function(event) {

  const action = event.action;
  const host_id = event.hostId;
  const widget = event.widget;
  const instance_id = event.instanceId;
  
  // Custom Actions
  switch (action) {

    case "refresh":
      console.log("Asking a widget to refresh itself");
      event.waitUntil(
        updateInstance( instance_id, widget )
      );
      break;
    case "login":
      // open a new window to the login page &amp; focus it.
      clients
        .openWindow( "/login?from=widget" )
        .then(windowClient =&gt; 
          windowClient ? windowClient.focus() : null
        );
      break;
    // other cases
  }

});

self.addEventListener("periodicsync", event =&gt; {
  const tag = event.tag;
  
  const widget = widgets.getByTag( tag );
  if ( widget &amp;&amp; "update" in widget.definition ) {
    event.waitUntil( updateWidget( widget ) );
  }

  // Other logic for different tags as needed.
});</pre>
<h2>Open Questions</h2>
<ol> <li>Could the Periodic Sync frequency be increased for a domain when there are active widgets?</li> <li>Assuming a Push could carry a payload to update a widget, would the widget displaying the new content fulfill the requirement that the user be shown something when the push arrives or would we still need to trigger a notification?</li> </ol>
