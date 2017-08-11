## Meatier.JS

A more opinionated, better-fleshed-out fullstack framework for No.BS.

In addition to Node Bootstrap's isomorphic build, package management, and API,
Meatier.JS includes:

* react/redux support
  (plus utilities to eliminate redux boilerplate code)
* PostCSS
* unit testing with Jest
* Isomorphic data storage with miniMongo

### Usage

To install, type:

```
npm install -g meatierjs
```

To create a new Meatier project, type:
 
 ```
meatier my-new-project
```

This will create a new working directory with your project bootstrapped inside. To
start a development server, `cd` to your new project and enter:
 
```
yarn dev
```

When it is time to do a production build, enter:

```
yarn build
```
