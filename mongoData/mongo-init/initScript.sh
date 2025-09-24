#!/bin/bash

sleep 15


mongoimport --drop \
  --host mongodb \
  --authenticationDatabase admin \
  --username root --password example \
  --db chapterSchoolDb \
  --collection chapterSchoolCollection \
  --file sampleData.json --jsonArray