## Bitcoin Price

Current exchange rate of Bitcoin (BTC) to UAH

## Requirements

* Node 16
* Git
* Docker

## Common setup

Clone the repo and install the dependencies

```bash
git clone https://github.com/kharkovdenys/bitcoin-price.git
cd bitcoin-price
```

```bash
npm install
```

## Setting .env

```bash
...
SERVICE=                #email service
EMAIL=                  #email for sending letters
PASSWORD=               #email password
EMAILTEST=              #gmail email for tests
...
```

[Supported services](https://nodemailer.com/smtp/well-known/)

[Setting up the gmail tester](https://github.com/levz0r/gmail-tester#usage)

## Running Tests

To run the test suite, first install the dependencies, then run npm test:

```bash
npm install
npm test
```

## Start the application

To start the express server, run the following

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and take a look around

## Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo

```bash
git clone https://github.com/kharkovdenys/bitcoin-price.git
```

Step 2: Build the Docker image

```bash
docker build -t bitcoin-price .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 -d bitcoin-price
```