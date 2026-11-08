#!/bin/bash
cd /tmp/imgs
grab() {
  local name=$1
  local q=$2
  if [ -f "$name.json" ] && grep -q '"success": true' "$name.json" 2>/dev/null; then echo "SKIP $name"; return 0; fi
  z-ai image-search -q "$q" -c 6 --gl us --no-rank > "$name.json" 2>/dev/null
  if grep -q '"success": true' "$name.json" 2>/dev/null; then echo "OK $name"; else echo "FAIL $name"; fi
}
grab hero "luxury backyard landscape design at dusk with stone patio, outdoor furniture and landscape lighting"
grab patio "modern natural stone paver patio and walkway in a backyard garden"
grab garden "colorful perennial flower garden bed in a landscaped residential yard"
grab commercial "commercial office building entrance landscaping with trimmed shrubs and planters"
grab outdoorliving "backyard outdoor living area with pergola, dining table and string lights in the evening"
echo "GROUP1 DONE"
ls /tmp/imgs
