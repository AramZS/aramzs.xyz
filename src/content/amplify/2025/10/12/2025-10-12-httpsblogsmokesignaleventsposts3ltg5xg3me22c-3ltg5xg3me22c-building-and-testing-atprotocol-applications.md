---
author: Smoke Signal
cover_image: ''
date: '2025-10-12T14:15:56.992Z'
dateFolder: 2025/10/12
description: >-
  Building and testing atprotocol applications posted by @smokesignal.events on
  2024-08-03 11:00 UTC
isBasedOn: >-
  https://blog.smokesignal.events/posts/3ltg5xg3me22c-3ltg5xg3me22c-building-and-testing-atprotocol-applications
link: >-
  https://blog.smokesignal.events/posts/3ltg5xg3me22c-3ltg5xg3me22c-building-and-testing-atprotocol-applications
slug: >-
  2025-10-12-httpsblogsmokesignaleventsposts3ltg5xg3me22c-3ltg5xg3me22c-building-and-testing-atprotocol-applications
tags:
  - code
  - tech
  - decentralization
title: Building and testing atprotocol applications
---
<p>Developing an ATProtocol Application requires an understanding of the protocol and some infrastructure. This article explains how I create and maintain a development environment while working on Smoke Signal.</p>
<h3>Goals</h3>
<p>I've made the development environment similar to the production environment with a few minor caveats. I also didn't want to overlook security and protocol.</p>
<ol> <li>All connections to and from Smoke Signal development instances are over SSL.</li> <li>All connections to and from support services (PLC and PDS) are over SSL.</li> <li>All interactions between Smoke Signal, the PLC, and the PDS are true to protocol.</li> </ol>
<p>Additionally, I wanted to be able to create and destroy the world quickly, allowing for fast turnarounds with experimentation.</p>
<h3>Domain</h3>
<p>The development environment uses the real "pyroclastic.cloud" domain. Two records on that domain are relevant:</p>
<ul> <li><code>A pyroclastic.cloud</code> resolves to <code>127.0.0.1</code></li> <li><code>A *.pyroclastic.cloud</code> resolves to <code>127.0.0.1</code></li> </ul>
<p>Having the pyroclastic.cloud domain makes it easy to spin up hostname-based services that resolve locally and have any number of ATProtocol handles services by the local PDS.</p>
<p>It also has the side benefit of breaking loudly if something accidentally leaks. For example, if a DID lookup was made against the live PLC or an external service attempts to look up a handle, it will fail.</p>
<h3>Entry</h3>
<p>I run Caddy on 80 and 443 as the entry for all web requests. It proxies requests based on hostnames, performs TLS termination, and manages a CA certificate.</p>
<pre><code>{
	storage file_system ./caddy/
	debug
	pki {
		ca pyroclastic {
			name "Pyroclastic Cloud"
		}
	}
}

acme.pyroclastic.cloud {
	tls {
		issuer internal {
			ca pyroclastic
		}
	}
	acme_server {
		ca pyroclastic
	}
}

plc.pyroclastic.cloud {
	tls {
		issuer internal {
			ca pyroclastic
		}
	}
	reverse_proxy http://127.0.0.1:3000
}

smokesignal.pyroclastic.cloud {
	tls {
		issuer internal {
			ca pyroclastic
		}
	}
	reverse_proxy http://127.0.0.1:8080
}

pds.pyroclastic.cloud, *.pyroclastic.cloud {
	tls {
		issuer internal {
			ca pyroclastic
		}
	}
	reverse_proxy http://127.0.0.1:3001
}
</code></pre>
<p>There are a few things to learn here:</p>
<ul> <li>I can access the development PLC at <code>https://plc.pyroclastic.cloud/</code> via a proxy connection to the service running on port 3000.</li> <li>I can access the development PDS at <code>https://pds.pyroclastic.cloud/</code> via a proxy connection to the service running on port 3001.</li> <li>I can access the development instance of Smoke Signal at <code>https://smokesignal.pyroclastic.cloud/</code>.</li> </ul>
<p>All of these configurations use the internal issuer and CA configuration. The root configuration block defines a TLS CA, and Caddy creates certificates for hosts that reference it when it starts.</p>
<p>After all of that, I start Caddy with the following command:</p>
<pre><code>caddy run --config=./Caddyfile
</code></pre>
<p>If you are having issues running Caddy on port 80 and 443, you may need to give it privileges:</p>
<pre><code>sudo setcap CAP_NET_BIND_SERVICE=+eip /usr/bin/caddy
</code></pre>
<h3>PLC</h3>
<p>I'm running an instance of did-method-plc and making it available to the PDS and Smoke Signal. I had to do a few things to get it working:</p>
<p>First, I built the docker container locally with:</p>
<pre><code>docker build -f ./packages/server/Dockerfile -t plc .
</code></pre>
<p>Then, I created the file <code>docker-compose.yml</code> at the root of the project:</p>
<pre><code>version: '3.8'
services:
  db:
    image: postgres:14.4-alpine
    network_mode: "host"
    environment:
      - POSTGRES_USER=pg
      - POSTGRES_PASSWORD=password
    ports:
      - '5433:5432'
    healthcheck:
      test: 'pg_isready -U pg'
      interval: 500ms
      timeout: 10s
      retries: 20
    volumes:
      - plc_db:/var/lib/postgresql/data
      - ./postgres/init/:/docker-entrypoint-initdb.d/
  plc:
    depends_on: [db]
    image: docker.io/library/plcjs
    network_mode: "host"
    environment:
      - DATABASE_URL=postgres://pg:password@db/plc
      - DEBUG_MODE=1
      - LOG_ENABLED=true
      - LOG_LEVEL=debug
      - DB_CREDS_JSON={"username":"pg","password":"password","host":"localhost","port":"5432","database":"plc"}
      - DB_MIGRATE_CREDS_JSON={"username":"pg","password":"password","host":"localhost","port":"5432","database":"plc"}
      - ENABLE_MIGRATIONS=true
      - LOG_DESTINATION=1
    ports:
      - '2582:2582'
volumes:
  plc_db:
</code></pre>
<p>Lastly, I created the local directory and file <code>./postgres/init/init.sql</code> with the content:</p>
<pre><code>-- plc
CREATE DATABASE plc;
GRANT ALL PRIVILEGES ON DATABASE plc TO pg;

-- bgs
CREATE DATABASE bgs;
CREATE DATABASE carstore;
GRANT ALL PRIVILEGES ON DATABASE bgs TO pg;
GRANT ALL PRIVILEGES ON DATABASE carstore TO pg;

-- bsky(appview)
CREATE DATABASE bsky;
GRANT ALL PRIVILEGES ON DATABASE bsky TO pg;

-- ozone(moderation)
CREATE DATABASE mod;
GRANT ALL PRIVILEGES ON DATABASE mod TO pg;

-- pds
CREATE DATABASE pds;
GRANT ALL PRIVILEGES ON DATABASE pds TO pg;
</code></pre>
<p>Once that is in place, you can spin up the PLC service with the following command:</p>
<pre><code>docker compose up
</code></pre>
<p>You can verify that it is running with curl:</p>
<pre><code>CURL_CA_BUNDLE=/path/to/caddy/pki/authorities/pyroclastic/root.crt curl https://plc.pyroclastic.cloud/_health
</code></pre>
<h3>PDS</h3>
<p>Running a PDS is the same in development as it is in production with a few differences:</p>
<ol> <li>The PDS needs to know about the CA certificate that Caddy created to make valid HTTPS requests against the PLC.</li> <li>The configuration must point to the local PLC instead of the live one.</li> </ol>
<p>The PDS has the following environment variables in addition to the standard ones required to run it in the file<code>.pds.env</code>:</p>
<pre><code>PDS_SERVICE_HANDLE_DOMAINS=.pyroclastic.cloud
PDS_HOSTNAME=pds.pyroclastic.cloud
LOG_ENABLED=true
PDS_DID_PLC_URL=https://plc.pyroclastic.cloud
PDS_ACCEPTING_REPO_IMPORTS=true
DEBUG_MODE=1
LOG_LEVEL=trace
NODE_EXTRA_CA_CERTS=/certs/root.crt
PDS_PORT=3001
</code></pre>
<p>I'm using the following command to start the PDS and make sure all of the necessary files are available to it inside of the container:</p>
<pre><code>docker run --network=host -p 3001:3001 --env-file ./.pds.env --mount type=bind,source="$(pwd)"/pds,target=/pds --mount type=bind,source="$(pwd)"/caddy/pki/authorities/pyroclastic/,target=/certs ghcr.io/bluesky-social/pds:0.4
</code></pre>
<h3>Creating Accounts</h3>
<p>The account creation process is similar to the documented one, but I had to make one change to the script to get it working:</p>
```
# Ensure the user is root, since it's required for most commands (no spaces between brackets).
# if [ [ "${EUID}" -ne 0 ] ]; then
#   echo "ERROR: This script must be run as root"
#   exit 1
# fi
```
<p>I'm not running the script as root and don't need to, so I commented that out.</p>
<p>Now I can create account commands like this:</p>
<pre><code>CURL_CA_BUNDLE=$(pwd)/caddy/pki/authorities/pyroclastic/root.crt PDS_ENV_FILE=$(pwd)/.pds.env ./pdsadmin.sh account create masonthedog@pds.pyroclastic.cloud masonthedog.pyroclastic.cloud
</code></pre>
<p>You should see a message that looks like this:</p>
<pre><code>Account created successfully!
-----------------------------
Handle   : masonthedog.pyroclastic.cloud
DID      : did:plc:qtqslitywl6idlcs4v75jamk
Password : RdeTyDAmFcUUbD8jByUVCeCl
-----------------------------
Save this password, it will not be displayed again.
</code></pre>
<h3>Conclusion</h3>
<p>And that's it! When I start a development session, the first thing I do is start Caddy at the command line, PLC with docker compose up, and PDS with docker run. When I need to start from scratch, I stop and down all services, delete the data volumes, and start everything back up.</p>
<p>I want to draw attention to one crucial detail, though: the docker host network. The PLC and PDS run inside containers, so when a request to the PDS is resolved and connected to the PLC, it would be localhost, but from inside the container. Using the host network allows us to sidestep additional complex networking configuration or have hard-coded hostnames or IPs at the container level.</p>
<p>If you're getting into ATProtocol Application development, I hope this helps.</p>
