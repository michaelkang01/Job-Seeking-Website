# Codebase

## Setting up environment

    source init.sh

## Building

### Building and running front/back end

    source init.sh
    docker-compose build
    docker-compose up

By default, the frontend is served on port 8000 and backend API on port 8001.

### Building frontend only

    source init.sh
    ./build.sh

## Running backend/frontend individually

### Running frontend only

    cd frontend
    npm install # If you haven't done so before
    npm run start

### Running backend only

    cd backend
    npm install # If you haven't done so before
    npm start
