#!/bin/bash
cd /tmp/imgs
z-ai image-search -q "luxury backyard landscape design at dusk with stone patio, outdoor furniture and landscape lighting" -c 8 --gl us --no-rank -o hero.json &
z-ai image-search -q "beautifully manicured green residential lawn in front of a suburban home with mulch garden beds" -c 6 --gl us --no-rank -o lawn.json &
z-ai image-search -q "modern natural stone paver patio and walkway in a backyard garden" -c 6 --gl us --no-rank -o patio.json &
z-ai image-search -q "colorful perennial flower garden bed in a landscaped residential yard" -c 6 --gl us --no-rank -o garden.json &
z-ai image-search -q "commercial office building entrance landscaping with trimmed shrubs and planters" -c 6 --gl us --no-rank -o commercial.json &
z-ai image-search -q "backyard outdoor living area with pergola, dining table and string lights in the evening" -c 6 --gl us --no-rank -o outdoorliving.json &
z-ai image-search -q "professional landscaping crew working in a garden planting shrubs" -c 6 --gl us --no-rank -o crew.json &
wait
echo "BATCH1 COMPLETE"
ls -la /tmp/imgs
