# my-trendingvids-webapp

![NextJS](https://img.shields.io/badge/NextJS-cyan)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6)
![Next-Auth](https://img.shields.io/badge/NextAuth.js-yellow)
![TailwindCss](https://img.shields.io/badge/Tailwind--CSS-red)
![Responsive](https://img.shields.io/badge/Responsive-red)
![Github](https://img.shields.io/badge/Github-blue)
![Vercel](https://img.shields.io/badge/Vercel-black)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
![maintained](https://img.shields.io/badge/Maintained%3F-yes-green)
![ask](https://img.shields.io/badge/Ask_me-anything-green)
[![Preflight](https://github.com/thouel/hello-space/actions/workflows/preflight.yml/badge.svg)](https://github.com/thouel/hello-space/actions/workflows/preflight.yml)
[![Vercel Production Deployment](https://github.com/thouel/hello-space/actions/workflows/deploy.yml/badge.svg)](https://github.com/thouel/hello-space/actions/workflows/deploy.yml)

A responsive webapp to feed your head with space & astronomy wonders

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Test](#test)
- [Usage](#usage)
- [Example](#example)
- [CI](#ci)
- [Maintainers](#maintainers)
- [License](#license)

## Background

App used to keep stepping in dev world. My main focuses were:

- understand the mechanics of a JS react framework : NextJs v14 with the App router does the trick
- have a responsive designed web application (for mobile and desktop)
- have an automatic deployment pipeline
- store data in a cloud database
- build a continuous integration & deployment pipeline

Using:

- [NextJs @14.0.3](https://nextjs.org/) to organize the app, using the [App Router](https://nextjs.org/docs/app)
- [TypeScript @5.3](https://www.typescriptlang.org/)
- [Next-Auth](https://next-auth.js.org/getting-started/introduction) to easily setup a signin/signup/signout mechanism with Github provider
- [TailwindCSS](https://tailwindcss.com/docs/guides/nextjs) for pages styling
- [Github](https://github.com/thouel/my-trendingvids-webapp/tree/main) to host app sources
- [GitHub Actions](https://github.com/thouel/my-trendingvids-webapp/actions) to automate continuous integration & fire Vercel deployment
- [Vercel](https://vercel.com/) to deploy automatically (after each push on main) [@see here](https://my-trendingvids-webapp.vercel.app)
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress) to write UI and API tests. They are started in [Preflight](https://github.com/thouel/my-trendingvids-webapp/actions/workflows/preflight.yml/) (GitHub Action) before deploying to Vercel

## Install

```
$ npm i react@latest react-dom@latest next@14.0.3
```

## Test

```
$ npm run cy:run
```

## Usage

We use [APOD Nasa API](https://api.nasa.gov/) to fetch pictures/videos of the day. You need to get your own API key (stored under .env/NASA_API_SECRET) in order to make it work.

```
$ npm run dev
```

## Example

[Latest deployment of main branch on Vercel](https://hello-space.vercel.app/)

## CI

After each push on _main_ branch, we build, lint, run tests and then build. On success build, we deploy on prod env.

## Maintainers

[@https://github.com/thouel](https://github.com/thouel)

## License

MIT © 2023 Thibault Houel
