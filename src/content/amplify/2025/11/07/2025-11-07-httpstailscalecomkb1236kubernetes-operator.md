---
author: tailscale
cover_image: 'https://tailscale.com/files/images/og-image.png'
date: '2025-11-07T22:25:22.277Z'
dateFolder: 2025/11/07
description: Learn how to expose your Kubernetes cluster to your Tailscale network.
isBasedOn: 'https://tailscale.com/kb/1236/kubernetes-operator'
link: 'https://tailscale.com/kb/1236/kubernetes-operator'
slug: 2025-11-07-httpstailscalecomkb1236kubernetes-operator
tags:
  - code
  - self-hosting
title: Kubernetes operator
---
<p>The <a href="https://github.com/tailscale/tailscale/blob/main/cmd/k8s-operator/manifests/operator.yaml">Tailscale Kubernetes operator</a> allows you to expose <a href="https://kubernetes.io/docs/concepts/services-networking/service/">services</a> in your Kubernetes cluster to your Tailscale network. Once installed, you can mark services in your cluster as Tailscale-accessible, and the operator will take care of the plumbing to add those services as nodes on your tailnet.</p>
<p>Kubernetes operator is currently <a href="https://tailscale.com/kb/1167/release-stages/#alpha">in alpha</a>. To try it, follow the steps below to enable it for your network using Tailscale v1.37.40 or later.</p>
<ol> <li> <p>In your <a href="https://tailscale.com/kb/1018/acls/">tailnet policy file</a>, create the <a href="https://tailscale.com/kb/1068/acl-tags/">ACL tags</a> <code>tag:k8s-operator</code> and <code>tag:k8s</code>, and make <code>tag:k8s-operator</code> an owner of <code>tag:k8s</code>. If you want your services to be exposed with tags other than the default <code>tag:k8s</code>, create those as well and make <code>tag:k8s-operator</code> an owner.</p> <pre><code>"tagOwners": {
   "tag:k8s-operator": [],
   "tag:k8s": ["tag:k8s-operator"],
}
</code></pre></li> <li> <p><a href="https://tailscale.com/kb/1215/oauth-clients/#setting-up-an-oauth-client">Create an OAuth client</a> in the <a href="https://login.tailscale.com/admin/settings/oauth"><strong>OAuth clients</strong></a> page of the admin console. Create the client with <code>Devices</code> write scope and the tag <code>tag:k8s-operator</code>.</p> </li> <li> <p>Edit your version of the manifest file:</p> <ol> <li>Find <code># SET CLIENT ID HERE</code> and replace it with your OAuth client ID.</li> <li>Find <code># SET CLIENT SECRET HERE</code> and replace it with your OAuth client secret.</li> </ol> <p>For both the client ID and secret, quote the value, to avoid any potential yaml misinterpretation of unquoted strings. For example, use:</p> <pre><code>client_id: "k123456CNTRL"
client_secret: "tskey-client-k123456CNTRL-abcdef"
</code></pre><p>instead of:</p> <pre><code>client_id: k123456CNTRL
client_secret: tskey-client-k123456CNTRL-abcdef
</code></pre></li> <li> <p>Apply the edited file to your Kubernetes cluster:</p> <pre><code>kubectl apply -f manifest.yaml
</code></pre><p>This creates the “tailscale” namespace in your cluster, and deploys the Tailscale operator within it.</p> </li> <li> <p>Verify that the Tailscale operator has joined your tailnet. Open the <a href="https://login.tailscale.com/admin/machines"><strong>Machines</strong></a> page of the admin console and look for a node named <strong>tailscale-operator</strong>, tagged with the <code>tag:k8s-operator</code> tag. It may take a minute or two for the operator to join your tailnet, due to the time required to download and start the container image in Kubernetes.</p> </li> </ol>
<p>Edit the service you want to expose and make it a load balancer:</p>
<ol> <li>Set <code>spec.type</code> to <code>LoadBalancer</code>.</li> <li>Set <code>spec.loadBalancerClass</code> to <code>tailscale</code>.</li> </ol>
<p>Once provisioning is complete, the service’s status will show the <a href="https://tailscale.com/kb/1081/magicdns/">fully-qualified domain name</a> of the service in your tailnet. You can view the service’s status by running <code>kubectl get service &lt;service name&gt;</code>.</p>
<p>You should also see a new node with that name appear in the <a href="https://login.tailscale.com/admin/machines"><strong>Machines</strong></a> page of the admin console.</p>
<p>If the service you want to expose already exists, you can expose it to Tailscale using <a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/">object annotations</a>.</p>
<p>Edit the service and under <code>metadata.annotations</code>, add the annotation <code>tailscale.com/expose</code> with the value <code>"true"</code>. Note that <code>"true"</code> is quoted because annotation values are strings, and an unquoted <code>true</code> will be incorrectly interpreted as a boolean.</p>
<p>In this mode, Kubernetes doesn’t tell you the Tailscale machine name. You can look up the node in the <a href="https://login.tailscale.com/admin/machines"><strong>Machines</strong></a> of the admin console to learn its machine name. By default, the machine name of an exposed service is <code>&lt;k8s-namespace&gt;-&lt;k8s-servicename&gt;</code>.</p>
<p>If you want the service to have a machine name other than the default <code>&lt;k8s-namespace&gt;-&lt;k8s-servicename&gt;</code>, you can provide your own machine name by setting the <code>tailscale.com/hostname</code> annotation on the service, with your desired machine name as the value.</p>
<p>Machine names are subject to the constraints of DNS: they can be up to 63 characters long, must start and end with a letter, and consist of only letters, numbers, and <code>-</code>.</p>
<p>By default, services join your tailnet tagged with <code>tag:k8s</code>. You can request a different set of tags by setting the <code>tailscale.com/tags</code> annotation on the service, with your desired tags (comma-separated) as the value.</p>
<p>For example, setting <code>tailscale.com/tags = tag:foo,tag:bar</code> will result in the tailnet node having the tags <code>tag:foo</code> and <code>tag:bar</code>.</p>
<p>The Tailscale operator must be a <a href="https://tailscale.com/kb/1018/acls/#tag-owners">tag owner</a> of all the specified tags: if you want to expose a service with <code>tag:foo,tag:bar</code>, the <code>tagOwners</code> section of the <a href="https://tailscale.com/kb/1018/acls/">tailnet policy file</a> must list <code>tag:k8s-operator</code> as one of the owners of both <code>tag:foo</code> and <code>tag:bar</code>.</p>
<p>Any of the following actions remove the service from your tailnet:</p>
<ul> <li>Delete the service entirely.</li> <li>If you are using the <code>tailscale.com/expose</code> annotation, remove the annotation.</li> <li>If you are using <code>type=LoadBalancer</code>, set <code>type</code> back to <code>ClusterIP</code>, or remove <code>loadBalancerClass=tailscale</code>.</li> </ul>
<p>Note that deletion is a one-way operation: deleting a service’s Tailscale node in the <a href="https://login.tailscale.com/admin/machines">admin console</a> does not clean up the Kubernetes state associated with that service.</p>
<p>The alpha Tailscale operator has the following known issues and limitations that we plan to address.</p>
<ul> <li>Only development (“unstable”) builds are usable for now, as the operator depends on some changes that happened after the release of Tailscale v1.36.</li> <li>There are no deployment options other than applying <a href="https://github.com/tailscale/tailscale/blob/main/cmd/k8s-operator/manifests/operator.yaml">manifest.yaml</a>. Let us know what other deployment methods you would like!</li> <li>Tags are only considered during initial provisioning. That is, editing <code>tailscale.com/tags</code> on an already exposed service doesn’t update the tags until you clean up and re-expose the service.</li> <li>The requested machine name is only considered during initial provisioning. That is, editing <code>tailscale.com/hostname</code> on an already exposed service doesn’t update the machine name until you clean up and re-expose the service.</li> <li>There are no automated updates. The operator and proxy pods will not update automatically to newer Tailscale releases as they become available.</li> <li>There are no dashboards or metrics.</li> </ul>
