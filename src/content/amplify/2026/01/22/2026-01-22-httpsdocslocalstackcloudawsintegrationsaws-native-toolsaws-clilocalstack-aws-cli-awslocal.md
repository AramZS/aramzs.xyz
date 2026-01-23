---
author: Docs
cover_image: ''
date: '2026-01-22T16:22:23.814Z'
dateFolder: 2026/01/22
description: >-
  Use AWS Command Line Interface (CLI)  to create local AWS resources with
  LocalStack.
isBasedOn: >-
  https://docs.localstack.cloud/aws/integrations/aws-native-tools/aws-cli/#localstack-aws-cli-awslocal
link: >-
  https://docs.localstack.cloud/aws/integrations/aws-native-tools/aws-cli/#localstack-aws-cli-awslocal
slug: >-
  2026-01-22-httpsdocslocalstackcloudawsintegrationsaws-native-toolsaws-clilocalstack-aws-cli-awslocal
tags:
  - code
title: AWS CLI
---
<p>The <a href="https://aws.amazon.com/cli/">AWS Command Line Interface (CLI)</a> is a unified tool for creating and managing AWS services via a command line interface. All CLI commands applicable to services implemented within <a href="https://docs.localstack.cloud/aws/integrations/aws-native-tools/aws-cli/">LocalStack</a> can be executed when operating against LocalStack.</p>
<p>You can use the AWS CLI with LocalStack using either of the following approaches:</p>
<p><a href="https://docs.localstack.cloud/aws/integrations/aws-native-tools/aws-cli/#aws-cli">AWS CLI</a></p>
<p>You can install <code>aws</code> by using the following command if it’s not already installed.</p>
<figure><figcaption>Terminal window</figcaption><pre data-language="bash"><code>pip install awscli</code></pre></figure>
<p>You can configure the AWS CLI to redirect AWS API requests to LocalStack using two approaches:</p>
<ul> <li><a href="https://docs.localstack.cloud/aws/integrations/aws-native-tools/aws-cli/#configuring-an-endpoint-url">Configuring an endpoint URL</a></li> <li><a href="https://docs.localstack.cloud/aws/integrations/aws-native-tools/aws-cli/#configuring-a-custom-profile">Configuring a custom profile</a></li> </ul>
<p>You can use AWS CLI with an endpoint URL by configuring test environment variables and include the <code>--endpoint-url=&lt;localstack-url&gt;</code> flag in your <code>aws</code> CLI commands. For example:</p>
<p>You can configure a custom profile to use with LocalStack. Add the following profile to your AWS configuration file (by default, this file is at <code>~/.aws/config</code>):</p>
<p>Add the following profile to your AWS credentials file (by default, this file is at <code>~/.aws/credentials</code>):</p>
<p>You can now use the <code>localstack</code> profile with the <code>aws</code> CLI:</p>
<p><code>awslocal</code> serves as a thin wrapper and a substitute for the standard <code>aws</code> command, enabling you to run AWS CLI commands within the LocalStack environment without specifying the <code>--endpoint-url</code> parameter or a profile.</p>
<p>Install the <code>awslocal</code> command using the following command:</p>
<p>The <code>awslocal</code> command shares identical usage with the standard <code>aws</code> command. For comprehensive usage instructions, refer to the manual pages by running <code>awslocal help</code>.</p>
<table><tr><th>Variable Name</th><th>Description</th></tr><tbody><tr><td>AWS_ENDPOINT_URL</td><td>The endpoint URL to connect to (takes precedence over USE_SSL/LOCALSTACK_HOST)</td></tr><tr><td>LOCALSTACK_HOST</td><td>(deprecated) A variable defining where to find LocalStack (default: localhost:4566)</td></tr><tr><td>USE_SSL</td><td>(deprecated) Whether to use SSL when connecting to LocalStack (default: False)</td></tr></tbody></table>
<p>Please note that there is a known limitation for using the <code>cloudformation package ...</code> command with the AWS CLI v2. The problem is that the AWS CLI v2 is <a href="https://github.com/aws/aws-cli/issues/4947">not available as a package on pypi.org</a>, but is instead shipped as a binary package that cannot be easily patched from <code>awslocal</code>. To work around this issue, you have 2 options:</p>
<ul> <li>Downgrade to the v1 AWS CLI (this is the recommended approach)</li> <li>There is an unofficial way to install AWS CLI v2 from sources. We do not recommend this, but it is technically possible. Also, you should install these libraries in a Python virtualenv, to avoid version clashes with other libraries on your system:</li> </ul>
<p>Please also note there is a known limitation for issuing requests using <code>--no-sign-request</code> with the AWS CLI. LocalStack’s routing mechanism depends on the signature of each request to identify the correct service for the request. Thus, adding the flag <code>--no-sign-requests</code> provokes your request to reach the wrong service. One possible way to address this is to use the <code>awslocal</code> CLI instead of AWS CLI.</p>
<p>Automatic installation of AWS CLI version 2 is currently not supported (at the time of writing there is no official pypi package for v2 available), but the awslocal technically also works with AWS CLI v2 (see this section for more details).</p>
<p>By default, the container running <a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-docker.html">amazon/aws-cli</a> is isolated from <code>0.0.0.0:4566</code> on the host machine, that means that aws-cli cannot reach localstack through your shell.</p>
<p>To ensure that the two docker containers can communicate create a network on the docker engine:</p>
<p>Then modify the <code>docker-compose.yml</code> specifying the network to use:</p>
<p>Run AWS Cli v2 docker container using this network (example):</p>
<p>If you use AWS CLI v2 from a docker container often, create an alias:</p>
<p>So you can type:</p>
