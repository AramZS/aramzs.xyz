---
author: amplify.aws
cover_image: 'https://docs.amplify.aws/assets/gen2-og.png'
date: '2026-01-07T17:17:47.261Z'
dateFolder: 2026/01/07
description: >-
  Use fullstack branch deployments to test changes from feature branches. AWS
  Amplify Documentation
isBasedOn: >-
  https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/branch-deployments/
link: >-
  https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/branch-deployments/
slug: >-
  2026-01-07-httpsdocsamplifyawsreactdeploy-and-hostfullstack-branchingbranch-deployments
tags:
  - code
title: Fullstack branch deployments
---
<p>Amplify code-first DX (Gen 2) offers fullstack branch deployments that allow you to automatically deploy infrastructure and application code changes from feature branches. This enables testing changes in an isolated environment before merging to the main branch.</p>
<h2><a href="https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/branch-deployments/#set-up-feature-branch-deployments">Set up feature branch deployments</a></h2>
<p>After you've deployed your <a href="https://docs.amplify.aws/react/start/quickstart/">first branch</a>, you can manually connect more, but the recommended workflow is to use the <strong>branch auto-detection</strong> feature.</p>
<ol> <li> <p>Log in to the <a href="https://console.aws.amazon.com/amplify/home">Amplify console</a> and choose your app.</p> </li> <li> <p>Navigate to <strong>App settings &gt; Branch settings</strong>, select <strong>Edit</strong> and enable <strong>Branch auto-detection</strong> and <strong>Branch auto-disconnection</strong>. The following video uses the default settings, which will connect any branch in your repo automatically. Branch auto-disconnection will ensure that if you delete a branch from your repository, the branch will also be deleted.</p> </li> </ol>
<figure></figure><p>You can also define a pattern to connect only certain branches. For example, setting <code>dev</code>, <code>staging</code>, and <code>feature/*</code> will automatically connect all three branch types. Your <code>dev</code> and <code>staging</code> branches, as well as any branch that begins with <code>feature/</code>, will be connected.</p>
<figure><video controls="" loop="" playsinline=""><source src="https://docs.amplify.aws/images/gen2/fullstack-branching/Enable-branch-autodetection.mp4"/></video></figure>
<ol start="3"> <li>Push a commit to your <code>feature/A</code> and <code>staging</code> branches that match the pattern. You should start seeing deployments on the console page. You will now have three fullstack branches deployed.</li> </ol>
<figure><img alt="Production, feature/A, and staging branches listed on app overview page in Amplify console." data-nimg="1" src="https://docs.amplify.aws/images/gen2/fullstack-branching/nextImageExportOptimizer/branches-opt-1920.WEBP" srcset="https://docs.amplify.aws/images/gen2/fullstack-branching/nextImageExportOptimizer/branches-opt-1920.WEBP 1x"/><figcaption>Production, feature/A, and staging branches listed on app overview page in Amplify console.</figcaption></figure>
<h2><a href="https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/branch-deployments/#promote-changes-to-production">Promote changes to production</a></h2>
<p>In Gen 2, promoting changes to production follows the normal Git-based workflow.</p>
<figure><img alt="Workflow for merging changes from feature/A branch to main, or production, branch." data-nimg="1" src="https://docs.amplify.aws/images/gen2/fullstack-branching/nextImageExportOptimizer/gitflow-opt-1920.WEBP" srcset="https://docs.amplify.aws/images/gen2/fullstack-branching/nextImageExportOptimizer/gitflow-opt-1920.WEBP 1x"/><figcaption>Workflow for merging changes from feature/A branch to main, or production, branch.</figcaption></figure>
<ol> <li>Make a change in your <code>feature/A</code> branch.</li> </ol>
<figure></figure><ol start="2"> <li>Submit a pull request to your <code>main</code> branch. Once your team has validated the changes, merge the pull request to <code>main</code>. This will initiate a build on your <code>main</code> branch and update any frontend or backend resources that you changed.</li> </ol>
<p>You can generate the config for a branch environment by running:</p>
<p>For Web and React Native, generating the config with the default format and output directory.</p>
<figure></figure><pre><code>npx ampx generate outputs --app-id &lt;your-amplify-app-id&gt; --branch &lt;your-git-branch-name&gt; --out-dir &lt;path/to/config&gt;</code></pre>
