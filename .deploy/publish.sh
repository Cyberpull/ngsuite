set -e

cd dist/ngsuite

npm set //registry.npmjs.org/:_authToken $TOKEN

npm publish --access public

cd ../..
