set -e

pushd dist/ngsuite

npm set //registry.npmjs.org/:_authToken $TOKEN

npm version $LIB_VERSION

npm publish --access public

popd
