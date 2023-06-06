# Type - A Modern Typing Test

**Type** is a full-stack web application for testing your typing speed and accuracy. With an intuitive and minimalistic interface, Type. offers a natural typing experience, providing real-time feedback on your typing speed and accuracy. The application includes an account system for saving your typing speed history and user-configurable features such as themes.

### Note: This repo contains code for the frontend of the site, [backend](https://github.com/Rohith-JN/type-backend)

![Web 1920 – 1](https://github.com/Rohith-JN/type/assets/78314165/3b85bfb1-6bb2-4b0a-be96-27698f9eaa1e)

## Project Structure

```
components
   |-- account
   |   |-- AccountChart.tsx
   |   |-- Login.tsx
   |   |-- Signup.tsx
   |-- index
   |   |-- Footer.tsx
   |   |-- Header.tsx
   |   |-- Option.tsx
   |   |-- ResultChart.tsx
   |   |-- Test.tsx
   |-- other
   |   |-- ConditionalRenderer.tsx
   |   |-- Error.tsx
   |   |-- Layout.tsx
   |   |-- Loader.tsx
   |   |-- NavOption.tsx
   |   |-- Navbar.tsx
   |   |-- Palette.tsx
context
   |-- actions.ts
   |-- reducer.ts
   |-- store.ts
   |-- state.ts
   reducers
   |   |-- preferenceReducer.ts
   |   |-- resultReducer.ts
   |   |-- timerReducer.ts
   |   |-- wordReducer.ts
firebase
   |-- auth.js
   |-- firebaseClient.js
   |-- useFirebaseAuth.js
generated
   |-- fragment-masking.ts
   |-- gql.ts
   |-- graphql.ts
   |-- index.ts
graphql
   |-- mutations
   |   |-- createTest.graphql
   |   |-- register.graphql
   |   |-- validate.graphql
   |-- queries
   |   |-- leaderboard.graphql
   |   |-- test.graphql
   |   |-- tests.graphql
   |   |-- userStats.graphql
hooks
   |-- useLocalStorage.ts
   |-- useCalculateChartStats.ts
   |-- useCalculateStats.ts
   |-- usePaginatedTestsQuery.ts
   |-- useOnClickOutside.ts
pages
   |-- _app.tsx
   |-- _error.tsx
   |-- account.tsx
   |-- index.tsx
   |-- leaderboard.tsx
public
   |-- favicon.ico
   |-- fonts
   |   |-- LexendDeca-Regular.ttf
   |-- vercel.svg
   |-- english.json 
styles
   |-- Account.module.css
   |-- Footer.module.css
   |-- Header.module.css
   |-- Leaderboard.module.css
   |-- Loader.module.css
   |-- Login.module.css
   |-- Navbar.module.css
   |-- Palette.module.css
   |-- Signup.module.css
   |-- Test.css
   |-- globals.css
tsconfig.json
utils
   |-- constants.ts
   |-- createUrqlClient.ts
   |-- customToast.ts
   |-- getTheme.ts
   |-- test.ts
   |-- utils.ts
.env.example
.env.local
.eslintrc.json
.gitignore
.prettierrc
codegen.ts
next.config.js
package-lock.json
package.json
README.md
```

## Setup Project Locally

If you want to test the site locally follow these steps:

**Frontend:**

1) Fork the repository to your GitHub account.
2) Git clone the repo
3) Setup a new project on Firebase
4) Enable authentication in Firebase
5) Enable Email/Password provider
6) Create a `.env.local` file 
7) Copy the variables from `.env.example` file onto `.env.local` file
8) Copy Firebase credentials onto the corresponding values in the `.env.local` file
9) Set the backend PORT of your choice in .env.local `NEXT_PUBLIC_BACKEND_URL` and in `codegen.ts` or stick with the default PORT `4000`
10) Run `npm install`
11) You have successfully setup the Frontend

**Backend**

1) Fork the repository to your GitHub account.
2) Git clone the repo
3) Create a `.env` file 
4) Copy the variables from `.env.example` file onto .env file
5) Set the backend PORT of your choice in .env PORT or stick with the default PORT `4000`
6) Setup PostgreSQL in your machine
7) Import migration: `migration1684564075219` into `src/data-source.ts` add it to `migrations` 
8) Run `npm run migration:run` this will setup the tables in postgres
9) Run `npm install`
10) You have successfully setup the Backend

## Technologies Used
Type is built using a range of modern web technologies, including:

## Frontend

1) React.js
2) Next.js
3) TypeScript
4) Redux
5) Firebase
  
## Backend

1) Node.js
2) Express.js
3) GraphQL
4) URQL
5) TypeORM
6) PostgreSQL
7) Docker

## Contributing

If you would like to contribute to Type, you can follow these steps:

1) Fork the repository to your GitHub account.
2) Create a new branch for your changes.
3) Make your changes and test them locally.
4) Push your changes to your forked repository.
5) Create a pull request with a detailed description of your changes and why they are necessary.
