<p align="center" style="margin:48px 0">
  <img height="40" src="./assets/images/quicktik-logo.png">
</p>
<br />
<p align="center">
  QuickTik - A simple time bounded to-do task scheduler.
</p>

<br />
<br />

![example workflow](https://github.com/im-mou/quicktik/actions/workflows/ci.yml/badge.svg)

QuickTik is a web app that allows you to create tasks with a timer attached to them. It allows you to play, pause, edit or mark the tasks as completed. Currently all data will be saved locally in your device using LocalStorage WebApi so be careful when clearing browser data.

<br />

<p align="center">
  <img width="100%" src="./assets/images/design_layout.png">
  Design Layout
</p>

<br />
<br />

<br />

<p align="center">
  <img width="100%" src="./assets/images/tech_used.png">
  Tech Stack
</p>

<br />
<br />

## Motivation

This project is just a learning exercise to improve my design and development skills using react, next.js and more libraries that I don't get a chance to use at work.

This project is a kind of an over-engineered to-do list.

<br />
<br />

## Stuff to add in a futur version

-   Add a backend for multi-device usage of the app.
-   Add proper pomodoro setup (?)
-   Add notifications (mail, push, etc...)
-   Collaborative boards and tasks with owner, editors and viewers.
-   Create an ultra-minimal, distraction-free board view for people with ADHD.
-   Other platforms integration (Google, Trello, etc...)

<br />
<br />

## Running in local envoirnment

### Setup and running the project using YARN (workspaces)

```bash
# install all deps using
yarn install

# run next js dev server
yarn dev

# Production:
yarn build
yarn start

# Optional:
# Compile nextjs as a static project for production.
# With this command there is no need to build, it does it automatically.
yarn export
```

### Setup and running the project using NPM (lerna)

```bash
# install all deps
npm run bootstrap

# run next js dev server
npm run dev

# Production:
npm run build
npm run start

# Optional:
# Compile nextjs as a static project for production.
# With this command there is no need to build, it does it automatically.
npm run export
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
