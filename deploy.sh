#!/bin/sh
setup_git() {
  git config --global user.email "travis+fateOfAllFools@travis-ci.org"
  git config --global user.name "Travis CI (FATE)"
  git config credential.helper "store --file=.git/fate_credentials"
  echo "https://${GH_TOKEN}:@github.com" > .git/fate_credentials
}

commit_artifacts() {
  git add docs/fateOfAllFools.css
  git add docs/fateOfAllFools.js
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

push_to_github() {
  git remote add origin https://github.com/rslifka/fate_of_all_fools.git > /dev/null 2>&1
  git push --quiet --set-upstream origin master
}

setup_git
commit_artifacts
push_to_github
