# React + TypeScript + Vite

## About

Quickly done web application for taking notes.

## TODO

1. Switch to SSR. Should result in better SEO as well as performance
2. Add component and e2e tests.
3. Decrease bundle size, by offloading Modal resources for only when user needs them.
4. Add abillity to search a Note based on title, or content
5. Allow unregistered users to create notes locally, via local storages such as IndexDB or localStorage
6. Refactor inline styles where used, in favour of class based styles, to improve code readability as well as performance.
7. Overall UI and UX improvements.

## Instructions

1. Setup the backend server as per(ss)
2. Run `yarn install`
3. Run `yarn dev`
4. Go to Login page. If backend has been initiated successfully, user account should've been created with the following credentials:

```js
      email: "admin@notes-app.com",
      password: "NoteApp",
```

5. Once logged user should be automatically redirected to /dashboard page, where notes could be added,updated or deleted.
   _Note_: If logged in with the credentials above, there will be an already seeded notes for that user.
