param (
    [string]$solutionPath = "ABC.Publishing.API.sln",
    [string]$testProject = "ABC.Publishing.API.Test/ABC.Publishing.API.Test.csproj",
    [string]$publishDir = "ABC.Publish",
    [string]$csprojPath = "ABC.Publishing.API/ABC.Publishing.API.csproj",
    [string]$zipName = "ABC_Publishing_Release.zip"
)

function Log {
    param ([string]$message)
    Write-Host "[INFO] $message" -ForegroundColor Cyan
}

function ErrorExit {
    param ([string]$message)
    Write-Host "[ERROR] $message" -ForegroundColor Red
    exit 1
}

try {
    Log "Restoring solution..."
    dotnet restore $solutionPath --verbosity quiet
    if ($LASTEXITCODE -ne 0) { 
        ErrorExit "Restore failed."
    }

    Log "Building the solution..."
    dotnet build $solutionPath --no-restore --verbosity quiet
    if ($LASTEXITCODE -ne 0) { 
        ErrorExit "Build failed." 
    }

    Log "Running tests..."
    dotnet test $testProject --no-build --verbosity quiet
    if ($LASTEXITCODE -ne 0) { 
        ErrorExit "Tests failed." 
    }

    Log "Publishing the project..."
    dotnet publish $csprojPath -c Release -o $publishDir --verbosity quiet
    if ($LASTEXITCODE -ne 0) { 
        ErrorExit "Publish failed." 
    }

    Log "Zipping the published output..."
    if (Test-Path $zipName) { 
        rmdir $zipName -Force 
    }
    Compress-Archive  "$publishDir"  $zipName

    Log "Build and packaging completed successfully!"
    Log "Zipped : $zipName"
}
catch {
    ErrorExit $_.Exception.Message
}
