---
author: Ethan McCue
cover_image: null
date: '2026-04-02T01:46:08.108Z'
dateFolder: 2026/04/01
description: >-
  There is a set of things that you can do when working with a Postgres database
  which I have found made my and my coworker's lives much more pleasant.
isBasedOn: 'https://mccue.dev/pages/3-11-25-life-altering-postgresql-patterns'
link: 'https://mccue.dev/pages/3-11-25-life-altering-postgresql-patterns'
slug: 2026-04-01-httpsmccuedevpages3-11-25-life-altering-postgresql-patterns
tags:
  - code
title: Life Altering Postgresql Patterns
---
<p>Believe it or not, I don't think that title is clickbait.</p>
<p>There is a set of things that you can do when working with a Postgres database which I have found made my and my coworker's lives much more pleasant. Each one is by itself small, but in aggregate have a noticeable effect.</p>
<h2>Use UUID primary keys</h2>
<p>UUIDs have downsides</p>
<ul> <li>Truly random UUIDs doesn't sort well (and this has implications for indexes)</li> <li>They take up more space than sequential ids (space being your cheapest resource)</li> </ul>
<p>But I've found those to be far outweighed by the upsides</p>
<ul> <li>You don't need to coordinate with the database to produce one.</li> <li>They are safe to share externally.</li> </ul>
<pre><code>CREATE TABLE person(
    id uuid not null default gen_random_uuid() primary key,
    name text not null
)</code></pre>
<h2>Give everything created_at and updated_at</h2>
<p>It's not a full history, but knowing when a record was created or last changed is a useful breadcrumb when debugging. Its also something you can't retroactively get unless you were recording it.</p>
<p>So just always slap a <code>created_at</code> and <code>updated_at</code> on your tables. You can maintain <code>updated_at</code> automatically with a trigger.</p>
<pre><code>CREATE TABLE person(
    id uuid not null default gen_random_uuid() primary key,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    name text not null
);

CREATE FUNCTION set_current_timestamp_updated_at()
    RETURNS TRIGGER AS $$
DECLARE
_new record;
BEGIN
  _new := NEW;
  _new."updated_at" = now();
RETURN _new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_person_updated_at
    BEFORE UPDATE ON person
    FOR EACH ROW
    EXECUTE PROCEDURE set_current_timestamp_updated_at();</code></pre>
<p>You need to create the trigger for each table, but you only need to create the function once.</p>
<h2>on update <strong>restrict</strong> on delete <strong>restrict</strong></h2>
<p>When you make a foreign key constraint on a table, always mark it with <code>on update restrict on delete restrict</code>.</p>
<p>This makes it so that if you try and delete the referenced row you will get an error. Storage is cheap, recovering data is a nightmare. Better to error than do something like <code>cascade</code>.</p>
<pre><code>CREATE TABLE person(
    id uuid not null default gen_random_uuid() primary key,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    name text not null
);

CREATE TABLE pet(
    id uuid not null default gen_random_uuid() primary key,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    name text not null,
    owner_id uuid not null references person(id)
                on update restrict
                on delete restrict
);</code></pre>
<h2>Use schemas</h2>
<p>By default, every table in Postgres will go into the "<code>public</code>" schema. This is <em>fine</em>, but you are missing out if you don't take advantage of your ability to make new schemas.</p>
<p>Schemas work as namespaces for tables and for any moderate to large app you are going to have a lot of tables. You can do joins and have relationships between tables in different schemas so there isn't much of a downside.</p>
<h2>Enum Tables</h2>
<p>There are a lot of ways to make "enums" in sql. One is to use the actual "<a href="https://www.postgresql.org/docs/current/datatype-enum.html">enum types</a>," another is to use a <a href="https://www.postgresql.org/docs/current/ddl-constraints.html">check constraint</a>.</p>
<p>The pattern introduced to me <a href="https://hasura.io/">by Hasura</a> was enum tables.</p>
<p>Have a table with some <code>text</code> value as a primary key and make columns in other tables reference it with a foreign key.</p>
<p>This way you can insert into a table to add more allowed values or attach metadata like a comment to explain what each value means.</p>
<h2>Name your tables singularly</h2>
<p>This isn't even Postgres specific, just please name your tables using the singular form of a noun.</p>
<p><code>SELECT * FROM pets</code> might seem nicer than <code>SELECT * FROM pet</code> but the moment you start doing anything more interesting with your queries you will notice that your queries are actually working in terms of individual rows.</p>
<p>The deeper you dig the more annoying edge cases you'll run into with plural table names. Just name your tables the same as what an individual row in that table represents.</p>
<h2>Mechanically name join tables</h2>
<p>Sometimes there are sensible names to give "join tables" - tables which form the basis for "many to many" relationships between data - but often there isn't. In those cases don't hesitate to just concatenate the names of the tables you are joining between.</p>
<h2>Almost always soft delete</h2>
<p>I will reiterate that storage is cheap and recovering data is a nightmare.</p>
<p>If you have some domain specific need to delete (or otherwise mark as irrelevant) some data, use a nullable <code>timestamptz</code> column. If there is a timestamp filled in, that's when it was deleted. If there is no timestamp it isn't deleted yet.</p>
<p>Even outside the context of a soft delete, timestamps are usually more useful than a boolean. If you want to know whether something happened, you generally also want to know when it happened.</p>
<h2>Represent statuses as a log</h2>
<p>It is very tempting to represent the status of something as a single column. You submit some paperwork and it has a <code>status</code> of <code>submitted</code>. Someone starts to look at it then it transitions to <code>in_review</code>. From there maybe its <code>rejected</code> or <code>approved</code>.</p>
<p>There are two problems with this</p>
<ol> <li>You might actually care about when it was <code>approved</code>, or by whom.</li> <li>You might receive this information out-of-order.</li> </ol>
<p>Webhooks are a prime example of the 2nd situation. There's no way in the laws of physics to be sure you'll get events in exactly the right order.</p>
<p>To handle this you should have a table where each row represents the status of the thing at a given point in time. Instead of overloading <code>created_at</code> or <code>updated_at</code> for this, have an explicit <code>valid_at</code> which says when that information is valid for.</p>
<p>Just having an index on <code>valid_at</code> can work for a while, but eventually your queries will get too slow. There are a lot of ways to handle this, but the one we've found that works the best is to have an explicit <code>latest</code> column with a cheeky unique index and trigger to make sure that only the row with the newest <code>valid_at</code> is the <code>latest</code> one.</p>
<h2>Mark special rows with a <code>system_id</code></h2>
<p>It's not uncommon to end up with "special rows." By this I mean rows in a table that the rest of your system will rely on the presence of to build up behavior.</p>
<p>All rows in an enum table are like this, but you will also end up with rows in tables of otherwise normal "generated during the course of normal use" rows. For these, give them a special <code>system_id</code>.</p>
<p>Unique indexes don't mind multiple rows with null values, so you can make a unique index on this <code>system_id</code> and look up your special rows later as you need to.</p>
<h2>Use views sparingly</h2>
<p>Views are amazing and terrible.</p>
<p>They are amazing in their ability to wrap up a relatively complex or error-prone query into something that looks basically like a table.</p>
<p>They are terrible in that removing obsolete columns requires a drop and recreation, which can become a nightmare when you build views on views. The query planner also seems to have trouble seeing through them in general.</p>
<p>So do use views, but only as many as you need and be <a href="https://www.youtube.com/watch?v=CLnADKgurvc">very wary</a> of building views on views.</p>
<h2>JSON Queries</h2>
<p>You might have heard that Postgres "supports JSON." This is true, but I had mostly heard it in the context of storing and querying JSON. If you want a table with some blob of info slap a <code>jsonb</code> column on one your tables.</p>
<p>That is neat, but I've gotten way more mileage out of using JSON as the result of a query. This has definite downsides like losing type information, needing to realize your results all at once, and the overhead of writing into json.</p>
<p>But the giant upside is that you can get all the information you want from the database in <strong>one trip</strong>, no cartesian product nightmares or N+1 problems in sight.</p>
<p>Which can net you something like the following.</p>
<p>You can find all the setup you'd need to do for that query <a href="https://gist.github.com/bowbahdoe/dee0a5d534d9a36c677dbf0de977b6de">here</a>. You can try it out on <a href="https://onecompiler.com/postgresql">https://onecompiler.com/postgresql</a> if setting up a local postgres is a bit much.</p>
<p>If there is something I missed or got wrong, tell me very loudly in person or here on the internet.</p>
<h4><a href="https://mccue.dev/">&lt;- Index</a></h4>
