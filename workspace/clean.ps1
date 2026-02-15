#Requires -Version 5.1
$ErrorActionPreference = "Stop"

# --- clean ---
if (Test-Path "node_modules") {
    Remove-Item -Path "node_modules" -Recurse -Force
}

# ../dist を作る
if (-not (Test-Path "../dist")) {
    New-Item -Path "../dist" -ItemType Directory | Out-Null
}

# ../dist/* を削除（空でもエラーにしない）
Remove-Item -Path "../dist/*" -Force -ErrorAction SilentlyContinue

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

Write-Host "[1/3] Installing dependencies via pnpm (npx)..."
npx -y "pnpm@$PNPM_VER" install --frozen-lockfile

Write-Host "[2/3] Building..."
npx -y "pnpm@$PNPM_VER" build

Write-Host "[3/3] Running yamlMergeAndCompress.ts..."
npx -y "pnpm@$PNPM_VER" dlx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts
