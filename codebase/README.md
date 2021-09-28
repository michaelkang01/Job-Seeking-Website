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

### Workflow
When adding a new feature to the codebase, make sure to follow the below steps:

1. Switch to dev branch if you have not already
2. git fetch + git pull to update your local dev branch
4. Create a new feature branch off dev with your features name
5. Commit necessary changes to your branch

When your features is done, and you are ready to create a pull request to merge onto dev, follow the below steps

1. Update your local dev branch to the latest version (git checkout dev + git fetch + git pull)
2. Switch back onto your feature branch and then rebase onto dev (git checkout abc + git rebase dev)
3. Merge conflicts may occur so make sure to resolve those
4. Force push your changes (so git tree won't be messed up) (git push --force)
5. Create the pull request and make changes as necessary
6. After 2+ members have approved, person in charge will merge it onto dev
7. DO NOT DELETE THE BRANCH AFTER MERGING as TA will need to mark it