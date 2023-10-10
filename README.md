# Tekys-FullStack-demo-with-JWT-&-socketIO

TODO:

- optimise code and need to maintain it with best practices
- react code can be improved alot in terms of typescript, hooks, redux store, context and more code reusability
- need to retrieve major keys from env variables
- proper scss preprocessors should be used
- Docker containerization
- need to run Node and React App in 1 PORT
- Unit test cases
- Lazyload for module/routes
- Eslint, Babel, Webpack

## Tech Stack

- React
- Node
- Express
- JWT Authentication
- Socket IO
- MongoDB
- Yup Validation
- Formik Form
- Lerna

## Install Dependencies

As I have used Lerna, The Project can be run from the root, If you run `yarn` or `npm install`, It will work and install dependencies as needed in either root or in individual packages(app and api)

To run the Project from the root, run the command mentioned below, It will start both packages(app and api) parallely on respective PORTS: 

Frontend: http://localhost:3000

Backend: http://localhost:8080

```bash
npm run start or yarn start
```

Note: both Frontend and Backend can be run individually by the semantic method of separately navigating to the api and app packages, installing individual dependencies by node or yarn and run the command npm run start or yarn start.

