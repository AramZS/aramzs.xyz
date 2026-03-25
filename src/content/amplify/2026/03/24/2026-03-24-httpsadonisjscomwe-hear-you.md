---
author: adonisjs.com
cover_image: 'https://adonisjs.com/assets/we-hear-you-DMwqReAR.jpg'
date: '2026-03-24T13:15:54.071Z'
dateFolder: 2026/03/24
description: >-
  Every year, the State of JavaScript survey asks developers what's broken.
  Every year, the same pain points rise to the top.
isBasedOn: 'https://adonisjs.com/we-hear-you'
link: 'https://adonisjs.com/we-hear-you'
slug: 2026-03-24-httpsadonisjscomwe-hear-you
tags:
  - code
title: 'JavaScript Devs, We Hear You'
---
<p> State of JavaScript 2025  </p>
<p>Every year, the State of JavaScript survey asks developers what's broken. Every year, the same pain points rise to the top.</p>
<p><a href="https://2025.stateofjs.com/en-US/libraries/back-end-frameworks/#back_end_frameworks_pain_points">   Back-end Frameworks Pain Points reported by users </a></p>
<p>We've stared at lists like this for a decade. And here's what we've realized, most of these aren't tooling problems. They're <strong>cohesion problems</strong>.</p>
<p>The JavaScript ecosystem has world-class tools. Best-in-class ORMs. Blazing-fast routers. Type-safe validators. Flexible auth libraries. The problem is, they were never designed to work together.</p>
<p>It's like IKEA furniture from five different collections. Every piece is beautifully engineered. But nothing fits. You spend hours shimming, adapting, writing glue code. And the result still creaks.</p>
<p>Some frameworks got type safety right, but left out features. Some have features, but feel like enterprise ceremony. There are excellent auth libraries, but they need excessive plumbing.</p>
<p> Checkpoint 1 — Type Safety </p>
<h2> Type safety is easy when you own the entire stack. </h2>
<p>When one team designs the router, the validator, the ORM, the mailer, the test client, they can make sure types flow through all of them. No adapters. No type gymnastics. No <strong>as unknown as Whatever</strong></p>
<p>That's the advantage of cohesion. AdonisJS doesn't just support TypeScript, it was rewritten from the ground up in 2020 with types at the core of every design decision.</p>
<p>Access a variable that doesn't exist or misspell the key, and TypeScript catches it before you run the app.</p>
<p>Define your validation schema once. The validated output is automatically typed to match, with no manual interface definitions.</p>
<pre><code>const schema = vine.object({
title: vine.string(),
tags: vine.array(vine.string())
})

const data = await request.validateUsing(schema)</code></pre>
<p>Events are registered with their payload types. Emit an event that doesn't exist or pass the wrong shape, and you get a compile error.</p>
<p>Redirect to a named route. If the route doesn't exist or you pass the wrong parameters, TypeScript tells you immediately.</p>
<p>Test your endpoints with a typed HTTP client. Request bodies, responses, and status codes are all checked at compile time.</p>
<pre><code>const response = await client
  .visit('users.store')
  .json({
fullName: 'Harminder Virk',
email: 'foo@adonisjs.com',
password: 'secret'
  })

response.body()response.assertStatus(200)
response.assertBodyContains({ id: 1 })</code></pre>
<p>Define how your models transform to JSON. The serialized shape becomes a type you can use on the frontend.</p>
<pre><code>// BACKEND
class UsersController {
show() {
    return UserTransformer.transform(user)
  }
}

// FRONTEND
// Reference transformers data as generated types
import type { Data } from '@generated/types'

type User = Data.User</code></pre>
<p>Generate a fully typed client from your routes. Plug it into TanStack Query, SWR, or use it directly. End-to-end type safety.</p>
<pre><code>// Direct fetch call
const user = await client.api.users.show({
params: { id: 1 },
query: { include: 'posts' }
})
user const user: {
  id: number;
  name: string;
  email: string;
  posts: {
    id: number;
    title: string;
    content: string;
  }[];
}<br/>
// TanStack integration
const { data } = useQuery(
api.users.show.queryOptions({ id })
)</code></pre>
<p> Checkpoint 2 — Authentication </p>
<h2> Authentication without the plumbing. </h2>
<p>Authentication isn't hard. We know how to hash passwords, manage sessions, issue tokens, and protect routes.</p>
<p>What's hard is the wiring. You pick an auth library. It needs an adapter for your ORM. The session store needs to work with your HTTP framework. The user object shape doesn't match your model. You write glue code. Then more glue code. A week passes.</p>
<p>In a cohesive system, this disappears.</p>
<pre><code>npm i @adonisjs/auth
node ace configure @adonisjs/auth

# ❯ Select authentication guard
#   › Session (for web apps)
#     Access Tokens (for APIs)
#
# ❯ Select user provider
#   › Lucid (database)
#
# ✓ Created config/auth.ts
# ✓ Updated app/models/user.ts
# ✓ Registered auth middleware</code></pre>
<p> Checkpoint 3 — Simplicity </p>
<h2> Simple code that stays simple. </h2>
<p>Structure shouldn't require ceremony. You don't need decorators on every method, module registration files, or an IoC container on your face just to wire up a controller.</p>
<p>AdonisJS code reads as simple as Hono or Express, but with the structure and features of a full-stack framework.</p>
<pre><code>import { Job } from '@adonisjs/queue'

type ProcessPaymentPayload = {
  orderId: number
  amount: number
  currency: string
}

export default class ProcessPayment extends Job&lt;ProcessPaymentPayload&gt; {
  async execute() {
    const { orderId, amount, currency } = this.payload
    // process payment
  }
}</code></pre>
<pre><code>import ProcessPayment from '#jobs/process_payment'

export default class OrdersController {
  async store({ request, response }: HttpContext) {
    const order = await Order.create(request.body())

    await ProcessPayment.dispatch({
      orderId: order.id,
      amount: order.total,
      currency: 'USD',
    })

    return response.created(order)
  }
}</code></pre>
<pre><code>import User from '#models/user'
import { BaseMail } from '@adonisjs/mail'
import { urlFor } from '@adonisjs/core/services/url_builder'

export default class VerifyEmailNotification extends BaseMail {
  from = 'noreply@example.com'
  subject = 'Please verify your email address'

  constructor(private user: User) {
    super()
  }

  prepare() {
    const verifyUrl = urlFor('email.verify', {
      token: this.user.verificationToken,
    })

    this.message
      .to(this.user.email)
      .htmlView('emails/verify_email', {
        user: this.user,
        verifyUrl,
      })
  }
}</code></pre>
<pre><code>import User from '#models/user'
import WeeklyDigest from '#mails/weekly_digest'
import mail from '@adonisjs/mail/services/main'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class SendWeeklyDigest extends BaseCommand {
  static commandName = 'digest:send'
  static description = 'Send weekly digest to all subscribed users'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const users = await User.query().where('digestEnabled', true)

    for (const user of users) {
      await mail.send(new WeeklyDigest(user))
      this.logger.info(`Sent digest to ${user.email}`)
    }

    this.logger.success(`Sent ${users.length} digests`)
  }
}</code></pre>
<p> Checkpoint 4 — Ecosystem </p>
<h2> The ecosystem around the framework. </h2>
<p>A framework is only as good as what surrounds it. Documentation you can actually learn from. Tooling that doesn't fight you. A community that's been building with it for years.</p>
<p> Documentation  </p>
<p> Adocasts  </p>
<p> ESM-first  </p>
<p> Modern tooling  </p>
<p> Packages  </p>
<h2> Let's do something different today. </h2>
<p>You've assembled the stack before. You've read the integration guides, wired the adapters, written the glue code. You know how that story ends.</p>
