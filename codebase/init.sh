#!/bin/bash
cp .env frontend/.env
cp .env backend/.env
cp .env backend/postprocessing/.env
if [ -f .env ]; then
    export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi
