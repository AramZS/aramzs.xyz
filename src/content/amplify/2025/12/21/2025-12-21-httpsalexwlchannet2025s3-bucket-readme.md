---
author: alexwlchan.net
cover_image: 'https://alexwlchan.net/images/profile_green_sq.jpg'
date: '2025-12-21T21:03:12.437Z'
dateFolder: 2025/12/21
description: >-
  If you create an S3 bucket in Terraform, you can also create a README to help
  a future sysadmin understand what the bucket is for.
isBasedOn: 'https://alexwlchan.net/2025/s3-bucket-readme/'
link: 'https://alexwlchan.net/2025/s3-bucket-readme/'
slug: 2025-12-21-httpsalexwlchannet2025s3-bucket-readme
tags:
  - code
title: Adding a README to S3 buckets with Terraform
---
<p>I was creating a new S3 bucket today, and I had an idea – what if I add a README?</p>
<p>Browsing a list of S3 buckets is often an exercise in code archeology. Although people try to pick meaningful names, it’s easy for context to be forgotten and the purpose lost to time. Looking inside the bucket may not be helpful either, if all you see is binary objects in an unknown format named using UUIDs. A sentence or two of prose could really help a future reader.</p>
<p>We manage our infrastructure with Terraform and the Terraform AWS provider can <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_object">upload objects to S3</a>, so I only need to add a single resource:</p>
<pre><code>resource "aws_s3_bucket" "example" {
  bucket = "alexwlchan-readme-example"
}

resource "aws_s3_object" "readme" {
  bucket  = aws_s3_bucket.example.id
  key     = "README.txt"
  content = &lt;&lt;EOF
This bucket stores log files for the Widget Wrangler Service.

These log files are anonymised and expire after 30 days.

Docs: http://internal-wiki.example.com/widget-logs
Contact: logging@example.com
EOF
  content_type = "text/plain"
}
</code></pre>
<p>Now when the bucket is created, it comes with its own explanation. When you open the bucket in the S3 console, the README appears as a regular object in the list of files.</p>
<p>This is an example, but a real README needn’t be much longer:</p>
<ul><li>What is the bucket for?</li><li>Who do I talk to about what’s in this bucket?</li><li>Where can I find out more?</li></ul>
<p>This doesn’t replace longer documentation elsewhere, but it can be a useful pointer in the right direction. It’s a quick and easy way to help the future sysadmin who’s trying to understand an account full of half-forgotten S3 buckets, and my only regret is that I didn’t think to use <code>aws_s3_object</code> this way sooner.</p>
