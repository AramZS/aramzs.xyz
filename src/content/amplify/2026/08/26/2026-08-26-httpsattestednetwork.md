---
author: attested.network
cover_image: null
date: '2026-08-26T23:05:44.450Z'
dateFolder: 2026/08/26
description: >-
  An open specification for decentralized, cryptographically verifiable proof of
  payments.
isBasedOn: 'https://attested.network/'
link: 'https://attested.network/'
slug: 2026-08-26-httpsattestednetwork
tags:
  - decentralization
title: Proof of Payment for ATProtocol
---
<h2>Documentation</h2>
<p>Guides for every role in the attested payments ecosystem.</p>
<p><a href="https://attested.network/brokers.html"> <h4>Payment Brokers</h4> <p>Implement a payment servicer that processes transactions and writes attestation proofs.</p> </a> <a href="https://attested.network/app-developers.html"> <h4>App Developers</h4> <p>Integrate payment verification into your ATProtocol application.</p> </a> <a href="https://attested.network/recipients.html"> <h4>Recipients</h4> <p>Set up your identity to accept attested payments from supporters.</p> </a> <a href="https://attested.network/payers.html"> <h4>Payers</h4> <p>Understand how your payments are recorded, verified, and portable.</p> </a> <a href="https://attested.network/scenarios.html"> <h4>Scenarios</h4> <p>Real-world examples showing attested payments in action.</p> </a></p>
<h2>Scope</h2>
<p>What this specification covers and what it intentionally leaves to implementors.</p>
<h3>In scope</h3>
<ul> <li>Providing an on-protocol way of recording and validating proof-of-payment information</li> <li>Supporting public and permissioned data views, processes, and relationships between buyers, sellers, and brokers</li> <li>Lexicon definitions for payment record types and proof records</li> <li>XRPC methods for payment initiation, status polling, and lookup</li> <li>CID-based cryptographic verification via <a href="https://badge.blue">badge.blue</a> attestations</li> <li>Three-party attestation model (payer, recipient, broker)</li> <li>Entitlements — linking payments to goods or services via <code>strongRef</code></li> <li>Trust models for application-level verification (Strict, Creator-Trusted, Federated)</li> <li>Payment lifecycle: creation, cancellation, and transfer patterns</li> <li>Broker role and discovery patterns</li> <li>DID document <code>#AttestedNetwork</code> service endpoint schema</li> </ul>
<h3>Out of scope</h3>
<ul> <li>Payment implementations — how brokers actually process transactions (Stripe, bank transfers, cash, crypto, etc.)</li> <li>Entitlement record schemas — linked via <code>strongRef</code> but intentionally undefined; any lexicon can be used</li> <li>Product catalogs, pricing, or tier definitions</li> <li>Dispute resolution and refunds</li> <li>Currency conversion</li> <li>Tax reporting or compliance</li> <li>Identity verification / KYC</li> <li>How recipients deliver goods or services after payment</li> </ul>
<p>This spec defines the <strong>proof layer</strong> — what happened and who attests to it. The <strong>business layer</strong> — what you’re buying, how disputes work, how delivery happens — is intentionally left to participants and their chosen brokers.</p>
<h2>Overview</h2>
<p>Payment proofs replace centralized payment databases with cryptographic attestation records distributed across ATProtocol repositories. Any application can independently verify a payment—no single platform controls the relationship.</p>
<h3>Three-party attestation</h3>
<p>Every payment creates records across three independent repositories. The supporter declares intent, the creator confirms receipt, and a broker—which facilitates and witnesses the exchange—writes its own proof. Each record is content-addressed and bound to its repository, preventing replay attacks.</p>
<h4>Data Ownership</h4>
<p>Each party controls their own records in their own repository. No single entity holds the full picture.</p>
<p>CID-based content addressing ensures records cannot be modified after attestation. Change the data, break the hash.</p>
<h4>Portable Relationships</h4>
<p>Support relationships survive platform changes. Records live on ATProtocol’s network, not in proprietary databases.</p>
<p>Any entity can serve as a broker because brokers facilitate payment. A broker might process Stripe transactions, handle peer-to-peer cash, or simply witness a virtual high-five. The role is to facilitate and witness the exchange between payer and recipient.</p>
<p>This spec builds on <a href="https://badge.blue">badge.blue</a>’s CID-first attestation framework. Every attestation CID is computed from the record content, metadata, and the repository DID—meaning a record copied to a different repository automatically invalidates all its attestations.</p>
<p><strong>Public &amp; private proofs.</strong> Payment records and proofs can live in a user’s public repository for open verification, or within a <a href="https://dholms.leaflet.pub/3mhj6bcqats2o">Permissioned Data Space</a> for private access. The implementation is effectively identical in both cases—the same attestation mechanics, CID binding, and strongRef signatures apply. The only difference is that the payment servicer additionally manages creation of the permissioned space in the payer’s repository and ensures all parties (creator, broker) have appropriate read access and permissions.</p>
<h3>Payment Intent</h3>
<p>When a recipient wants to accept a payment, a structured discovery and initiation flow connects payer, recipient, and payment servicer:</p>
<ol> <li>The <strong>recipient</strong> signals which payment servicers they use by publishing an ordered list of DIDs that have a <code>#AttestedNetwork</code> service endpoint in their DID document</li> <li>The <strong>payer’s client</strong> resolves these DIDs and presents the available servicers. The payer selects which one to use</li> <li>The payer’s client makes an <strong>authenticated request</strong> (using inter-service authentication) to <code>network.attested.payment.initiate</code> on the selected servicer, passing the product identifier. The response includes a <strong>token</strong> and a <strong>URL</strong></li> <li>The payer is <strong>directed through a browser</strong> to the URL to complete the payment process (entering payment details, confirming terms, etc.)</li> <li>The payer’s client polls <code>network.attested.payment.status</code> with the token. The response is either a <strong>strongRef</strong> pointing to the completed payment record, or a <strong>failed</strong> status</li> </ol>
<h3>Verification</h3>
<p>Any application can verify a payment by checking the cryptographic chain:</p>
<ol> <li>Strip the <code>signatures</code> array from the payment record</li> <li>Prepare attestation metadata—add the repository DID, strip <code>cid</code> and <code>signature</code> fields</li> <li>Insert metadata as the <code>$sig</code> field, serialize to DAG-CBOR</li> <li>Hash with SHA-256 and wrap as CIDv1 (codec <code>0x71</code>)</li> <li>Fetch proof records via <code>strongRef</code> URIs and confirm CIDs match</li> </ol>
<h3>Trust Models</h3>
<p>Applications can implement different validation strategies:</p>
<ul> <li><strong>Strict</strong> Require proofs from both the creator and a specific trusted broker. Highest assurance.</li> <li><strong>Creator-Trusted</strong> Accept any payment the creator has attested. Simpler, trusts creators to vouch for supporters.</li> <li><strong>Federated</strong> Accept attestations from a set of trusted brokers. Enables regional verification networks.</li> </ul>
<h2>Lexicon</h2>
<p>Four record types and three XRPC methods define the payment specification. Payment records live in the supporter’s repository and carry a <code>signatures</code> array referencing proof records from creators and brokers.</p>
<p>Record</p>
<p>A one-time payment from a supporter to a creator. Represents a single, non-recurring financial transaction attested by one or more parties.</p>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>subject</td><td>string (did)</td><td>DID of the creator receiving payment</td></tr> <tr><td>amount</td><td>integer</td><td>Payment amount in smallest currency unit (e.g. cents). Min: 1</td></tr> <tr><td>currency</td><td>string</td><td>ISO 4217 currency code (e.g. <code>USD</code>, <code>EUR</code>)</td></tr> <tr><td>txnid</td><td>string</td><td>Unique transaction identifier for deduplication</td></tr> <tr><td>memo</td><td>string</td><td>Optional note from the supporter. Max 256 chars</td></tr> <tr><td>createdAt</td><td>string (datetime)</td><td>Timestamp of record creation</td></tr> <tr><td>entitlements</td><td>array(<code>com.atproto.repo.strongRef</code>)</td><td>Optional list of strong references to records representing any goods or services the payer is entitled to as a result of this payment</td></tr> <tr><td>signatures</td><td>array</td><td>Attestation entries (inline or <code>com.atproto.repo.strongRef</code>)</td></tr> </tbody> </table>
<p><strong>Entitlements.</strong> The <code>entitlements</code> field is an optional array of <code>com.atproto.repo.strongRef</code> objects. Each reference points to a record representing a good or service the payer is entitled to as a result of this payment. The referenced records can use any lexicon—they are not defined by this spec. This allows brokers, recipients, or third parties to define their own product or access records and link them directly to the payment that granted them.</p>
<p>Record</p>
<p>A recurring payment commitment. Immutable once created—supporters cancel and create new subscriptions to change terms. Bills on anniversary dates with automatic retry on failure.</p>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>subject</td><td>string (did)</td><td>DID of the creator receiving payment</td></tr> <tr><td>amount</td><td>integer</td><td>Amount per billing period in smallest currency unit. Min: 500, Max: 25000 (monthly equivalent)</td></tr> <tr><td>currency</td><td>string</td><td>ISO 4217 currency code</td></tr> <tr><td>unit</td><td>string</td><td>Billing period: <code>monthly</code> | <code>quarterly</code> | <code>semiannual</code> | <code>yearly</code></td></tr> <tr><td>frequency</td><td>integer</td><td>Billing frequency multiplier. Default: 1, Min: 1</td></tr> <tr><td>txnid</td><td>string</td><td>Unique transaction identifier for deduplication</td></tr> <tr><td>createdAt</td><td>string (datetime)</td><td>Timestamp of initial subscription creation</td></tr> <tr><td>entitlements</td><td>array(<code>com.atproto.repo.strongRef</code>)</td><td>Optional list of strong references to records representing any goods or services the payer is entitled to as a result of this payment</td></tr> <tr><td>signatures</td><td>array</td><td>Attestation entries (inline or <code>com.atproto.repo.strongRef</code>)</td></tr> </tbody> </table>
<p>Record</p>
<p>A fixed series of payments. Unlike recurring payments that continue indefinitely, scheduled payments specify a total count and terminate automatically upon completion.</p>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>subject</td><td>string (did)</td><td>DID of the creator receiving payment</td></tr> <tr><td>amount</td><td>integer</td><td>Amount per payment in smallest currency unit</td></tr> <tr><td>currency</td><td>string</td><td>ISO 4217 currency code</td></tr> <tr><td>unit</td><td>string</td><td>Interval: <code>monthly</code> | <code>quarterly</code> | <code>semiannual</code> | <code>yearly</code></td></tr> <tr><td>count</td><td>integer</td><td>Total number of scheduled payments. Min: 2, Max: 60</td></tr> <tr><td>txnid</td><td>string</td><td>Unique transaction identifier for deduplication</td></tr> <tr><td>createdAt</td><td>string (datetime)</td><td>Timestamp of schedule creation; first payment date</td></tr> <tr><td>entitlements</td><td>array(<code>com.atproto.repo.strongRef</code>)</td><td>Optional list of strong references to records representing any goods or services the payer is entitled to as a result of this payment</td></tr> <tr><td>signatures</td><td>array</td><td>Attestation entries (inline or <code>com.atproto.repo.strongRef</code>)</td></tr> </tbody> </table>
<p>Record</p>
<p>A remote attestation record stored in the attestor’s repository (creator or broker). Referenced via <code>com.atproto.repo.strongRef</code> in the payment record’s <code>signatures</code> array.</p>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>cid</td><td>string (cid)</td><td>Attestation CID computed per the <a href="https://badge.blue">badge.blue</a> spec from the payment record, metadata, and repository DID</td></tr> <tr><td>status</td><td>string</td><td>Optional status indicator for the attestation</td></tr> </tbody> </table>
<p>Query (HTTP GET)</p>
<p>Look up verified payment records between a payer and recipient. Returns only records whose attestations have been cryptographically verified. Results may include any combination of <code>oneTime</code>, <code>recurring</code>, and <code>scheduled</code> payment records.</p>
<h4>Parameters</h4>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>payer</td><td>string (did, required)</td><td>DID of the payer (supporter)</td></tr> <tr><td>recipient</td><td>string (did, required)</td><td>DID of the recipient (creator)</td></tr> <tr><td>paymentType</td><td>string</td><td>Optional filter by payment collection. Must be a full NSID: <code>network.attested.payment.oneTime</code>, <code>network.attested.payment.recurring</code>, or <code>network.attested.payment.scheduled</code></td></tr> <tr><td>brokers</td><td>array(string) (did, optional, repeating)</td><td>Optional list of broker DIDs. When provided, only returns payments that have at least one validating signature from an identity in this list</td></tr> <tr><td>entitlements</td><td>array(string) (at-uri, optional, repeating)</td><td>Optional list of entitlement AT-URIs. When provided, only returns payments whose <code>entitlements</code> array contains one or more of the given references</td></tr> </tbody> </table>
<h4>Response</h4>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>payments</td><td>array(union)</td><td>List of verified payment records. Each element is a union of <code>network.attested.payment.oneTime</code>, <code>network.attested.payment.recurring</code>, or <code>network.attested.payment.scheduled</code></td></tr> </tbody> </table>
<p>Procedure (HTTP POST)</p>
<p>Begin a payment flow. Called by the payer’s client against the selected payment servicer using inter-service authentication. Returns a token for status polling and a URL to direct the payer through the payment process.</p>
<h4>Input</h4>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>product</td><td>string (required)</td><td>Product identifier for the payment being initiated</td></tr> </tbody> </table>
<h4>Response</h4>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>token</td><td>string</td><td>Opaque token used to poll payment status via <code>payment.status</code></td></tr> <tr><td>url</td><td>string (uri)</td><td>URL to direct the payer to in a browser to complete the payment</td></tr> </tbody> </table>
<p>Query (HTTP GET)</p>
<p>Check the status of a payment initiated via <code>payment.initiate</code>. Returns either a <code>com.atproto.repo.strongRef</code> pointing to the completed payment record, or a failed status.</p>
<h4>Parameters</h4>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>token</td><td>string (required)</td><td>Token returned from <code>payment.initiate</code></td></tr> </tbody> </table>
<h4>Response</h4>
<table> Schema fields <tr><th>Field</th><th>Type</th><th>Description</th></tr> <tbody> <tr><td>status</td><td>string</td><td><code>pending</code> | <code>completed</code> | <code>failed</code></td></tr> <tr><td>ref</td><td>com.atproto.repo.strongRef</td><td>Present when status is <code>completed</code>. Points to the attested payment record in the payer’s repository</td></tr> </tbody> </table>
<h2>Examples</h2>
<p>Complete record examples showing how attested payments work in practice, using <a href="https://badge.blue">badge.blue</a> remote attestations with <code>com.atproto.repo.strongRef</code> entries.</p>
<h3>One-time tip with dual attestation</h3>
<p>A supporter sends a $25 tip to a creator. Both the creator and broker independently attest the payment by writing proof records to their own repositories.</p>
<pre>{
  "$type": "network.attested.payment.oneTime",
  "subject": "did:plc:v5jkrb2oncmnhc7rtqhrdzwi",
  "amount": 2500,
  "currency": "USD",
  "txnid": "01J5K9P3XQHV7WNBCM2G8RFAT",
  "memo": "Great stream, keep it up!",
  "createdAt": "2025-07-14T19:22:00.000Z",
  "signatures": [
    {
      "$type": "com.atproto.repo.strongRef",
      "uri": "at://did:plc:v5jkrb2oncmnhc7rtqhrdzwi/network.attested.payment.proof/3la7qxz2vbc2s",
      "cid": "bafyreigyh7s6lqf5n3xke4jt6r2x3mqkzf4wpgicbqhqg5k3vdjn7aomfe"
    },
    {
      "$type": "com.atproto.repo.strongRef",
      "uri": "at://did:plc:broker-payments-xyz/network.attested.payment.proof/3la7qy2kbrc2t",
      "cid": "bafyreih7wwfa3tcoqd2ne5gqkvrulzpfnwjmcc5fsgqjdx4huswnhzaehqu"
    }
  ]
}</pre>
<pre>{
  "$type": "network.attested.payment.proof",
  "cid": "bafyreifdw3gy6ef4mcep5forx72cilu6wbsvuajkgsxnluqemkpa5xvzrwu"
}</pre>
<p><strong>How the CID binds to the repo:</strong> The proof’s <code>cid</code> field is computed from the payment record with the supporter’s DID baked into the <code>$sig</code> metadata. If someone copies the payment record to a different repository, recomputing the CID produces a different value—verification fails automatically.</p>
<h3>Monthly recurring subscription</h3>
<p>A $10/month recurring support commitment. The record is immutable—to change the amount, the supporter cancels and creates a new subscription.</p>
<pre>{
  "$type": "network.attested.payment.recurring",
  "subject": "did:plc:v5jkrb2oncmnhc7rtqhrdzwi",
  "amount": 1000,
  "currency": "USD",
  "unit": "monthly",
  "frequency": 1,
  "txnid": "01J5KBR4WMHV8XNBDM3G9SFBT",
  "createdAt": "2025-08-01T00:00:00.000Z",
  "entitlements": [
    {
      "$type": "com.atproto.repo.strongRef",
      "uri": "at://did:plc:v5jkrb2oncmnhc7rtqhrdzwi/com.example.product/3miemuswqbyiw",
      "cid": "bafyreik3xxgb5tcoqd3ne6gqkvrulzpfnwjmcc5fsgqjdx4huswnhzbekaa"
    }
  ],
  "signatures": [
    {
      "$type": "com.atproto.repo.strongRef",
      "uri": "at://did:plc:v5jkrb2oncmnhc7rtqhrdzwi/network.attested.payment.proof/3lb2rxz3vdc3t",
      "cid": "bafyreigyh7s6lqf5n3xke4jt6r2x3mqkzf4wpgicbqhqg5k3vdjn7aomfe"
    },
    {
      "$type": "com.atproto.repo.strongRef",
      "uri": "at://did:plc:broker-payments-xyz/network.attested.payment.proof/3lb2ry4ldsc3u",
      "cid": "bafyreih7wwfa3tcoqd2ne5gqkvrulzpfnwjmcc5fsgqjdx4huswnhzaehqu"
    }
  ]
}</pre>
<h3>Scheduled payment series</h3>
<p>Six monthly payments of $50 each, terminating automatically after the final installment. Useful for project-based sponsorships or fixed commitments.</p>
<pre>{
  "$type": "network.attested.payment.scheduled",
  "subject": "did:plc:v5jkrb2oncmnhc7rtqhrdzwi",
  "amount": 5000,
  "currency": "USD",
  "unit": "monthly",
  "count": 6,
  "txnid": "01J5KCS5XRHW9YOCEN4H0TGCU",
  "createdAt": "2025-09-01T00:00:00.000Z",
  "signatures": [
    {
      "$type": "com.atproto.repo.strongRef",
      "uri": "at://did:plc:broker-payments-xyz/network.attested.payment.proof/3lc3syz4wec4u",
      "cid": "bafyreif4xxgb5tcoqd3ne6gqkvrulzpfnwjmcc5fsgqjdx4huswnhzbekru"
    }
  ]
}</pre>
<h3>Broker proof record</h3>
<p>The broker’s independent attestation, stored in their own repository. This is the record referenced by the second <code>strongRef</code> in the examples above.</p>
<pre>{
  "$type": "network.attested.payment.proof",
  "cid": "bafyreih7wwfa3tcoqd2ne5gqkvrulzpfnwjmcc5fsgqjdx4huswnhzaehqu"
}</pre>
<h3>Verification flow</h3>
<p>How an application verifies a one-time payment with dual attestation:</p>
