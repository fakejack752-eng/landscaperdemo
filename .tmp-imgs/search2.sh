#!/bin/bash
cd /tmp/imgs
z-ai image-search -q "landscape lighting illuminating a garden path and house exterior at dusk" -c 6 --gl us --no-rank -o lighting.json &
z-ai image-search -q "lawn care professional mowing a green lawn with a mower" -c 6 --gl us --no-rank -o mowing.json &
z-ai image-search -q "snow removal service shoveling a residential driveway in winter" -c 6 --gl us --no-rank -o snow.json &
z-ai image-search -q "lawn sprinkler irrigation system spraying water over green grass" -c 6 --gl us --no-rank -o sprinkler.json &
z-ai image-search -q "arborist pruning trimming tree branches with professional equipment" -c 6 --gl us --no-rank -o tree.json &
z-ai image-search -q "elegant landscaped backyard garden at golden hour sunset" -c 6 --gl us --no-rank -o golden.json &
z-ai image-search -q "raking autumn leaves in a residential yard fall cleanup" -c 6 --gl us --no-rank -o cleanup.json &
wait
echo "BATCH2 COMPLETE"
ls -la /tmp/imgs
