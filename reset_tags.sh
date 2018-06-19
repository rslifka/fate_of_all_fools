#!/bin/sh
setup_git() {
  echo "Setting up Git..."
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
  git config credential.helper "store --file=.git/fate_credentials"
  echo "https://${GH_TOKEN}:@github.com" > .git/fate_credentials
  git remote add origin https://github.com/rslifka/fateofallfools-releases.git > /dev/null 2>&1
  git checkout master
}

commit_release() {
  echo "Status"
  git st
  exit 1
}

setup_git
commit_release
