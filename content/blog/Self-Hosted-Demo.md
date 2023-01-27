---
title: Self Hosted Demo
date: '2023-01-20T05:00:00.000Z'
author: Logan Anderson
---

# Self Hosted Demo

> Just want to see the code? You can find the example [here](# "Link to self hosted demo").

## Goal

The goal of this demo is to provide an example of how someone could self host Tina. Self hosted Tina allows you to own your own content and your own auth. We also want to provide a way to self host parts of your app. If you want to self host but still want to use Tina Cloud for authorization you can do so.

## Caveats of Self Hosting

* You must provide your own authentication (If you don't want to use Tina Cloud)
  * This means you will have to provide your own functionally for "Read only tokens" if this is something that you need in your App
* Provide and manage your own database and levelDB implementation (We have provided MongoDB LevelDB implementation that can be used)
* Provide an api endpoint (like a next.js api function)

## The Parts

### The Database File

The database is configured in **`.tina/database.{js,ts}`** .

This file is the main part of the self hosted solution. This file exports an instead of the TinaCMS Database, which handles indexing, queries and CRUD operations.

```typescript
import { createDatabase, TinaLevelClient } from '@tinacms/graphql'
import { MongodbLevel } from 'mongodb-level'
import { Octokit } from '@octokit/rest'
import { Base64 } from 'js-base64'

// Use whatever metric you want for running TinaCMS in "LocalMode"
// When in "Local Mode" a local levelDB server is used and data is saved to the file system
// When in "Production Mode" Your provided LevelDB implemetntion is used (MongoDB Level in this example) and data is saved with "onPut" and "onDelete" callback functions
const isLocal = process.env.NEXT_PUBLIC_TINA_IS_LOCAL === 'true'

if (isLocal) console.log('Running TinaCMS in local mode.')
else console.log('Running TinaCMS in production mode.')

const owner = process.env.GITHUB_OWNER as string
const repo = process.env.GITHUB_REPO as string
// Must create a personal access token
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string
const branch = process.env.GITHUB_BRANCH as string

const octokit = new Octokit({
  auth: token,
})
const localLevelStore = new TinaLevelClient()
const mongodbLevelStore = new MongodbLevel({
  collectionName: 'tinacms',
  dbName: 'tinacms',
  mongoUri: process.env.MONGODB_URI as string,
})
if (isLocal) {
  localLevelStore.openConnection()
}

// When the data is updated this function is called
const githubOnPut = async (key, value) => {
  // See example for implementation
}

// When the data is deelted this function is called
const githubOnDelete = async (key) => {
  // See example for implementation
}

export default createDatabase({
  level: isLocal ? localLevelStore : mongodbLevelStore,
  onPut: isLocal ? undefined : githubOnPut,
  onDelete: isLocal ? undefined : githubOnDelete,
})
```

#### `Level`

You must provide an [abstract-level database](https://github.com/Level/abstract-level "Abstract Level ") implementation. In our example we have used [mongodb-level ](https://github.com/tinacms/mongodb-level#readme "mongodb-level") which is a LevelDB implementation maintained by TinaCMS. You are free to use the mongodb example or make your own level implementation and use that instead.

The Database is an ephemeral cacheing layer so that when you query your content it is not necessary to retrieve it from the git provider.

#### `onPut` and `onDelete`

The onPut and onDelete functions are used to update the git repository when there are updates and deletes via TinaCMS. In our example we show how to save data to Github but feel free to swap our example for any git provider.

### Using the database on the server

Querying the database from the server works a bit different when using self hosted Tina. When using tina, you can normally use the [client](https://tina.io/docs/features/data-fetching/ "The Tina Client"). But since you are self hosting, it is likely that that the GraphQL endpoint will not be available at build time (For example, if you are using Next.js api endpoints). So when querying your content from the server it is suggestion that you use the database directly. We have created an example of what this looks like.&#x20;

##### `lib/databaseConnection.ts`&#x20;

```typescript
import database from '../.tina/database'
import { queries } from '../.tina/__generated__/types'
import { resolve } from '@tinacms/graphql'
import type { Database } from '@tinacms/graphql'
import type { TinaClient } from 'tinacms/dist/client'

export async function databaseRequest({ query, variables }) {
  const config = {
    useRelativeMedia: true,
  } as any

  const result = await resolve({
    config,
    database,
    query,
    variables,
    verbose: true,
  })

  return result
}

export function getDatabaseConnection<GenQueries = Record<string, unknown>>({
  database,
  queries,
}: {
  database: Database
  queries: (client: {
    request: TinaClient<GenQueries>['request']
  }) => GenQueries
}) {
  const request = async ({ query, variables }) => {
    const data = await databaseRequest({ query, variables, database })
    return { data: data.data as any, query, variables, errors: data.errors }
  }
  const q = queries({
    request,
  })
  return { queries: q, request }
}

export const dbConnection = getDatabaseConnection({ database, queries })
```

With this, you can use `dbConnection` just like [the client would be used](https://tina.io/docs/features/data-fetching/#making-requests-with-the-tina-client "TinaCMS Client"). It will have all the generated queries and a request function for raw GraphQL requests.

For example.

```typescript
import { dbConnection } from '../../lib/databaseConnection'

export const getStaticProps = async ({ params }) => {
  const tinaProps = await dbConnection.queries.blogPostQuery({
    relativePath: `${params.filename}.mdx`,
  })
  return {
    props: {
      ...tinaProps,
    },
  }
}
```

### The GraphQL endpoint.

When editing with TinaCMS crud operations get send to a GraphQL endpoint. Normally this is Tina Cloud but when you self host you must provide this endpoint. This example will show how this could be done in a next.js API route but it could modified to be used in any Environment. You must add your own authorization function here or you could use TinaClouds auth server if you wish.

##### `pages/api/gql.{ts,js}`

```typescript
import { databaseRequest } from '../../lib/databaseConnection'
import database from '../.tina/database'

export default async function handler(req, res) {
  // Add your own Auth here.
  // For example
  // If(!await isAuthorized(token: req.headers.authorization)){
  //   return a 401
  //  }
  const { query, variables } = req.body
  const result = await databaseRequest({ query, variables, database })
  return res.json(result)
}
```

Now you can configure this endpoint in the config.

`.tina/config.{ts,js}`

```typescript
const config = defineConfig({
  contentApiUrlOverride: '/api/gql',
  admin: {
    auth: {
      useLocalAuth: process.env.NEXT_PUBLIC_TINA_IS_LOCAL === 'true',
    }
  }
  //...
```

### Authentication&#x20;

#### Using Tina Cloud for Authentication

If you just wish to self host you'r content and you don't need to self host your authentication you can use Tina Cloud for authorization and authentication. This can be done but adding the following to your to your endpoint.

##### `pages/api/gql.{ts,js}`

```diff
import { isUserAuthorized } from "@tinacms/auth";

import { databaseRequest } from "../../lib/databaseConnection";
import createDatabase from "../../.tina/database";
const database = createDatabase();

export default async function handler(req, res) {
+  const isAuthorized = await isUserAuthorized({
+    token: req.headers.authorization,
+    clientID: "<YourClientIdFromTinaCloud>",
+  });
+  if (!isAuthorized) {
+    return res.status(401).json({ message: "Unauthorized" });
+  }

  const { query, variables } = req.body;
  const result = await databaseRequest({ query, variables, database });
  return res.json(result);
}
```

#### Self hosting your Authentication

To self host your own authentication, you must provide some functions to get your authorization.\
\
Add the following methods to your `config.{ts,js}`&#x20;

```javascript
export default defineConfig({
  contentApiUrlOverride: '/api/gql',
  admin: {
    auth: {
      customAuth: true,
      // Get token this will be called when a request and will be passed as an `Authorization` header in the format `Bearer <id_token>`
      getToken: async () => {
        return {
          id_token: 'Foo',
        }
      },
      // This is called when they want to authenticate a user. For a lot of implementations it just may be redirecting to the login page
      async authenticate() {
        console.log('Authenticating...')
        localStorage.setItem(
          'local_cache',
          JSON.stringify({ name: 'Logan', role: 'admin' })
        )
        return {}
      },
      // Called to log the user out
      async logOut() {
        console.log('logOut...')
        localStorage.removeItem('local_cache')
        window.location.href = '/'
      },
      // The CMS uses this function to get info about the user. It also uses it to see if the user is logged in. Provide a truethy value if the user is logged in and a falsy value if the user is not
      async getUser() {
        console.log('getUser...')
        const userStr = localStorage.getItem('local_cache')
        if (!userStr) {
          return undefined
        } else {
          try {
            return JSON.parse(userStr)
          } catch {
            return null
          }
        }
      },
      //...

```

Next you can use the value passed from `getToken` in your backend function to make sure the user is Authenticated.\\

`pages/api/gql.{js,ts}`

```diff
import { databaseRequest } from "../../lib/databaseConnection";
import createDatabase from "../../.tina/database";
const database = createDatabase();

export default async function handler(req, res) {
+  const isAuthorized = await myCustomIsAuthorizedFunction({
+       // This has the format of `Bearer <id_token>` 
+       token: req.headers.authorization,
+  });

+  if (!isAuthorized) {
+    return res.status(401).json({ message: "Unauthorized" });
+  }

const { query, variables } = req.body;
const result = await databaseRequest({ query, variables, database });
return res.json(result);
}
```

