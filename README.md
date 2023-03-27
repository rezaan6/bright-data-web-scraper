# Bright Data Web Scraper

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Features](#features-wait-until-gifs-load)
- [Bright Data API](#bright-data-api)
- [Database Structure](#database-structure)
    - [Firebase](#mfirebase)
- [Format Configuration](#format-configuration)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)

## Description

An Amazon Web scraper application done using nextjs and firebase functions, intergrated to the Bright Data API. When a search is prompted the application send an API request
to the Bright data to which it scraps the data from the store and send the response as json object. Where it's then shows in the web application so that
users can click on the container to then redirect them to a link in the amazon store. This is also using real time firestore database and webhooks which is how
the trigger to made when the scrapping is completed, making it independant, giving the user the ability to search and even refresh the page while still maintaining the
synced state.


## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [Vercel](https://vercel.com/docs)
- [TailwindCSS](https://tailwindcss.com/)
- [Nextjs](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Firebase Functions](https://firebase.google.com/docs/functions)
- [React Spin Kit](https://www.npmjs.com/package/react-spinkit)
- [React Hot Toast](https://react-hot-toast.com/)
- [Bright Data](https://brightdata.com/)

## Features (wait until GIFs load)

- View list of products

- View list of searches

- Responsive layout

- Independed Action, can refresh the page and still have the real time state

- Delete record

- Click to go to the link

- Loading Spinner, React spint kit

- Toast Notification, React hot toast





## Bright Data API
- `activateScraper`

When a Search query is added, the input is then queued to the bright data web scraper, triggering the scraper.

```
  const { search } = await req.json();
    const response = await fetch(
      `https://api.brightdata.com/dca/trigger?collector=c_lewyqo3w1aaxnzuo1h&queue_next=1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search,
        }),
      }
    );

```

- `FireBase Function`
does a endless loop of getting the result for the bright data record by ID when its complete,

```

  const res = await fetch(`https://api.brightdata.com/dca/dataset?id=${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${api_key}`,
    },
  });

```

## Database Structure

### Firebase
```
.collection("searches").doc(collection_id).set({
      search,
      start_eta,
      status,
      updatedAt,
      result,
    });
  
```

## Format Configuration
```

{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true
}

```

## Folder Structure
```
.
|-- client
|   |-- README.md        
|   |-- firebase.ts      
|   |-- firebaseAdmin.ts 
|   |-- next-env.d.ts    
|   |-- next.config.js   
|   |-- package.json     
|   |-- postcss.config.js
|   |-- public
|   |   |-- next.svg
|   |   |-- thirteen.svg      
|   |   `-- vercel.svg        
|   |-- serviceAccountKey.json
|   |-- src
|   |   |-- app
|   |   |   |-- api
|   |   |   |   `-- activateScraper
|   |   |   |       `-- route.ts
|   |   |   |-- favicon.ico
|   |   |   |-- layout.tsx
|   |   |   |-- page.tsx
|   |   |   `-- search
|   |   |       `-- [id]
|   |   |           `-- page.tsx
|   |   |-- components
|   |   |   |-- ClientProvider.tsx
|   |   |   |-- Header.tsx
|   |   |   |-- Results.tsx
|   |   |   |-- Sidebar.tsx
|   |   |   `-- SidebarRow.tsx
|   |   `-- styles
|   |       `-- globals.css
|   |-- tailwind.config.js
|   |-- tsconfig.json
|   |-- typing.d.ts
|   |-- yarn-error.log
|   `-- yarn.lock
`-- server
    |-- firebase.json
    `-- functions
        |-- lib
        |   |-- firebaseAdmin.js
        |   |-- firebaseAdmin.js.map
        |   |-- index.js
        |   `-- index.js.map
        |-- package.json
        |-- serviceAccountKey.json
        |-- src
        |   |-- firebaseAdmin.ts
        |   `-- index.ts
        |-- tsconfig.json
        `-- ui-debug.log

```

## Environment Variables

- Generate the service key from firebase and use the link to format it [Text Fixer](https://www.textfixer.com/tools/remove-line-breaks.php)
, once that is done add it as a value. The JSON format has be added to the "server/functions" folder as well.
```
FIREBASE_SERVICE_ACCOUNT_KEY= 
```

- Generate it under the Account setting -> API Token section. This should be for "/client" and "server/functions".
```
BRIGHTDATA_API_KEY=
```
