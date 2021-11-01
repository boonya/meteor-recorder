#!/usr/bin/env bash

mongo -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "admin" <<EOF
use $MONGO_DB;
db.createUser({user: "$MONGO_USERNAME", pwd: "$MONGO_PASSWORD", roles: [{role: "readWrite", db: "$MONGO_DB"}]});
EOF
