<h1 align="center">
  <br>
  <a href="/"><img src="public/img/trueblogger%20github%20logo.png" alt="trueblogger"></a>
</h1>

<h4 align="center">Get all your truecaller blogs at one place.</h4>

> Trueblogger provides a neat, user-friendly and performant web interface that categorizes the blogs as per the interests of the reader.

#### Live Link: [trueblogger.herokuapp.com](https://trueblogger.herokuapp.com/)

## Folder Structure

    ├── src
    ├── api.js     # api file wrapper
    ├── app.js     # the node app
    ├── config.js  # getter for .env variables
    ├── http.js    # axios lib instance
    ├── .env.example
    ├── .gitignore
    ├── package.json
    └── README.md

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed with recommended LTS version

```sh
git clone https://github.com/Sagarmak/trueblogger-backend.git # or clone your own fork
cd trueblogger-backend
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

### ENV variables

```
NODE_APP_TITLE=trueblogger
# public api for wordpress' truecaller blog
NODE_APP_API_URL=http://dev-api:port/api/v1/etc
NODE_APP_PORT=3000
```

### Dependencies

|Package |Description|
|--------|-------|
|axios|promise based HTTP library|
|cors|send CORS headers in requests|
|dotenv|to loads environment variables from a `.env` file|
|express|nodejs framework|
