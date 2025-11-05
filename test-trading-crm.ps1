# Trading CRM Integration Test Script (PowerShell)
# Tests the integration for all supported countries

param(
    [string]$ApiUrl = "http://localhost:3000"
)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Trading CRM Integration Test Suite" -ForegroundColor Cyan
Write-Host "AFF 225X - Broker API Integration" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Testing against: $ApiUrl"
Write-Host ""

# Test 1: Check Status
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Test 1: Integration Status" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

try {
    $statusResponse = Invoke-RestMethod -Uri "$ApiUrl/api/trading-crm/status" -Method Get
    $statusResponse | ConvertTo-Json -Depth 10 | Write-Host

    Write-Host ""

    if ($statusResponse.status.enabled -eq $true -and
        $statusResponse.status.configured -eq $true -and
        $statusResponse.status.connection -eq "connected") {
        Write-Host "✓ Integration Status: READY" -ForegroundColor Green
    } else {
        Write-Host "✗ Integration Status: NOT READY" -ForegroundColor Red
        Write-Host "  Enabled: $($statusResponse.status.enabled)"
        Write-Host "  Configured: $($statusResponse.status.configured)"
        Write-Host "  Connection: $($statusResponse.status.connection)"
        exit 1
    }
} catch {
    Write-Host "✗ Failed to connect to API" -ForegroundColor Red
    Write-Host "  Error: $_"
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Test 2: Send Test Leads" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Countries to test
$countries = @{
    "MY" = "Malaysia"
    "TR" = "Turkey"
    "FR" = "France"
    "IT" = "Italy"
    "HK" = "Hong Kong"
    "SG" = "Singapore"
    "TW" = "Taiwan"
    "BR" = "Brazil"
}

$successCount = 0
$failCount = 0
$results = @()

foreach ($country in $countries.Keys) {
    Write-Host "Testing $country ($($countries[$country]))..." -ForegroundColor Yellow

    try {
        $body = @{
            testCountry = $country
        } | ConvertTo-Json

        $response = Invoke-RestMethod -Uri "$ApiUrl/api/trading-crm/test" `
            -Method Post `
            -Body $body `
            -ContentType "application/json"

        if ($response.success -eq $true) {
            Write-Host "  ✓ SUCCESS" -ForegroundColor Green
            Write-Host "    Lead ID: $($response.leadId)"
            Write-Host "    Redirect: $($response.redirectUrl)"
            $successCount++

            $results += [PSCustomObject]@{
                Country = $country
                Name = $countries[$country]
                Status = "SUCCESS"
                LeadId = $response.leadId
                Email = $response.testLead.email
                RedirectUrl = $response.redirectUrl
            }
        } else {
            Write-Host "  ✗ FAILED" -ForegroundColor Red
            Write-Host "    Error: $($response.error)"
            $failCount++

            $results += [PSCustomObject]@{
                Country = $country
                Name = $countries[$country]
                Status = "FAILED"
                LeadId = "N/A"
                Email = "N/A"
                RedirectUrl = "N/A"
            }
        }
    } catch {
        Write-Host "  ✗ FAILED" -ForegroundColor Red
        Write-Host "    Error: $_"
        $failCount++

        $results += [PSCustomObject]@{
            Country = $country
            Name = $countries[$country]
            Status = "ERROR"
            LeadId = "N/A"
            Email = "N/A"
            RedirectUrl = "N/A"
        }
    }

    Write-Host ""
}

# Summary
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Test Results Summary" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Display results table
$results | Format-Table -AutoSize

Write-Host "Total Tests: $($countries.Count)"
Write-Host "Successful: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "✓ All tests passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:"
    Write-Host "1. Tag your broker contact with these test leads"
    Write-Host "2. Ask them to verify they received all 8 test leads"
    Write-Host "3. Once verified, the integration is ready for production"
    exit 0
} else {
    Write-Host "⚠ Some tests failed. Please check the errors above." -ForegroundColor Yellow
    exit 1
}
