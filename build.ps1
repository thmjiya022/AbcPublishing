param (
    [string]$solutionPath = "ABC.Publishing.API.sln",
    [string]$testProject = "ABC.Publishing.API.Test/ABC.Publishing.API.Test.csproj",
    [string]$publishDir = "publish",
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

Get-Process | Where-Object { $_.ProcessName -like "*ABC.Publishing.API*" } | ForEach-Object {
    Log "Killing locked process: $($_.ProcessName) (PID: $($_.Id))"
    Stop-Process -Id $_.Id -Force
}

try {
    Log "Restoring solution..."
    dotnet restore $solutionPath
    if ($LASTEXITCODE -ne 0) { ErrorExit "Restore failed." }

    Log "Building the solution..."
    dotnet build $solutionPath --no-restore
    if ($LASTEXITCODE -ne 0) { ErrorExit "Build failed." }

    Log "Running tests..."
    dotnet test $testProject --no-build --verbosity normal
    if ($LASTEXITCODE -ne 0) { ErrorExit "Tests failed." }

    Log "Publishing the project..."
    dotnet publish "ABC.Publishing.API/ABC.Publishing.API.csproj" -c Release -o $publishDir
    if ($LASTEXITCODE -ne 0) { ErrorExit "Publish failed." }

    Log "Zipping the published output..."
    if (Test-Path $zipName) { Remove-Item $zipName -Force }
    Compress-Archive -Path "$publishDir/*" -DestinationPath $zipName

    Log "Build and packaging completed successfully!"
    Log "Zipped artifact: $zipName"
}
catch {
    ErrorExit $_.Exception.Message
}
