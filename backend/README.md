# Express API Starter

How to use this template:

```sh
npx create-express-api --directory my-api-name
```

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm test
```

## Development

```
npm run dev
```


Express project basic commands

1.npm install express
2.npm init -y
3.
Nodemon as a local dependency: # npm install -g nodemon to install globally
# Inside your project folder
npm install --save-dev nodemon
# to run  server using Nodemon locally:
npx nodemon index.js

4.
Jest as a local dependency:
# Inside your project folder
npm install --save-dev jest
# run Jest using the local installation:
npx jest
# add inside script in package JSON

"test": "jest"

# SuperTest library facilitate sending HTTP requests and testing responses.

Install the libraries
npm install jest supertest --save-dev

5.
Install a ESLint npm init @eslint/config 

6.
Create a `.env` file for storing the connection information add a `.gitignore` at the same time with an entry to ignore the file.

    PORT=5050

Install dotenv to read the file
npm install dotenv --save

7.Add script to run nodemon inside package.json
"dev": "nodemon index.js",

8.To run the project
 npm run dev

9. npm run test

