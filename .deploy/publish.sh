set -e

cd dist/angular

npm set //registry.npmjs.org/:_authToken $TOKEN

npm publish

cd ../..
