#!/bin/bash
set -e

read -p "Enter your Firebase Project ID (e.g., zrdai-demos): " firebaseProjectId

echo "Attempting to create Firebase Project..."
firebase projects:create "$firebaseProjectId" --display-name "$firebaseProjectId" || echo "Project creation skipped (it may already exist). Proceeding..."

echo "Setting active Firebase Project..."
firebase use "$firebaseProjectId"

echo "Building cafe..."
npm --prefix cafe install
npm --prefix cafe run build

echo "Building chatbot-ui..."
npm --prefix chatbot-ui install
npm --prefix chatbot-ui run build

echo "Building real-estate-demo..."
npm --prefix real-estate-demo install
npm --prefix real-estate-demo run build

echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting --project "$firebaseProjectId"

echo "Deployment Successful!"
echo "Live URLs:"
echo "https://$firebaseProjectId.web.app/cafe"
echo "https://$firebaseProjectId.web.app/chatbot-ui"
echo "https://$firebaseProjectId.web.app/real-estate-demo"