#!/bin/bash
cd ~/public_html
npm install --production
npm install -g pm2
pm2 start src/server.js --name "mwendo-backend"
pm2 save
pm2 startup

