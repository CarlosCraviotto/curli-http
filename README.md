# curli-http

[![Build Status](https://travis-ci.org/CarlosCraviotto/curli-http.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/curli-http)
[![Coverage Status](https://coveralls.io/repos/github/CarlosCraviotto/curli-http/badge.svg?branch=master&cach=ff)](https://coveralls.io/github/CarlosCraviotto/curli-http?branch=master)


A Http layer on Express without decorators.

### Motivation
There are a lot of Http libraries for JavaScript/Typescript out there, this is not new.  The one thing we're trying to achieve here is the ability to take advantage of such a library but without coupling it into the application's domain. The main goal here is to create a library that you can use without using third part code into your domains.

### Installation

Install by `npm`

```sh
npm install --save curli-http
```
#### Basic Usage

```typescript
import {RouterService} from "curli-http";
import {UserController} from "./Controllers";

const container = new DependencyInjection();

const routerService = new RouterService(expressApp, container);

routerService.addControllerClass(UserController);

```



### Commands

 - `npm run build`: Build the project (dependency injection).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.





### Contributing

When submitting your pull-request try to follow those guides:

- https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
- https://medium.com/@vadimdemedes/making-your-first-contribution-de6576ddb190



### License

MIT