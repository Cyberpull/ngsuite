set -e

cd dist

# ===========================
# Publish NGSuite
# ===========================

git config --global user.name "$ID_NAME"

git config --global user.email "$ID_EMAIL"


pushd ngsuite

npm set //registry.npmjs.org/:_authToken $TOKEN

npm version $LIB_VERSION

npm publish --access public

popd
