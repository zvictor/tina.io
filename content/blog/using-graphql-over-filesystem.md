---
title: Limitations of using the filesystem for web content and how Tina's GraphQL API solves this
date: '2021-04-22T10:00:00.000Z'
draft: true
author: Jeff See
---

- The power of Git
- The limitations of the Git-based CMS
  - Relationships: it's complicated.
- The Power of GraphQL
- Mixing best of both worlds
- Example / Demo
- Conclusion

---

## The Power of Git and the filesystem

Using the filesystem for website content has been a mainstay of the web development ecosystem for years. Static Site Generator frameworks like Hugo and Jekyll made it easier to work with and the strategy was popularized in the JavaScript world with projects like 11ty and Gatsby's filesystem data source. The confidence you get when you can ship your entire website in one fell swoop and roll anything back with thanks to Git has made this a popular and efficient way to get things done.

### Limitations of using the filesystem as content for your website

On the other hand, the open nature of using files for content can lead to headaches. Content Management Systems (CMS) have always provided confidence in another way - the knowledge that your content's shape won't change out from underneath you. The scary (and powerful) thing about using the filesystem is that there's no layer between you and the raw data. It's a trade-off that has many valid use-cases, but nevertheless a significant tradeoff from a proper CMS.

Let's look at an example:

### Relationships: it's complicated

Let's say you have a blog post, it has a `title`, `image`, `author`, and of course, a `body`. You decide to store it in a `markdown` file:

```md
---
title: Vote For Pedro
image: /path/to/my-image.jpg
author: Napolean
---

You should really vote for Pedro
```

Your site is growing, and `Napolean` is writing more and more blog posts, things are good! Your boss comes to you and says you need to "jazz it up". We want to know more about this Napolean character. Let's include his role next to his name. Being the astute developer that you are, you decide to nest that information in the `author` metadata field, that way you can just pass the entire `author` shape into your component in your website. Great:

```md
---
title: Vote For Pedro
image: /path/to/my-image.jpg
author:
  name: Napolean
  role: Llama Caretaker
---

You should really vote for Pedro
```

A few months go by and Napolean is crushing it with the blog posts, your site is growing and you decide it's time for a promotion - you'll need to make sure his new role is reflected on all of the blog posts, but by this time he's written a dozen of them so you need to step through each one to make the update. Wouldn't it be great if you could update that value in one place and have it populate everywhere Napolean has written?

Let's build a separate file entirely that houses Napolean's information. So now a blog post looks like this (`author` is pointing to the location of the Napolean file):

```md
---
title: Vote For Pedro
image: /path/to/my-image.jpg
author: /path/to/authors/napolean.md
---

You should really vote for Pedro
```

And in `/path/to/authors/napolean.md` we have Napolean with his new role:

```md
---
name: Napolean
role: Interpretive Dancer
---
```

Future updates to the author only need to happen in one place, but with this change we have a couple of new problems. When you go to render the webpage, you'll need to fetch the "Vote for Pedro" blog post, and then you'll need to grab the path to the author from that data and fetch the "author" information. You removed tedious work from the editing experience, but added complexity for the developer experience. Still, it seems like a worthwhile tradeoff, things are working. Your site is easier to for editors to maintain. You take a well-deserved break.

While you were out, someone came along and deleted the `napolean.md` file, they were working on a separate part of the app and didn't know that it was being refenced in the `blog post` section. Remember what we said earlier:

> The scary (and powerful) thing about using the filesystem is that there's no layer between you and the raw data.

So when it came time to render the blog post section, we looked up that `author` and attempted to fetch that data... oops, our site broke. Luckily for us, we can roll things back to retrieve `napolean.md` since we're using Git. But wouldn't it have been nice if there was something in place to tell us that we'd just broken a reference? Turns out that whole "relational database" idea wasn't too bad, after all.

This "simple" file-based website has a few rough edges now:

- When we're editing content we need to make changes in multiple files. This sometimes results in less work but it's not very clear which parts of your file represent references to other documents.
- We need to resolve the data for our website across multiple documents, and make sure when something is deleted (ie. an author document), it doesn't have a cascading effect of breaking documents that rely on it (ie. a blog post).

It sounds like we need something between our filesystem and our website which knows about these kinds of things...

## The abstraction layer

Today we're introducing a tool which marries the power of a headless CMS with the convenience and portability of Git-backed content. Instead of querying the filesystem directly, you query a GraphQL API which provides the data integrity you'll inevitably need as your site's complexity grows.

The Tina GraphQL API can be run as a CLI command on your machine, sourcing content from your local filesystem. But it's also available via our Tina Cloud API, which sources content from your Github repo. Together we're able to provide a powerful development and content-modeling experience that gives you the best of both worlds.

### How does it work?

In order to know what the shape of your content is, you need to tell us. This explicit step is key to our understanding of your content system as a whole. So let's see what it looks like.

We said earlier that our blog post should have a `title`, `image`, `author`, and `body`. And as we took things further we realized we wanted the `author` to live in a separate document, and that it should store a `name` and `role`. With Tina Cloud, you define this structure like so:

```ts
// in `.tina/schema.ts`
import { defineSchema } from 'tina-graphql-gateway-cli'

defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: 'content/posts',
      templates: [
        {
          label: 'Simple Blog Post Template',
          name: 'simple_post',
          fields: [
            {
              label: 'Title',
              type: 'text',
              name: 'title',
            },
            {
              label: 'Author',
              type: 'reference',
              name: 'author',
              collection: 'authors',
            },
            {
              label: 'Body',
              type: 'textarea',
              name: 'body',
            },
          ],
        },
      ],
    },
    {
      label: 'Authors',
      name: 'authors',
      path: 'content/authors',
      templates: [
        {
          label: 'Author Template',
          name: 'author',
          fields: [
            {
              label: 'Name',
              type: 'text',
              name: 'name',
            },
            {
              label: 'Role',
              type: 'select',
              name: 'arole',
              options: ['Llama Caretaker', 'Interpretive Dancer'],
            },
          ],
        },
      ],
    },
  ],
})
```

Get things started with the CLI:

```
yarn tina-gql server:start
```

Now the work for fetching your `post` and it's related `author` is simple:

```graphql
query BlogPost($relativePath: String!) {
  getPostsDocument(relativePath: $relativePath) {
    data {
      ... on BlogPost_Doc_Data {
        title
        author {
          data {
            ... on Author_Doc_Data {
              name
              role
            }
          }
        }
        body
      }
    }
  }
}
```

This query works the same regardless of whether your running it locally or via the Tina Cloud API.

## FAQ

### What frameworks are supported?

For now we're sticking to some heavy constraints, we only recommend using this API for Next.js projects which are built statically with `getStaticProps`.

While we'll support a full "headless CMS" in the near future, we're still optimizing our cloud-based service - so until then we're only supporting requests which are authenticated via OAuth, this means you can still edit content from your hosted website, but serving it to unauthenticated routes can only be done by rebuilding your site.

### GraphQL for the Filesystem? How is this different from Gatsby's Filesystem plugin?

With Gatsby you query the filesystem through GraphQL, this gives you some pretty powerful features but it doesn't have the same concept of definining a schema. In reality this is much closer to our solution with [Forestry CMS](https://forstry.io), it's just as if we'd made a headless CMS on top of it.

## How does this relate to the Tina ecosystem?

A nice side-effect of knowing all about your content schema is that we know exactly how it should be mutated as well. So while the topic of this post was more about the GraphQL API itself, we fully support autogenerated Tina forms which can be edited locally or via the Tina Cloud API.

> Tina Cloud is currently open to a limited set of Next.js projects, [sign up](https://tina.io/early-access/) for early access to get into the private beta.

## Roadmap

**Pagination and Filtering** - Currently the API has some limitations with regard to supporting the full API we'd like to provide. Specifically, we're working on a rich filtering and pagination API, so until that's finished the API features a very limited "list" query.

**Reverse** **Relationships -** In the near future it'll be possible to query a document _through_ it's dependency. So if a `post` belongs to an `author` - you will soon be able to query all of the `author`'s `posts`.

**Performance** - If you consume the GraphQL API from Tina Cloud, you may notice it's a little slow. We're working on supporting a git-based database solution which will performantly let you bounce between branches and treat it the same as you would locally. To that end, we recommend only consuming the Content API in Tina's edit mode.

**Primive types** - Right now the `defineSchema` function supports various types which are loosely based on [TinaCMS fields](https://tina.io/docs/plugins/fields/) - we have plans to provide a smaller, but more expresive, API which will be more composable. Please chime in to the [RFC](https://github.com/tinacms/rfcs/pull/18) for any input!

## Demo

## Conclusion
