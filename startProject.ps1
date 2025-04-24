$backendPath = Resolve-Path ".\ABC.Publishing.API"
$frontendPath = Resolve-Path ".\Abc-Publishing-Frontend"

Write-Host "`n--- STEP 1: RESTORE, BUILD & RUN BACKEND ---`n"

cd $backendPath

dotnet restore
if ($LASTEXITCODE -ne 0) {
     Write-Host "Restore failed"
     exit $LASTEXITCODE
}

dotnet build
if ($LASTEXITCODE -ne 0) { 
    Write-Host "Build failed"
    exit $LASTEXITCODE
}

Start-Process powershell ArgumentList "dotnet run" -WorkingDirectory $backendPath.Path
Write-Host "Backend running in new terminal tab"

cd ".."

Write-Host "`n--- STEP 2: INSTALL & RUN FRONTEND ---`n"
cd $frontendPath

npm install
if ($LASTEXITCODE -ne 0) { 
    Write-Host "npm install failed"
    exit $LASTEXITCODE
}

Start-Process powershell -ArgumentList "npm run dev" -WorkingDirectory $frontendPath.Path
Write-Host "Frontend running in new terminal tab"

cd ".."
Start-Sleep -Seconds 5


Write-Host "`n--- STEP 3: RUNNING CYPRESS TESTS ---`n"

if (-Not (Test-Path ".\node_modules")) {
    Write-Host "Installing dependencies for Cypress tests..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "npm install failed. Cannot proceed with Cypress tests."
        exit $LASTEXITCODE
    }
}

try {
    Write-Host "Running Cypress tests..."
    npx cypress run
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Cypress tests completed successfully."
    } else {
        Write-Host "Cypress tests failed. Exit code: $LASTEXITCODE"
    }
} catch {
    Write-Host "Error running Cypress tests: $_"
}