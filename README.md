# React PWA

![Build Status](https://img.shields.io/circleci/project/github/nearform/react-pwa.svg)
![Performance](https://hackernews.nearform.com/badges/lighthouse-performance.svg)
![Progressive Web App](https://hackernews.nearform.com/badges/lighthouse-pwa.svg)
![Accessibility](https://hackernews.nearform.com/badges/lighthouse-accessibility.svg)
![Best Practices](https://hackernews.nearform.com/badges/lighthouse-best-practices.svg)
![SSO](https://hackernews.nearform.com/badges/lighthouse-seo.svg)

nf-react-pwa-badges

This project is an example of how a Progressive Web Application can be structured, using React and Node. It takes the form of a Hackernews clone, in the form of a PWA.

## Project goals

* Every page can be server-side rendered
* Client-side routing
* All static assets to be cached
* All api requests to be cached
* Offline capable

## Install

Clone this project and navigate to the `react-pwa` directory.

    git clone git@github.com:nearform/react-pwa.git
    cd react-pwa

You can then install dependencies using either Yarn or NPM.

    yarn install

    or

    npm install

## Development

To run the project locally and watch for any changes to the files use:

    yarn watch

    or

    npm run watch

This will build the project and serve it locally at `http://localhost:3000`

## Frameworks and libraries used

* [Node.js](https://nodejs.org/en/)
* [Fastify](https://www.fastify.io/)
* [React](https://reactjs.org/)
* [React Router](https://reacttraining.com/react-router/)
* [Typestyle](https://typestyle.github.io/)
* [Babel](https://babeljs.io/)
* [WebPack](https://webpack.js.org/)
* [Rollup](https://rollupjs.org/guide/en)
* [Workbox](https://developers.google.com/web/tools/workbox/)
* [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## Development

The project's source files can be found under `src`.

## Directory structure

### scripts

The scripts folder contains a helper script `lighthouse.js` that can used when performing a [Lighthouse](https://github.com/GoogleChrome/lighthouse) audit.

### src

The majority of the project's source files are found here. They are separated into `client` and `server`.

#### src/server

The Fastify server runs on port `3000` by default. Depending on the route being requested it will either return a rendered page or else act as an API to the React `client`.

Server Side Rendering is handled by the `renderPage` method in `src/page.html.jsx`. This works by generating the React application on the server side.

The server uses Fastify for both serving static assets and server-side rendering. This means the app works in situations where JavaScript may not be available. This could be search engine crawlers or even just situations where JavaScript fails or is blocked by a network.

To bootstrap the app on the client side, the application re-renders the same server side React code by passing the global `__ssrPreloading` data to the `React.hydrate` call.

##### Using HTTPS locally.

If you want to use HTTP2/HTTPS locally, create a `ssl` folder containing the `certificate.pem` and `private-key.pem` files. The server will automatically pick them up.

##### Manifest.json

The static HTML includes a reference to the file `manifest.json`. This is a settings file that tells the browser to treat the website as an application with a default start page, name, orientation and icon.

#### src/client

The `client` folder contains static images, styles and JavaScript for the React client. Styling is handled inside JS using typestyle.

The `js` folder contains two files, `sw.js` that sets up a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) and `application.jsx` that renders the React app.

The service worker is used to cache API responses so that should the internet connection be disrupted, any previously requested data will be served locally.

##### Pages

Within the context of the app, each page is represented by it's own `js/pages/[page]` file. This helps in debugging, in terms of isolating issues that might be happening within one section of the site, and can be useful when defining rules for [code splitting](https://reactjs.org/docs/code-splitting.html).

##### RouteWithData

Within the app's `containers` most of the data fetching and handling occurs within `RouteWithData`, which on the client takes care of handling asynchronous loading of the
data, while on the server receives the data as static property.

The routes are defined within `routes.js` as a series of objects for each route. This process runs either server-side or on the client-side.

## Infra

### CI / CD

This repo has its own CircleCI project attached to it: https://circleci.com/gh/nearform/react-pwa

Whenever a new commit is pushed into master, a new CircleCI build will be triggered and that build will follow the steps defined in `.circleci/config.yml`:

* it will set up its own environment, including the Docker daemon and required containers
* install the npm modules required by the app to make sure there aren't any dependency issues
* run tests (there are none written now unfortunately)
* build a Docker container based on the included `Dockerfile`
* push that container to the container registry hosted by AWS (ECR)
* trigger a deploy. This means forcing an update on the ECS service and cluster hosting the application (see below). This will force the service and cluster to re-download the Docker container defined in the ECS task (the one tagged with `latest` and that has been pushed to the registry by the above step)

### Hosting

This app is hosted on a AWS ECS Fargate cluster. This basically let's you define a task (what container to run) and a cluster to run it on, just like the clasic ECS cluster. The difference is that you do not need to define and manage EC2 instances in the cluster, it is all abstracted for you. You just need to define the resources (CPU, memory) you need and that's it.

On top of that, there is a ECS service defined, that puts together what load balancer, what cluster and task to use.

The whole thing is exposed to the Internet by using an AWS Application load balancer. It does the SSL termination using our wildcard nearform.com certificate and relays the requests to the application container running on Fargate

## Reporting issues

Please take a second to read over this before opening an issue. Providing complete information upfront will help us address any issue (and ship new features!) faster.

We greatly appreciate bug fixes, documentation improvements and new features, however when contributing a new major feature, it is a good idea to idea to first open an issue, to make sure the feature it fits with the goal of the project, so we don't waste your or our time.

## Bug Reports

A perfect bug report would have the following:

1.  Summary of the issue you are experiencing.
2.  Details on what versions of node and XZY you are using (`node -v`).
3.  A simple repeatable test case for us to run. Please try to run through it 2-3 times to ensure it is completely repeatable.

We would like to avoid issues that require a follow up questions to identify the bug. These follow ups are difficult to do unless we have a repeatable test case.

# Contributor Covenant Code of Conduct

## Our Pledge

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

## Our Standards

Examples of behavior that contributes to creating a positive environment include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a professional setting

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

## Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community. Examples of representing a project or community include using an official project e-mail address, posting via an official social media account, or acting as an appointed representative at an online or offline event. Representation of a project may be further defined and clarified by project maintainers.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at opensource@nearform.com. The project team will review and investigate all complaints, and will respond in a way that it deems appropriate to the circumstances. The project team is obligated to maintain confidentiality with regard to the reporter of an incident. Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good faith may face temporary or permanent repercussions as determined by other members of the project's leadership.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/

# License

Copyright 2018 nearForm

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
