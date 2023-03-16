set -e

npm run build -- angular

cd dist/angular

npm publish

cd ../..
