#Requires -Version 5.1
$ErrorActionPreference = "Stop"

# Load environment variables from env file
$envFile = Join-Path $PSScriptRoot "env"
if (Test-Path $envFile) {
    Write-Host "Loading environment from: $envFile"
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim() -replace '^["'']|["'']$', ''  # Remove quotes
            Set-Variable -Name $key -Value $value -Scope Script
            Write-Host "  $key=$value"
        }
    }
} else {
    Write-Host "ERROR: env file not found at $envFile"
    exit 1
}

npx -y "pnpm@$PNPM_VER" build:watch
