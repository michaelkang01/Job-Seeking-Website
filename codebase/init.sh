#!/bin/bash
ENV_FILE=".env.prod"
cp $ENV_FILE frontend/.env
cp $ENV_FILE backend/.env
cp $ENV_FILE backend/postprocessing/.env
if [ -f $ENV_FILE ]; then
    export $(echo $(cat $ENV_FILE | sed 's/#.*//g'| xargs) | envsubst)
fi
