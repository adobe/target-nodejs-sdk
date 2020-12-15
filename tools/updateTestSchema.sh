#!/bin/bash

TEST_SCHEMA_DESTINATION_FOLDER=packages/target-decisioning-engine/test/schema

if [[ `git status --porcelain` ]]; then
  echo "There are uncommitted changes.  Please commit or stash and try again."
  exit 1
fi

# preserve the current working branch name
working_folder=$(pwd)
working_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

# Add the target-sdk-testing repository as a remote, and perform the initial fetch
git remote add -f target-sdk-testing git@github.com:adobe/target-sdk-testing.git

# Create a "temp" branch based on target-sdk-testing:main
git checkout -b temp target-sdk-testing/main

# Create a synthetic "schema" branch using the commits in `/schema/` from `target-sdk-testing`
git subtree split -P schema -b schema

# Switch back to the working branch and add the new `schema` branch into `/path/to/test/schema/`.
$(git checkout $working_branch)
#$(git subtree add -P $SCHEMA_DESTINATION_FOLDER schema --squash)
$(git subtree merge -P $SCHEMA_DESTINATION_FOLDER schema --squash)

# first time, add, second time merge

# clean up the branches used
git branch -D schema temp

# clean up remotes
git remote rm target-sdk-testing

echo "Test Schema files in $working_folder/$TEST_SCHEMA_DESTINATION_FOLDER have been updated with the latest from target-sdk-testing."
