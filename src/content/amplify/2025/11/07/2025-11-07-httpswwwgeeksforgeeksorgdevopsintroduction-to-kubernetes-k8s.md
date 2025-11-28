---
author: GeeksforGeeks
cover_image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png'
date: '2025-11-07T22:23:50.821Z'
dateFolder: 2025/11/07
description: >-
  Your All-in-One Learning Portal: GeeksforGeeks is a comprehensive educational
  platform that empowers learners across domains-spanning computer science and
  programming, school education, upskilling, commerce, software tools,
  competitive exams, and more.
isBasedOn: 'https://www.geeksforgeeks.org/devops/introduction-to-kubernetes-k8s/'
link: 'https://www.geeksforgeeks.org/devops/introduction-to-kubernetes-k8s/'
slug: 2025-11-07-httpswwwgeeksforgeeksorgdevopsintroduction-to-kubernetes-k8s
tags:
  - code
title: Introduction to Kubernetes (K8s)
---
<p>Before Kubernetes, Docker and Docker Swarm transformed how developers package applications. It allowed them to bundle an application and its dependencies into a single, portable unit called a <b><strong>container</strong></b>. This worked fine for small-scale deployments, but when applications grew to hundreds or thousands of containers the following problems appeared:</p>
<ul><li>Scalability Issues</li><li>Multi-Cloud Deployments</li><li>Security &amp; Resource Management</li><li>Rolling Updates &amp; Zero Downtime Deployments</li></ul>
<p>This is the problem Kubernetes was created to solve. It acts as the "brain" or <b><strong>orchestrator</strong></b> for your containers, handling the complex task of managing them at scale automatically.</p>
<h2>What is Kubernetes?</h2>
<p>Kubernetes<b><strong>,</strong></b> often shortened toK8s (K, 8 letters, s), is an open-source platform that automates the deployment, scaling<b><strong>,</strong></b> and management of containerized applications.</p>
<ul><li><b><strong>Origin</strong></b>: Developed by Google, inspired by internal systems Borg and Omega.</li><li><b><strong>Launch</strong></b>: Officially released in 2014.</li><li><b><strong>CNCF Donation</strong></b>: Donated to the Cloud Native Computing Foundation (CNCF) in 2015, which now maintains it.</li><li><b><strong>Adoption</strong></b>: Widely used across major cloud providers today.</li><li><b><strong>Name Meaning</strong></b>: <i><em>Kubernetes</em></i> comes from Greek, meaning <b><strong>“</strong></b>helmsman” or “pilot<b><strong>”</strong></b>, symbolizing its role in steering applications.</li></ul>
<p>Think of Kubernetes as anorchestra conductor. Each container is a musician. While you can manage a few musicians yourself, you need a conductor to coordinate an entire orchestra to play a complex symphony. You simply give the conductor the sheet music (your desired configuration), and they ensure every musician plays their part correctly, replacing someone who falls ill and bringing in more players.</p>
<h3>Some features of K8s:</h3>
<ul><li><b><strong>Automated Scheduling</strong></b> – Efficiently places containers on nodes for optimal resource use.</li><li><b><strong>Self-Healing</strong></b> – Automatically restarts, replaces, and reschedules failed containers.</li><li><b><strong>Rollouts &amp; Rollbacks</strong></b> – Manages application updates and reverts when needed.</li><li><b><strong>Scaling &amp; Load Balancing</strong></b> – Supports horizontal scaling and distributes traffic.</li><li><b><strong>Resource Optimization</strong></b> – Monitors and ensures efficient resource utilization.</li></ul>
<h2>Monolithic Vs Microservices</h2>
<p>In the past, applications were built using a monolithic architecture, where everything was interconnected and bundled into one big codebase. This made updates risky for example, if you wanted to change just the payment module in an e-commerce app, you had to redeploy the entire application. A small bug could crash the whole system.</p>
<figure><img alt="monolithic-" src="https://media.geeksforgeeks.org/wp-content/uploads/20250910125529748811/monolithic-.webp" srcset="https://media.geeksforgeeks.org/wp-content/uploads/20250910125529748811/monolithic-.webp 801w,https://media.geeksforgeeks.org/wp-content/uploads/20250910125529748811/monolithic--100.webp 100w,https://media.geeksforgeeks.org/wp-content/uploads/20250910125529748811/monolithic--200.webp 200w,https://media.geeksforgeeks.org/wp-content/uploads/20250910125529748811/monolithic--300.webp 300w,https://media.geeksforgeeks.org/wp-content/uploads/20250910125529748811/monolithic--660.webp 660w,https://media.geeksforgeeks.org/wp-content/uploads/20250910125529748811/monolithic--768.webp 768w"/></figure>
<p>To overcome this, the industry moved toward microservices<b><strong>,</strong></b> where each feature (like payments, search, or notifications) is built and deployed independently. This made applications more flexible and scalable.</p>
<p>But with<b><strong> microservices</strong></b> came a new challenge:instead of running one big app, companies now had to manage hundreds or thousands of small containerized services. Containers solved the packaging problem, but without a way to orchestrate them, things got messy. That’s where Kubernetes came in acting like a smart manager that automates deployment, scaling, and coordination of all those microservices.</p>
<h2>Terminologies in K8s</h2>
<p>Think of Kubernetes as a well-organized company where different teams and systems work together to run applications efficiently. Here’s how the key terms fit into this system:</p>
<h3><b><strong>1. Pod</strong></b></h3>
<p>A <a href="https://www.geeksforgeeks.org/devops/kubernetes-pods/">Pod</a> is the smallest unit you can deploy in Kubernetes. It wraps one or more containers that need to run together, sharing the same network and storage. Containers inside a Pod can easily communicate and work as a single unit.</p>
<h3><b><strong>2. Node</strong></b></h3>
<p>A <a href="https://www.geeksforgeeks.org/devops/kubernetes-node/">Node </a>is a machine (physical or virtual) in a Kubernetes cluster that runs your applications. Each Node contains the tools needed to run Pods, including the container runtime (like Docker), the Kubelet (agent), and the Kube proxy (networking).</p>
<h3><b><strong>3. Cluster</strong></b></h3>
<p>A Kubernetes <a href="https://www.geeksforgeeks.org/devops/kubernetes-cluster/">cluster</a> is a group of computers (called nodes) that work together to run your containerized applications. These nodes can be real machines or virtual ones.</p>
<p>There are two types of nodes in a Kubernetes cluster:</p>
<ol><li><b><strong>Master node (Control Plane):</strong></b><ul><li>Think of it as the brain of the cluster.</li><li>It makes decisions, like where to run applications, handles scheduling, and keeps track of everything.</li></ul></li><li><b><strong>Worker nodes:</strong></b><ul><li>These are the machines that actually run your apps inside containers.</li><li>Each worker node has a Kubelet (agent), a container runtime (like Docker or containerd), and tools for networking and monitoring.</li></ul></li></ol>
<h3><b><strong>4. Deployment</strong></b></h3>
<p>A <a href="https://www.geeksforgeeks.org/devops/kubernetes-deployment/">Deployment</a> is a Kubernetes object used to manage a set of Pods running your containerized applications. It provides declarative updates, meaning you tell Kubernetes what you want, and it figures out how to get there.</p>
<h3><b><strong>5. ReplicaSet</strong></b></h3>
<p>A <a href="https://www.geeksforgeeks.org/devops/kubernetes-creating-a-replicaset/">ReplicaSet</a> ensures that the right number of identical Pods are running.</p>
<h3><b><strong>6. Service</strong></b></h3>
<p>A <a href="https://www.geeksforgeeks.org/devops/kubernetes-service/">Service </a>in Kubernetes is a way to connect applications running inside your cluster. It gives your Pods a stable way to communicate, even if the Pods themselves keep changing.</p>
<h3><b><strong>7. Ingress</strong></b></h3>
<p><a href="https://www.geeksforgeeks.org/devops/what-is-kubernetes-ingress/">Ingress</a> is a way to manage external access to your services in a Kubernetes cluster. It provides HTTP and HTTPS routing to your services, acting as a reverse proxy.</p>
<h3><b><strong>8. ConfigMap</strong></b></h3>
<p>A <a href="https://www.geeksforgeeks.org/devops/kubernetes-configmap/">ConfigMap</a> stores configuration settings separately from the application, so changes can be made without modifying the actual code.</p>
<p>Imagine you have an application that needs some settings, like a database password or an API key. Instead of hardcoding these settings into your app, you store them in a ConfigMap. Your application can then read these settings from the ConfigMap at runtime, which makes it easy to update the settings without changing the app code.</p>
<h3><b><strong>9. Secret</strong></b></h3>
<p>A <a href="https://www.geeksforgeeks.org/devops/kubernetes-secrets/">Secret</a> is a way to store sensitive information (like passwords, API keys, or tokens) securely in a Kubernetes cluster.</p>
<h3><b><strong>10. Persistent Volume (PV)</strong></b></h3>
<p>A Persistent <a href="https://www.geeksforgeeks.org/devops/kubernetes-volumes/">Volume</a> (PV) in Kubernetes is a piece of storage in the cluster that you can use to store data and it doesn’t get deleted when a Pod is removed or restarted.</p>
<h3><b><strong>11. Kubelet</strong></b></h3>
<p>A <a href="https://www.geeksforgeeks.org/devops/what-is-kubelet-in-kubernetes/">Kubelet</a> runs on each Worker Node and ensures Pods are running as expected.</p>
<h3><b><strong>12. Kube-proxy</strong></b></h3>
<p><a href="https://www.geeksforgeeks.org/devops/understanding-kubernetes-kube-proxy-and-its-role-in-service-networking/">Kube-proxy</a> manages networking inside the cluster, ensuring different Pods can communicate.</p>
<h3><b><strong>Also Check:</strong></b></h3>
<ul><li>The following shows the comparison between <a href="https://www.geeksforgeeks.org/devops/kubernetes-vs-docker/">Kubernetes vs Docker</a>.</li></ul>
<figure><p class="rw-outer-content"><span>Some content could not be imported from the original document.</span> <a href="https://aa.geeksforgeeks.org/instream/video.html">View content ↗ </a></p></figure>
