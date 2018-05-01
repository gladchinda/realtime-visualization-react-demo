# Realtime Data Visualization (Next.JS & Pusher)

This project contains the source code for a very simple realtime data visualization application based on a poll. Here is a run-down of the core technologies used in this project.

1. [Next.js](https://learnnextjs.com/) - A framework for building server-side rendered React applications with ease. It handles most of the challenges that come with building SSR React apps.

2. [Pusher](https://pusher.com/) - Pusher is a technology for building apps with varying realtime needs like push notifications and pub/sub messaging. It is the engine behind the realtime ability of our data visualization app.

3. [Chart.js](http://www.chartjs.org/) - Chart.js is a simple yet flexible JavaScript charting library that makes it possible to create different types of data visualization charts via a programmable interface.

4. [React](https://reactjs.org/) - A very popular JavaScript DOM rendering framework for building scalable web applications using a component-based architecture.

Here is a screenshot of the application.

![App Screenshot](https://i.imgur.com/4369jkl.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

1. **Install Node on your machine** - Ensure that you have `node` and `npm` or `yarn` installed on your machine. You can easily check to see if they are already installed by running the following commands respectively.

```sh
node -v
```

```sh
npm -v
```

```sh
yarn -v
```

2. **Create a Pusher application** - Create a new application on your [Pusher Dashboard](https://dashboard.pusher.com/) to get your app credentials.

### Setup Instructions

1. **Clone the repository** into a new directory on your machine.

2. **Install the dependencies** by running the following command from the new directory.

```sh
npm install
```

or using `yarn`

```sh
yarn add
```

3. **Create a `.env` file** in the root of the new directory with the following content. Ensure you have already created an application on your [Pusher Dashboard](https://dashboard.pusher.com/) to get your app credentials.

```ini
# Pusher App Credentials

PUSHER_APP_ID=(YOUR_APP_ID)
PUSHER_APP_KEY=(YOUR_APP_KEY)
PUSHER_APP_SECRET=(YOUR_APP_SECRET)
PUSHER_APP_CLUSTER=(YOUR_APP_CLUSTER)
```

4. **Start the app** by running the following command. The app will runs on port 3000 except that port is already in use.

```sh
npm run dev
```

For `production`

```sh
npm start
```
