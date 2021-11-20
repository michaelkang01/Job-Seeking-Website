#!/bin/bash
cp .env frontend/.env
cp .env backend/.env
if [ -f .env ]; then
    export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi