---
title: Self-hosting TinaCMS with Vercel KV
date: '2023-06-30T04:00:00.000Z'
last_edited: '2023-07-07T04:00:00.000Z'
author: Kelly Davis
prev: content/blog/self-hosted-datalayer.md
---

Earlier this year, we [released](/blog/self-hosted-datalayer/ "released") the first iteration of self-hosted TinaCMS. The initial [demo](https://github.com/tinacms/tina-self-hosted-demo/tree/274c0d9ee004629ff0cef2539b56c88324abd8f8) relied on Tina Cloud for auth and used MongoDB for the [Data Layer](/blog/self-hosted-datalayer/). That was the first step in helping our users avoid vendor lock-in, but there were limitations, such as requiring a custom auth implementation when not using Tina Cloud and requiring MongoDB for the Data Layer.

Since then, we've been hard at work on improving our self-hosted offering to make it easier to get started and less dependent on other vendor services (including our own). Today we are excited to announce the next iteration of self-hosted Tina, leveraging [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for the Data Layer and a built-in auth solution based on [Auth.js](https://authjs.dev/). It is now possible for a developer to setup a fully functioning [Next.js](https://nextjs.org/) site running TinaCMS relying on only GitHub for source control and Vercel for hosting, auth, and data management.

## What is Vercel KV?

Vercel KV is a durable Redis database that enables you to store and retrieve JSON data and is available on both hobby (free) and paid plans. The service is provided in partnership with [Upstash](https://upstash.com/about) and does not require a separate Upstash account. Because of it's flexibility and performance, Vercel KV is a great fit for powering the self-hosted TinaCMS Data Layer.

## Using Vercel KV in the TinaCMS Data Layer

When you build your site with TinaCMS, the ultimate source of truth is your Markdown files. Features like sorting and filtering of content during editing, though, require a Data Layer on top of those Markdown files. TinaCMS has incorporated an open source library called [LevelDB](https://tina.io/blog/Tina-CMS--Leveljs/) to provide an additional layer of abstraction between TinaCMS's Data Layer and the underlying database implementation. By leveraging LevelDB in the Data Layer, virtually any database can be adapted for use with TinaCMS. To enable Vercel KV to work with TinaCMS, we have implemented a new Upstash Redis LevelDB [library](https://www.npmjs.com/package/upstash-redis-level). This provides all the data functionality needed by TinaCMS entirely within the Vercel ecosystem.

## Self-hosted auth in TinaCMS

Tina Cloud provides organization and project-level user & role management, but we recognize that every project has its own specific authentication and authorization requirements. TinaCMS already provides built-in support for custom auth solutions that can be adapted to a wide variety of situations. The latest iteration of self-hosted TinaCMS takes this a step further by integrating with [Auth.js](https://authjs.dev/) and providing a built-in collection-backed auth solution. This makes it possible to launch a self-hosted site without any additional customization for authentication and authorization. Additionally, by leveraging Auth.js, any of the available auth providers [offered by the framework](https://next-auth.js.org/providers/) (e.g Github, Twitter, Google, etc...) can easily be integrated with TinaCMS.

## Does self-hosted Tina require Next.js / Vercel?

While our self-hosted Next.js demo provides an easy way to get started self-hosting using Vercel, self-hosted Tina does not require Vercel and can be used with any framework that is supported by Tina. The main consideration when self-hosting is the backend API which provides the GraphQL and auth endpoints. The backend API can be hosted on any platform that supports Express request handlers, including AWS, Google Cloud, and Netlify.

## Is the Tina Data Layer open-source?

Yes, TinaCMS is now fully open-source under the Apache 2.0 license.

## Future Plans

Repo-based media is not currently available for self-hosted TinaCMS. We currently recommend one of our other media manager solutions when self-hosting, such as Cloudinary, AWS S3 or Digital Oceans. This is something that we are exploring and hope to make available. Additionally our search capability currently requires Tina Cloud but is something we expect to add soon to self-hosting.

## Getting Started

Visit the self-hosted [docs](/docs/self-hosted/starters/nextjs-vercel/) and click the Deploy button to launch the self-hosted starter template on Vercel.
