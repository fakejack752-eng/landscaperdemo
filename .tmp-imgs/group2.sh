#!/bin/bash
cd /tmp/imgs
grab() {
  local name=$1
  local q=$2
  if [ -f "$name.json" ] && grep -q '"success": true' "$name.json" 2>/dev/null; then echo "SKIP $name"; return 0; fi
  z-ai image-search -q "$q" -c 6 --gl us --no-rank > "$name.json" 2>/dev/null
  if grep -q '"success": true' "$name.json" 2>/dev/null; then echo "OK $name"; else echo "FAIL $name"; fi
}
grab lighting "landscape lighting illuminating a garden path and house exterior at dusk"
grab sprinkler "lawn sprinkler irrigation system spraying water over green grass"
grab tree "arborist pruning trimming tree branches with professional equipment"
grab golden "elegant landscaped backyard garden at golden hour sunset"
grab cleanup "raking autumn leaves in a residential yard fall cleanup"
echo "GROUP2 DONE"
ls /tmp/imgs
