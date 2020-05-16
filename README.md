# react-talk-pyjaipur

Talk about React fundamentals.

## Slides

Slides are available in `slides` folder.
Currently under development, once done it will be available in `Keynote, PDF and PPT` format. 

## Running

### Backend

- Written on NodeJs v12.0.0. 
- Please install MongoDB. Please follow instructions [here](https://docs.mongodb.com/manual/installation/).
- All the configurations are written in `/Config` folder.
- Please install dependencies using `npm install or npm i`.
- Start your node server using `npm start or node server.js` on the root of the project.

### React App

- Written on React v16.3.
- Install your dependencies using `npm install or npm i`.
- Start your development server using `npm start`. This should open your browser on `http://localhost:3000/`

- If you have any CORS issues, one fix is to add `"proxy":"http://localhost:3000/"` in your `package.json`, and try re-running your app.

## [Redux](https://redux.js.org/) Demo

- For redux demo Please refer to this link [here](https://github.com/Jithinqw/redux-demo).

## Running on [docker](https://www.docker.com/).

- React App

`docker build -t todo:dev .` for building the image.<br/>
`docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 todo:dev` for runnig the container.<br/>
Use `Dockerfile.prod` for production.

- Nodejs Backend

`docker build -t todobackend/dev .` for building the image.<br/>
`docker run -p 4000:4000 -d todobackend/dev` for running the image.