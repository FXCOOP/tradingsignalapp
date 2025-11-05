#!/bin/bash

# Setup Trading CRM Broker in CRM Database
# This adds the broker to your CRM dashboard

API_URL="${1:-http://localhost:3000}"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}================================================${NC}"
echo -e "${CYAN}Trading CRM Broker Setup${NC}"
echo -e "${CYAN}================================================${NC}"
echo ""

echo -e "${YELLOW}This will add Trading CRM broker to your CRM database${NC}"
echo -e "${YELLOW}After this, you'll see it in your dashboard at: $API_URL/crm${NC}"
echo ""

echo -e "${YELLOW}Sending setup request...${NC}"

RESPONSE=$(curl -s -X POST "$API_URL/api/trading-crm/setup-broker" \
    -H "Content-Type: application/json")

SUCCESS=$(echo "$RESPONSE" | jq -r '.success')

if [ "$SUCCESS" = "true" ]; then
    echo -e "${GREEN}✓ SUCCESS!${NC}"
    echo ""
    echo -e "${CYAN}Broker Details:${NC}"
    echo "  Name: $(echo "$RESPONSE" | jq -r '.broker.name')"
    echo "  Company: $(echo "$RESPONSE" | jq -r '.broker.company_name')"
    echo "  Countries: $(echo "$RESPONSE" | jq -r '.broker.country_codes | join(", ")')"
    echo "  Status: $(echo "$RESPONSE" | jq -r '.broker.status')"
    echo "  Max Leads/Day: $(echo "$RESPONSE" | jq -r '.broker.max_leads_per_day')"
    echo ""
    echo -e "${GREEN}✓ The broker is now visible in your CRM dashboard!${NC}"
    echo -e "  Visit: ${CYAN}$API_URL/crm${NC}"
    echo ""
else
    MESSAGE=$(echo "$RESPONSE" | jq -r '.message')
    echo -e "${YELLOW}⚠ $MESSAGE${NC}"

    HAS_BROKER=$(echo "$RESPONSE" | jq -r '.broker != null')

    if [ "$HAS_BROKER" = "true" ]; then
        echo ""
        echo -e "${CYAN}Existing Broker Details:${NC}"
        echo "  Name: $(echo "$RESPONSE" | jq -r '.broker.name')"
        echo "  Company: $(echo "$RESPONSE" | jq -r '.broker.company_name')"
        echo "  Status: $(echo "$RESPONSE" | jq -r '.broker.status')"
        echo ""
        echo -e "${YELLOW}The broker already exists. Check your CRM dashboard:${NC}"
        echo -e "  ${CYAN}$API_URL/crm${NC}"
    fi
fi
