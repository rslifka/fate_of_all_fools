#!/bin/sh
setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
  git config credential.helper "store --file=.git/fate_credentials"
  echo "https://${GH_TOKEN}:@github.com" > .git/fate_credentials
  git remote add origin https://github.com/rslifka/fate_of_all_fools.git > /dev/null 2>&1
  git checkout master
}

reset_tags() {
  echo "Deleting tag..."
  git tag -d current
  echo "Deleting remotely..."
  git push origin :refs/tags/current
  echo "Retagging..."
  git tag current
}

setup_git
reset_tags
