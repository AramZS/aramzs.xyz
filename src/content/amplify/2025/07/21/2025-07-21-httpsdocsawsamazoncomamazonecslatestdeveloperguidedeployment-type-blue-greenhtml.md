---
author: amazon.com
cover_image: ''
date: '2025-07-21T19:47:55.173Z'
dateFolder: 2025/07/21
description: >-
  Amazon ECS blue/green deployments enable you to test service changes in a
  staging environment before routing production traffic to them.
isBasedOn: >-
  https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-blue-green.html
link: >-
  https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-blue-green.html
slug: >-
  2025-07-21-httpsdocsawsamazoncomamazonecslatestdeveloperguidedeployment-type-blue-greenhtml
tags:
  - code
title: Amazon ECS blue/green service deployments workflow
---
<p>Amazon ECS blue/green deployments - Amazon Elastic Container Service</p>
<p>A blue/green deployment is a release methodology that reduces downtime and risk by running two identical production environments called blue and green. With Amazon ECS blue/green deployments, you can validate new service revisions before directing production traffic to them. This approach provides a safer way to deploy changes with the ability to quickly roll back if needed.</p>
<h2><figure></figure></h2>
<p>The following are benefits of using blue/green deployments:</p>
<ul><li> <p>Reduces risk through testing with production traffic before switching production. You can validate the new deployment with test traffic before directing production traffic to it.</p> </li><li> <p>Zero downtime deployments. The production environment remains available throughout the deployment process, ensuring continuous service availability.</p> </li><li> <p>Easy rollback if issues are detected. If problems arise with the green deployment, you can quickly revert to the blue deployment without extended service disruption.</p> </li><li> <p>Controlled testing environment. The green environment provides an isolated space to test new features with real traffic patterns before full deployment.</p> </li><li> <p>Predictable deployment process. The structured approach with defined lifecycle stages makes deployments more consistent and reliable.</p> </li><li> <p>Automated validation through lifecycle hooks. You can implement automated tests at various stages of the deployment to verify functionality.</p> </li></ul>
<h2><figure></figure></h2>
<p>The following are Amazon ECS blue/green deployment terms:</p>
<ul><li> <p>Bake time - The duration when both blue and green service revisions are running simultaneously after the production traffic has shifted.</p> </li><li> <p>Blue deployment - The current production service revision that you want to replace.</p> </li><li> <p>Green deployment - The new service revision that you want to deploy.</p> </li><li> <p>Lifecycle stages - A series of events in the deployment operation, such as "after production traffic shift".</p> </li><li> <p>Lifecycle hook - A Lambda function that verifies the deployment at a specific lifecycle stage.</p> </li><li> <p>Listener - A Elastic Load Balancing resource that checks for connection requests using the protocol and port that you configure. The rules that you define for a listener determine how Amazon ECS routes requests to its registered targets.</p> </li><li> <p>Rule - An Elastic Load Balancing resource associated with a listener. A rule defines how requests are routed and consists of an action, condition, and priority.</p> </li><li> <p>Target group - An Elastic Load Balancing resource used to route requests to one or more registered targets (for example, EC2 instances). When you create a listener, you specify a target group for its default action. Traffic is forwarded to the target group specified in the listener rule.</p> </li><li> <p>Traffic shift - The process Amazon ECS uses to shift traffic from the blue deployment to the green deployment. For Amazon ECS blue/green deployments, all traffic is shifted from the blue service to the green service at once.</p> </li></ul>
<h2><figure></figure></h2>
<p>Consider the following when choosing a deployment type:</p>
<ul><li> <p>Resource usage: Blue/green deployments temporarily run both the blue and green service revisions simultaneously, which may double your resource usage during deployments.</p> </li><li> <p>Service auto scaling: If your service uses auto scaling, be aware that auto scaling is not blocked during a blue/green deployment, but the deployment might fail under certain circumstances. </p> </li><li> <p>Deployment monitoring: Blue/green deployments provide more detailed deployment status information, allowing you to monitor each stage of the deployment process.</p> </li><li> <p>Rollback: Blue/green deployments make it easier to roll back to the previous version if issues are detected, as the blue revision is kept running until the bake time expires.</p> </li></ul>
