#!/bin/bash
cd /tmp/imgs
run() {
  local name=$1
  local q=$2
  for i in 1 2 3; do
    if [ -f "$name.json" ]; then echo "SKIP $name"; return 0; fi
    if z-ai image-search -q "$q" -c 6 --gl us --no-rank -o "$name.json" >/dev/null 2>&1; then
      if grep -q '"success": true' "$name.json" 2>/dev/null; then echo "OK $name"; return 0; fi
    fi
    echo "RETRY $name ($i)"
    sleep 12
  done
  echo "FAIL $name"
}
run hero "luxury backyard landscape design at dusk with stone patio, outdoor furniture and landscape lighting"
sleep 6
run patio "modern natural stone paver patio and walkway in a backyard garden"
sleep 6
run garden "colorful perennial flower garden bed in a landscaped residential yard"
sleep 6
run commercial "commercial office building entrance landscaping with trimmed shrubs and planters"
sleep 6
run outdoorliving "backyard outdoor living area with pergola, dining table and string lights in the evening"
sleep 6
run lighting "landscape lighting illuminating a garden path and house exterior at dusk"
sleep 6
run sprinkler "lawn sprinkler irrigation system spraying water over green grass"
sleep 6
run tree "arborist pruning trimming tree branches with professional equipment"
sleep 6
run golden "elegant landscaped backyard garden at golden hour sunset"
sleep 6
run cleanup "raking autumn leaves in a residential yard fall cleanup"
echo "ALL SEARCHES DONE"
ls /tmp/imgs
