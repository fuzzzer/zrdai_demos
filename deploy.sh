#!/bin/bash
set -e

echo "Building updates for cafe..."
npm --prefix cafe install
npm --prefix cafe run build

echo "Building updates for chatbot-ui..."
npm --prefix chatbot-ui install
npm --prefix chatbot-ui run build

echo "Building updates for real-estate-demo..."
npm --prefix real-estate-demo install
npm --prefix real-estate-demo run build

echo "Deploying updates to Firebase Hosting..."
firebase deploy --only hosting

echo "Update successfully pushed to live!"