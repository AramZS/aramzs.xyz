---
author: panproto.dev
cover_image: null
date: '2026-07-11T22:20:12.542Z'
dateFolder: 2026/07/11
description: 'Documentation: tutorials, how-to guides, reference, and explanation'
isBasedOn: 'https://panproto.dev/book/'
link: 'https://panproto.dev/book/'
slug: 2026-07-11-httpspanprotodevbook
tags:
  - tech
  - decentralization
title: panproto
---
<p>panproto is a toolchain for evolving schemas: defining them, migrating data across versions, translating between protocols (JSON Schema, Protobuf, GraphQL, Avro, ATProto, SQL DDL, and many more), versioning the whole thing the way git versions source, and round-tripping data through bidirectional transforms whose laws are mechanically checked.</p>
<p>This documentation is organised in four quadrants, following the <a href="https://diataxis.fr/">Diataxis</a> framework. Pick the one that matches what you are trying to do.</p>
<p>Learning by doing. Pick this if you are new and want a guided sit-down with a working example at the end. No prior knowledge of category theory or schema theory is assumed.</p>
<p>Recipes for specific tasks: defining a schema in your language of choice, building a migration, wiring breaking-change detection into CI, querying instances, parsing full ASTs, bridging panproto’s version control to git. Pick this when you know what you want to do and need the steps.</p>
<p>Authoritative listings: every CLI subcommand, the SDK surfaces for Rust, TypeScript, and Python, the protocol catalogue, the expression-language builtins, the lens combinator algebra, the <code>panproto.toml</code> schema. Tables and signatures, no exposition.</p>
<p>Why the system is shaped the way it is. What schemas, migrations, lenses, and merges <em>mean</em> under the hood. The denotational semantics of panproto’s three DSLs, and a precise account of which categorical properties the implementation mechanically verifies. Most pages here are accessible to working developers; the <code>semantics/</code> cluster is the place where the math is load-bearing.</p>
