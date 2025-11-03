---
author: Amazon Web Services
cover_image: >-
  https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/23/AWS_RTB_Fabric_600x315.jpg
date: '2025-11-03T17:07:38.830Z'
dateFolder: 2025/11/03
description: >-
  AWS RTB Fabric is a fully managed service designed for real-time bidding
  advertising workloads that enables AdTech companies to connect with their
  supply and demand partners through a dedicated, high-performance network
  environment, delivering single-digit millisecond performance and up to 80%
  lower networking costs compared to standard cloud connections while
  eliminating the need for colocation infrastructure or upfront commitments.
isBasedOn: >-
  https://aws.amazon.com/blogs/aws/introducing-aws-rtb-fabric-for-real-time-advertising-technology-workloads/
link: >-
  https://aws.amazon.com/blogs/aws/introducing-aws-rtb-fabric-for-real-time-advertising-technology-workloads/
slug: >-
  2025-11-03-httpsawsamazoncomblogsawsintroducing-aws-rtb-fabric-for-real-time-advertising-technology-workloads
tags:
  - ad tech
title: Introducing AWS RTB Fabric for real-time advertising technology workloads
---
<p>Today, we’re announcing AWS RTB Fabric, a fully managed service purpose built for real-time bidding (RTB) advertising workloads. The service helps advertising technology (AdTech) companies seamlessly connect with their supply and demand partners, such as <a href="https://advertising.amazon.com/lp/build-your-business-with-amazon-advertising?tag=googhydr-20&amp;ref=pd_sl_32yvxwiyd_e_ps_gg_b_au_en_d_core_e_646005230145&amp;k_amazon%20ads&amp;group_145097256426">Amazon Ads</a>, <a href="https://gumgum.com/">GumGum</a>, <a href="https://www.kargo.com/">Kargo</a>, <a href="https://mobilefuse.com/">MobileFuse</a>, <a href="https://www.sovrn.com/">Sovrn</a>, <a href="https://triplelift.com/">TripleLift</a>, <a href="https://www.viantinc.com/">Viant</a>, <a href="https://yieldmo.com/">Yieldmo</a> and more, to run high-volume, latency-sensitive RTB workloads on <a href="https://aws.amazon.com/">Amazon Web Services (AWS)</a> with consistent single-digit millisecond performance and up to 80% lower networking costs compared to standard networking costs.</p>
<p>AWS RTB Fabric provides a dedicated, high-performance network environment for RTB workloads and partner integrations without requiring colocated, on-premises infrastructure or upfront commitments. The following diagram shows the high-level architecture of RTB Fabric.</p>
<figure><img alt="" src="https://d2908q01vomqb2.cloudfront.net/da4b9237bacccdf19c0760cab7aec4a8359010b0/2025/10/20/Screenshot-2025-10-20-at-14.05.49.png"/></figure>
<p>AWS RTB Fabric also includes modules, a capability that helps customers bring their own and partner applications securely into the compute environment used for real-time bidding. Modules support containerized applications and <a href="https://aws.amazon.com/what-is/foundation-models/">foundation models (FMs)</a> that can enhance transaction efficiency and bidding effectiveness. At launch, AWS RTB Fabric includes modules for optimizing traffic management, improving bid efficiency, and increasing bid response rates, all running inline within the service for consistent low-latency execution.</p>
<p>The growth of programmatic advertising has created a need for low-latency, cost-efficient infrastructure to support RTB workloads. AdTech companies process millions of bid requests per second across publishers, supply-side platforms (SSPs), and demand-side platforms (DSPs). These workloads are highly sensitive to latency because most RTB auctions must complete within 200–300 milliseconds and require reliable, high-speed exchange of OpenRTB requests and responses among multiple partners. Many companies have addressed this by deploying infrastructure in colocation data centers near key partners, which reduces latency but adds operational complexity, long provisioning cycles, and high costs. Others have turned to cloud infrastructure to gain elasticity and scale, but they often face complex provisioning, partner-specific connectivity, and long-term commitments to achieve cost efficiency. These gaps add operational overhead and limit agility. AWS RTB Fabric solves these challenges by providing a managed private network built for RTB workloads that delivers consistent performance, simplifies partner onboarding, and achieves predictable cost efficiency without the burden of maintaining colocation or custom networking setups.</p>
<p><strong><u>Key capabilities</u></strong><br/>
 AWS RTB Fabric introduces a managed foundation for running RTB workloads at scale. The service provides the following key capabilities:</p>
<ul> <li><strong>Simplified connectivity to AdTech partners</strong> – When you register an RTB Fabric gateway, the service automatically generates secure endpoints that can be shared with selected partners. Using the AWS RTB Fabric API, you can create optimized, private connections to exchange RTB traffic securely across different environments. External Links are also available to connect with partners who aren’t using RTB Fabric, such as those operating on premises or in third-party cloud environments. This approach shortens integration time and simplifies collaboration among AdTech participants.</li> <li><strong>Dedicated network for low-latency advertising transactions – </strong>AWS RTB Fabric provides a managed, high-performance network layer optimized for OpenRTB communication. It connects AdTech participants such as SSPs, DSPs, and publishers through private, high-speed links that deliver consistent single-digit millisecond latency. The service automatically optimizes routing paths to maintain predictable performance and reduce networking costs, without requiring manual peering or configuration.</li> <li><strong>Pricing model aligned with RTB economics – </strong>AWS RTB Fabric uses a transaction-based pricing model designed to align with programmatic advertising economics. Customers are billed per billion transactions, providing predictable infrastructure costs that align with how advertising exchanges, SSPs, and DSPs operate.</li> <li><strong>Built-in traffic management modules</strong> – AWS RTB Fabric includes configurable modules that help AdTech workloads operate efficiently and reliably. Modules such as Rate Limiter, OpenRTB Filter, and Error Masking help you control request volume, validate message formats, and manage response handling directly in the network path. These modules execute inline within the AWS RTB Fabric environment, maintaining network-speed performance without adding application-level latency. All configurations are managed through the AWS RTB Fabric API, so you can define and update rules programmatically as your workloads scale.</li> </ul>
<p><strong><u>Getting started</u></strong><br/>
 Today, you can start building with AWS RTB Fabric using the <a href="https://aws.amazon.com/console/?nc2=type_a">AWS Management Console</a>, <a href="https://aws.amazon.com/cli/">AWS Command Line Interface (AWS CLI)</a>, or <a href="https://aws.amazon.com/what-is/iac/">infrastructure-as-code (IaC)</a> tools such as <a href="https://aws.amazon.com/cloudformation/?nc2=type_a">AWS CloudFormation</a> and <a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/choose-iac-tool/terraform.html">Terraform</a>.</p>
<p>The console provides a visual entry point to view and manage RTB gateways and links, as shown on the <strong>Dashboard</strong> of the <a href="https://console.aws.amazon.com/rtbfabric/home">AWS RTB Fabric console</a>.</p>
<p>You can also use the AWS CLI to configure gateways, create links, and manage traffic programmatically. When I started building with AWS RTB Fabric, I used the AWS CLI to configure everything from gateway creation to link setup and traffic monitoring. The setup ran inside my <a href="https://aws.amazon.com/vpc/">Amazon Virtual Private Cloud (Amazon VPC)</a> endpoint while AWS managed the low-latency infrastructure that connected workloads.</p>
<p>To begin, I created a <strong>requester gateway</strong> to send bid requests and a <strong>responder gateway</strong> to receive and process bid responses. These gateways act as secure communication points within the AWS RTB Fabric.</p>
<pre><code># Create a requester gateway with required parameters
aws rtbfabric create-requester-gateway \
  --description "My RTB requester gateway" \
  --vpc-id vpc-12345678 \
  --subnet-ids subnet-abc12345 subnet-def67890 \
  --security-group-ids sg-12345678 \
  --client-token "unique-client-token-123"
</code></pre>
<p>After both gateways were active, I created a link from the requester to the responder to establish a private, low-latency communication path for OpenRTB traffic. The link handled routing and load balancing automatically.</p>
<pre><code># Requester account creating a link from requester gateway to a responder gateway
aws rtbfabric create-link \
  --gateway-id rtb-gw-requester123 \
  --peer-gateway-id rtb-gw-responder456 \
  --log-settings '{"applicationLogs:{"sampling":"errorLog":10.0,"filterLog":10.0}}'</code></pre>
<p>I also connected with external partners using <strong>External Links</strong>, which extended my RTB workloads to on-premises or third-party environments while maintaining the same latency and security characteristics.</p>
<pre><code># Create an inbound external link endpoint for an external partner to send bid requests to
aws rtbfabric create-inbound-external-link \
  --gateway-id rtb-gw-responder456</code></pre>
<pre><code># Create an outbound external link for sending bid requests to an external partner
aws rtbfabric create-outbound-external-link \
  --gateway-id rtb-gw-requester123 \
  --public-endpoint "https://my-external-partner-responder.com"
</code></pre>
<p>To manage traffic efficiently, I added modules directly into the data path. The Rate Limiter module controlled request volume, and the OpenRTB Filter validated message formats inline at network speed.</p>
<pre><code># Attach a rate limiting module
aws rtbfabric update-link-module-flow \
  --gateway-id rtb-gw-responder456 \
  --link-id link-toresponder789 \
  --modules '{"name":"RateLimiter":"moduleParameters":{"rateLimiter":{"tps":10000}}}'</code></pre>
<p>Finally, I used <a href="https://aws.amazon.com/cloudwatch/?nc2=type_a">Amazon CloudWatch</a> to monitor throughput, latency, and module performance, and I exported logs to <a href="https://aws.amazon.com/s3/">Amazon Simple Storage Service (Amazon S3)</a> for auditing and optimization.</p>
<p>All configurations can also be automated with AWS CloudFormation or Terraform, allowing consistent, repeatable deployment across multiple environments. With RTB Fabric, I could focus on optimizing bidding logic while AWS maintained predictable, single-digit millisecond performance across my AdTech partners.</p>
<p>For more details, refer to the <a href="https://docs.aws.amazon.com/rtb-fabric/latest/userguide/what-is-rtb-fabric.html">AWS RTB Fabric User Guide</a>.</p>
<p><strong><u>Now available</u></strong><br/>
 AWS RTB Fabric is available today in the following <a href="https://docs.aws.amazon.com/glossary/latest/reference/glos-chap.html#region">AWS Regions</a>: US East (N. Virginia), US West (Oregon), Asia Pacific (Singapore), Asia Pacific (Tokyo), Europe (Frankfurt), and Europe (Ireland).</p>
<p>AWS RTB Fabric is continually evolving to address the changing needs of the AdTech industry. The service expands its capabilities to support secure integration of advanced applications and AI-driven optimizations in real-time bidding workflows that help customers simplify operations and improve performance on AWS. To learn more about AWS RTB Fabric, visit the <a href="http://aws.amazon.com/rtb-fabric">AWS RTB Fabric page</a>.</p>
