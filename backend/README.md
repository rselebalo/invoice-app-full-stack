# Invoice App Project

REST API written in NodeJS, TypeScript, Express, MongoDb that produces and saves invoice data

---

## Prerequisites

1. Node v12.x or above
2. create .env and get variables from .env.example in this repo

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development, testing purposes as well as deploying to porduction

## Getting the source code

    $ git clone http://tfg-labs-hfcuqm@git.codesubmit.io/tfg-labs/full-stack-invoice-app-btpzci
    $ cd backend
    $ yarn install

## Configure app

- Create a file: `/src/.env`;
- Copy variables from .env.example
- Update variable values with yours

## Endpoints

- /api/invoices (GET)
- /api/invoice (POST, GET)

## Running the project

    $ npm run start:dev

## Simple build for production

    $ npm run build

## Production deployment

    $ docker-compose build --no-cache && docker-compose up -d --force-recreate

## Author

- **Rethabile Selebalo** <rethabileselebal@gmail.com>
