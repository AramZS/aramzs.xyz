---
author: Vincent Prouillet
cover_image: null
date: '2026-06-27T05:11:40.604Z'
dateFolder: 2026/06/27
description: >-
  Zola is a static site generator (SSG), similar to Hugo, Pelican, and Jekyll
  (for a comprehensive list of SSGs, please see Jamstack). It is written in Rust
  and uses the Tera template engine, which is similar to Jinja2, Django
  templates, Liquid, and Twig.
isBasedOn: 'https://www.getzola.org/documentation/getting-started/overview/'
link: 'https://www.getzola.org/documentation/getting-started/overview/'
slug: 2026-06-27-httpswwwgetzolaorgdocumentationgetting-startedoverview
tags:
  - ssg
  - code
title: Overview
---
<aside> <ul> <li> Getting Started  </li> <li> Content  </li> <li> Templates  </li> <li> Deployment  </li> </ul> </aside>
<p>Zola is a static site generator (SSG), similar to <a href="https://gohugo.io/">Hugo</a>, <a href="https://blog.getpelican.com/">Pelican</a>, and <a href="https://jekyllrb.com/">Jekyll</a> (for a comprehensive list of SSGs, please see <a href="https://jamstack.org/generators">Jamstack</a>). It is written in <a href="https://www.rust-lang.org/">Rust</a> and uses the <a href="https://tera.netlify.com/">Tera</a> template engine, which is similar to <a href="https://jinja.palletsprojects.com/en/2.10.x/">Jinja2</a>, <a href="https://docs.djangoproject.com/en/2.2/topics/templates/">Django templates</a>, <a href="https://shopify.github.io/liquid/">Liquid</a>, and <a href="https://twig.symfony.com/">Twig</a>. Content is written in <a href="https://commonmark.org/">CommonMark</a>, a strongly defined, highly compatible specification of <a href="https://www.markdownguide.org/">Markdown</a>.</p>
<p>SSGs use dynamic templates to transform content into static HTML pages. Static sites are thus very fast and require no databases, making them easy to host. A comparison between static and dynamic sites, such as WordPress, Drupal, and Django, can be found <a href="https://dev.to/ashenmaster/static-vs-dynamic-sites-61f">here</a>.</p>
<p>To get a taste of Zola, please see the quick overview below.</p>
<h2><a href="https://www.getzola.org/documentation/getting-started/overview/#first-steps-with-zola">🔗</a>First Steps with Zola</h2>
<p>Unlike some SSGs, Zola makes no assumptions regarding the structure of your site. In this overview, we'll be making a simple blog site.</p>
<h3><a href="https://www.getzola.org/documentation/getting-started/overview/#initialize-site">🔗</a>Initialize Site</h3>
<blockquote> <p>This overview is based on Zola 0.9.</p> </blockquote>
<p>Please see the detailed <a href="https://www.getzola.org/documentation/getting-started/installation/">installation instructions for your platform</a>. With Zola installed, let's initialize our site:</p>
<pre data-lang="bash"><code data-lang="bash">$ zola init myblog
</code></pre>
<p>You will be asked a few questions.</p>
<pre><code>&gt; What is the URL of your site? (https://example.com):
&gt; Do you want to enable Sass compilation? [Y/n]:
&gt; Do you want to enable syntax highlighting? [y/N]:
&gt; Do you want to build a search index of the content? [y/N]:
</code></pre>
<p>For our blog, let's accept the default values (i.e., press Enter for each question). We now have a <code>myblog</code> directory with the following structure:</p>
<pre data-lang="bash"><code data-lang="bash">├── config.toml
├── content
├── sass
├── static
├── templates
└── themes
</code></pre>
<p>For reference, by the <strong>end</strong> of this overview, our <code>myblog</code> directory will have the following structure:</p>
<pre><code>├── config.toml
├── content/
│   └── blog/
│       ├── _index.md
│       ├── first.md
│       └── second.md
├── sass/
├── static/
├── templates/
│   ├── base.html
│   ├── blog-page.html
│   ├── blog.html
│   └── index.html
└── themes/
</code></pre>
<p>Let's start the Zola development server with:</p>
<pre data-lang="bash"><code data-lang="bash">$ zola serve
Building site...
-&gt; Creating 0 pages (0 orphan), 0 sections, and processing 0 images
</code></pre>
<blockquote> <p>This command must be run in the base Zola directory, which contains <code>config.toml</code>.</p> </blockquote>
<p>If you point your web browser to <a href="http://127.0.0.1:1111">http://127.0.0.1:1111</a>, you should see a "Welcome to Zola" message.</p>
<p>Let's make a home page. To do this, let's first create a <code>base.html</code> file inside the <code>templates</code> directory. This step will make more sense as we move through this overview.</p>
<pre data-lang="html"><code data-lang="html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
  &lt;title&gt;MyBlog&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;section class="section"&gt;
    &lt;div class="container"&gt;
      {% block content %} {% endblock %}
    &lt;/div&gt;
  &lt;/section&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>Now, let's create an <code>index.html</code> file inside the <code>templates</code> directory.</p>
<pre data-lang="html"><code data-lang="html">{% extends "base.html" %}
{% block content %}
&lt;h1 class="title"&gt;
  This is my blog made with Zola.
&lt;/h1&gt;
{% endblock content %}
</code></pre>
<p>This tells Zola that <code>index.html</code> extends our <code>base.html</code> file and replaces the block called "content" with the text between the <code>{% block content %}</code> and <code>{% endblock content %}</code> tags.</p>
<h3><a href="https://www.getzola.org/documentation/getting-started/overview/#content-directory">🔗</a>Content Directory</h3>
<p>Now let's add some content. We'll start by making a <code>blog</code> subdirectory in the <code>content</code> directory and creating an <code>_index.md</code> file inside it. This file tells Zola that <code>blog</code> is a <a href="https://www.getzola.org/documentation/content/section/">section</a>, which is how content is categorized in Zola.</p>
<pre data-lang="bash"><code data-lang="bash">├── content
│   └── blog
│       └── _index.md
</code></pre>
<p>In the <code>_index.md</code> file, we'll set the following variables in <a href="https://github.com/toml-lang/toml">TOML</a> format:</p>
<pre data-lang="md"><code data-lang="md">+++
title = "List of blog posts"
sort_by = "date"
template = "blog.html"
page_template = "blog-page.html"
+++
</code></pre>
<blockquote> <p>Note that although no variables are mandatory, the opening and closing <code>+++</code> are required.</p> </blockquote>
<ul> <li><em>sort_by = "date"</em> tells Zola to use the date to order our section pages (more on pages below). </li> <li><em>template = "blog.html"</em> tells Zola to use <code>blog.html</code> in the <code>templates</code> directory as the template for listing the Markdown files in this section. </li> <li><em>page_template = "blog-page.html"</em> tells Zola to use <code>blog-page.html</code> in the <code>templates</code> directory as the template for individual Markdown files. </li> </ul>
<p>For a full list of section variables, please see the <a href="https://www.getzola.org/documentation/content/section/">section</a> documentation. We will use <em>title = "List of blog posts"</em> in a template (see below).</p>
<h3><a href="https://www.getzola.org/documentation/getting-started/overview/#templates">🔗</a>Templates</h3>
<p>Let's now create some more templates. In the <code>templates</code> directory, create a <code>blog.html</code> file with the following contents:</p>
<pre data-lang="html"><code data-lang="html">{% extends "base.html" %}
{% block content %}
&lt;h1 class="title"&gt;
  {{ section.title }}
&lt;/h1&gt;
&lt;ul&gt;
  &lt;!-- If you are using pagination, section.pages will be empty. You need to use the paginator object --&gt;  
  {% for page in section.pages %}
  &lt;li&gt;&lt;a href="{{ page.permalink | safe }}"&gt;{{ page.title }}&lt;/a&gt;&lt;/li&gt;
  {% endfor %}
&lt;/ul&gt;
{% endblock content %}
</code></pre>
<p>As done by <code>index.html</code>, <code>blog.html</code> extends <code>base.html</code>, but this time we want to list the blog posts. The <em>title</em> we set in the <code>_index.md</code> file above is available to us as <code>{{ section.title }}</code>. In the list below the title, we loop through all the pages in our section (<code>blog</code> directory) and output the page title and URL using <code>{{ page.title }}</code> and <code>{{ page.permalink | safe }}</code>, respectively. We use the <code>| safe</code> filter because the permalink doesn't need to be HTML escaped (escaping would cause <code>/</code> to render as <code>&amp;#x2F;</code>).</p>
<p>If you go to <a href="http://127.0.0.1:1111/blog/">http://127.0.0.1:1111/blog/</a>, you will see the section page for <code>blog</code>. The list is empty because we don't have any blog posts. Let's fix that now.</p>
<p>In the <code>blog</code> directory, create a file called <code>first.md</code> with the following contents:</p>
<pre data-lang="md"><code data-lang="md">+++
title = "My first post"
+++
This is my first blog post.
</code></pre>
<p>The <em>title</em> and <em>date</em> will be available to us in the <code>blog-page.html</code> template as <code>{{ page.title }}</code> and <code>{{ page.date }}</code>, respectively. All text below the closing <code>+++</code> will be available to us as <code>{{ page.content }}</code>.</p>
<p>We now need to make the <code>blog-page.html</code> template. In the <code>templates</code> directory, create this file with the contents:</p>
<pre data-lang="html"><code data-lang="html">{% extends "base.html" %}
{% block content %}
&lt;h1 class="title"&gt;
  {{ page.title }}
&lt;/h1&gt;
&lt;p class="subtitle"&gt;&lt;strong&gt;{{ page.date }}&lt;/strong&gt;&lt;/p&gt;
{{ page.content | safe }}
{% endblock content %}
</code></pre>
<blockquote> <p>Note the <code>| safe</code> filter for <code>{{ page.content }}</code>.</p> </blockquote>
<p>This should start to look familiar. If you now go back to our blog list page at <a href="http://127.0.0.1:1111/blog/">http://127.0.0.1:1111/blog/</a>, you should see our lonely post. Let's add another. In the <code>content/blog</code> directory, let's create the file <code>second.md</code> with the contents:</p>
<pre data-lang="md"><code data-lang="md">+++
title = "My second post"
date = 2019-11-28
+++
This is my second blog post.
</code></pre>
<p>Back at <a href="http://127.0.0.1:1111/blog/">http://127.0.0.1:1111/blog/</a>, our second post shows up on top of the list because it's newer than the first post and we had set <em>sort_by = "date"</em> in our <code>_index.md</code> file. As a final step, let's modify our home page to link to our blog posts.</p>
<p>The <code>index.html</code> file inside the <code>templates</code> directory should be:</p>
<pre data-lang="html"><code data-lang="html">{% extends "base.html" %}
{% block content %}
&lt;h1 class="title"&gt;
  This is my blog made with Zola.
&lt;/h1&gt;
&lt;p&gt;Click &lt;a href="{{ get_url(path='@/blog/_index.md') }}"&gt;here&lt;/a&gt; to see my posts.&lt;/p&gt;
{% endblock content %}
</code></pre>
<p>This has been a quick overview of Zola. You can now dive into the rest of the documentation.</p>
