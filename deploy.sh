#!/bin/sh
setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
  git config credential.helper "store --file=.git/fate_credentials"
  echo "https://${GH_TOKEN}:@github.com" > .git/fate_credentials
  git remote add origin https://github.com/rslifka/fate_of_all_fools.git > /dev/null 2>&1
  git checkout master
}

commit_artifacts() {
  git add docs/fateOfAllFools.css
  git add docs/fateOfAllFools.js
  git add fateOfAllFools.user.js
  git commit --message "AUTO-CREATED Release Artifact v$TRAVIS_BUILD_NUMBER c/o Travis"
  git push --quiet --set-upstream origin master
}

setup_git
commit_artifacts
