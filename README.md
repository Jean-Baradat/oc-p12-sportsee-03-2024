# Welcome aboard, captain

![image](https://github.com/Jean-Baradat/oc-p12-sportsee-03-2024/assets/73848974/a6055d45-2445-4276-ad8b-59e3f195e9a7)

This project is the 12th in the course OpenClassrooms "Développez un tableau de bord d'analytics avec React" course. It introduces students to React JS with complex data and varied sources, as well as to the use of external libraries (NPM) such as D3 (used here).

This project was developed with:

- [Vite](https://vitejs.dev/)
- [React 18](https://react.dev/)
- [Axios](https://axios-http.com/)
- [Node.js](https://nodejs.org/en)
- [D3.js](https://d3js.org/) 
- [Prettier](https://prettier.io/)
- [ESlint](https://eslint.org/)
- [tailwindcss](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

If you need more information about the project, please go to **package.json**


## Start

Download the project by saving it in a directory on your computer:

```bash
git clone https://github.com/Jean-Baradat/OC-p11-kasa-01-2024.git
```

You'll also need a project representing a local API server:
Available here: [P9-front-end-dashboard](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard)

This server is not required to run the local, but we'll see how to use it later.

## Launch locally (Mocked data)

Let's start by installing the dependencies:
```bash
npm i
```

and launch Vite:
```bash
npm run dev
```

The server is started, noting that here you're using the mocked data in the file:
- `src\db\dataMock.js` (Modify them to check)


> If you need more information about commands, please go to **package.json**

## Launch locally (local API server)

Now you want to run the local API server, no problem. Take a look at the documentation on [P9-front-end-dashboard](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard) and start the server with:

```bash
yarn
yarn dev
```

Your local API is launched, but the application won't know its path.

You need to create the following file in the directory root:

- `.env.production`

Then, in your new `.env.production` file, add the line shown in the example file:

- `.env.exemple`

Then after the colons, add the local URL of your local API server that you launched, also including **`/user/`**.

> You should have something like VITE_API_URL=http://localhost:3000/user/

The local API server is launched, the application has its environment variables, there's just one step left.

#### Build 

Build the application:
```bash
npm run build
```

Then to see this version:
```bash
npm run preview
```

You can also make: (To see the result on another machine in your network.)
```bash
npm run preview:network
```

## Environment variables

This project used the environment variables in:
- `.env.development`

Use the example `.env.example` to create your:
- `.env.production`

## Configuration 
Below you will find the configuration for all the development tools used for this project. Do not modify if you don't know how.

#### ESlint
- `.eslintrc.json`

#### Prettier
- `.prettierrc.json`

#### Js config
- `jsconfig.json`

#### Tailwind
- `tailwind.config.js`

#### Tailwind
- `vite.config.js`


## Workspace Settings
A `.vscode` file contains configurations for VScode for this project.



Jean 👋
