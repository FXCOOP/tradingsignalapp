# Setup Trading CRM Broker in CRM Database
# This adds the broker to your CRM dashboard

param(
    [string]$ApiUrl = "http://localhost:3000"
)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Trading CRM Broker Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This will add Trading CRM broker to your CRM database" -ForegroundColor Yellow
Write-Host "After this, you'll see it in your dashboard at: $ApiUrl/crm" -ForegroundColor Yellow
Write-Host ""

try {
    Write-Host "Sending setup request..." -ForegroundColor Yellow

    $response = Invoke-RestMethod -Uri "$ApiUrl/api/trading-crm/setup-broker" `
        -Method Post `
        -ContentType "application/json"

    if ($response.success -eq $true) {
        Write-Host "✓ SUCCESS!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Broker Details:" -ForegroundColor Cyan
        Write-Host "  Name: $($response.broker.name)"
        Write-Host "  Company: $($response.broker.company_name)"
        Write-Host "  Countries: $($response.broker.country_codes -join ', ')"
        Write-Host "  Status: $($response.broker.status)"
        Write-Host "  Max Leads/Day: $($response.broker.max_leads_per_day)"
        Write-Host ""
        Write-Host "✓ The broker is now visible in your CRM dashboard!" -ForegroundColor Green
        Write-Host "  Visit: $ApiUrl/crm" -ForegroundColor Cyan
        Write-Host ""
    } else {
        Write-Host "⚠ $($response.message)" -ForegroundColor Yellow

        if ($response.broker) {
            Write-Host ""
            Write-Host "Existing Broker Details:" -ForegroundColor Cyan
            Write-Host "  Name: $($response.broker.name)"
            Write-Host "  Company: $($response.broker.company_name)"
            Write-Host "  Status: $($response.broker.status)"
            Write-Host ""
            Write-Host "The broker already exists. Check your CRM dashboard:" -ForegroundColor Yellow
            Write-Host "  $ApiUrl/crm" -ForegroundColor Cyan
        }
    }

} catch {
    Write-Host "✗ ERROR" -ForegroundColor Red
    Write-Host "  $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure your server is running:" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor Cyan
    exit 1
}
