#!/bin/bash

# Trading CRM Integration Test Script
# Tests the integration for all supported countries

echo "================================================"
echo "Trading CRM Integration Test Suite"
echo "AFF 225X - Broker API Integration"
echo "================================================"
echo ""

# Configuration
API_URL="${1:-http://localhost:3000}"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Testing against: $API_URL"
echo ""

# Test 1: Check Status
echo "================================================"
echo "Test 1: Integration Status"
echo "================================================"
echo ""

STATUS_RESPONSE=$(curl -s "$API_URL/api/trading-crm/status")
echo "$STATUS_RESPONSE" | jq '.'

# Check if integration is enabled
IS_ENABLED=$(echo "$STATUS_RESPONSE" | jq -r '.status.enabled')
IS_CONFIGURED=$(echo "$STATUS_RESPONSE" | jq -r '.status.configured')
CONNECTION=$(echo "$STATUS_RESPONSE" | jq -r '.status.connection')

echo ""
if [ "$IS_ENABLED" = "true" ] && [ "$IS_CONFIGURED" = "true" ] && [ "$CONNECTION" = "connected" ]; then
    echo -e "${GREEN}✓ Integration Status: READY${NC}"
else
    echo -e "${RED}✗ Integration Status: NOT READY${NC}"
    echo "  Enabled: $IS_ENABLED"
    echo "  Configured: $IS_CONFIGURED"
    echo "  Connection: $CONNECTION"
    exit 1
fi

echo ""
echo "================================================"
echo "Test 2: Send Test Leads"
echo "================================================"
echo ""

# Array of countries to test
declare -a COUNTRIES=("MY" "TR" "FR" "IT" "HK" "SG" "TW" "BR")
declare -A COUNTRY_NAMES=(
    ["MY"]="Malaysia"
    ["TR"]="Turkey"
    ["FR"]="France"
    ["IT"]="Italy"
    ["HK"]="Hong Kong"
    ["SG"]="Singapore"
    ["TW"]="Taiwan"
    ["BR"]="Brazil"
)

SUCCESS_COUNT=0
FAIL_COUNT=0

# Test each country
for country in "${COUNTRIES[@]}"; do
    echo "Testing $country (${COUNTRY_NAMES[$country]})..."

    RESPONSE=$(curl -s -X POST "$API_URL/api/trading-crm/test" \
        -H "Content-Type: application/json" \
        -d "{\"testCountry\":\"$country\"}")

    SUCCESS=$(echo "$RESPONSE" | jq -r '.success')

    if [ "$SUCCESS" = "true" ]; then
        LEAD_ID=$(echo "$RESPONSE" | jq -r '.leadId')
        REDIRECT_URL=$(echo "$RESPONSE" | jq -r '.redirectUrl')
        echo -e "  ${GREEN}✓ SUCCESS${NC}"
        echo "    Lead ID: $LEAD_ID"
        echo "    Redirect: $REDIRECT_URL"
        ((SUCCESS_COUNT++))
    else
        ERROR=$(echo "$RESPONSE" | jq -r '.error')
        echo -e "  ${RED}✗ FAILED${NC}"
        echo "    Error: $ERROR"
        ((FAIL_COUNT++))
    fi
    echo ""
done

# Summary
echo "================================================"
echo "Test Results Summary"
echo "================================================"
echo ""
echo "Total Tests: ${#COUNTRIES[@]}"
echo -e "${GREEN}Successful: $SUCCESS_COUNT${NC}"
echo -e "${RED}Failed: $FAIL_COUNT${NC}"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo ""
    echo "Next Steps:"
    echo "1. Tag your broker contact with these test leads"
    echo "2. Ask them to verify they received all 8 test leads"
    echo "3. Once verified, the integration is ready for production"
    exit 0
else
    echo -e "${YELLOW}⚠ Some tests failed. Please check the errors above.${NC}"
    exit 1
fi
