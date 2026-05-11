# Push this repo to GitHub using your WORK account (run in an INTERACTIVE terminal: Cursor > Terminal).
# Incognito in Chrome does NOT authenticate Git — this script triggers Git Credential Manager on your PC.

$ErrorActionPreference = "Stop"
Set-Location (Split-Path -Parent $PSScriptRoot)

Write-Host ""
Write-Host "=== Push a GitHub (rama local master -> remoto main) ===" -ForegroundColor Cyan
Write-Host "Repo: $(git remote get-url origin)"
Write-Host ""

# Optional: set commit identity for THIS repo only (edit if needed)
# git config user.name "Your Work Name"
# git config user.email "you@work.com"

Write-Host "Si falla con 'Repository not found':" -ForegroundColor Yellow
Write-Host "  1) Cuenta de trabajo en GitHub -> Settings -> Developer settings -> Personal access tokens"
Write-Host "     (crea token con acceso al repo amerilistdms/webdesignsolutions)"
Write-Host "  2) O borra credenciales viejas: Windows -> Administrador de credenciales -> Windows Credentials"
Write-Host "     -> quita entradas 'git:https://github.com' de la cuenta equivocada"
Write-Host ""

git push -u origin master:main

if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Push fallo (codigo $LASTEXITCODE). Revisa el mensaje arriba." -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host ""
Write-Host "Listo: codigo subido a origin/main." -ForegroundColor Green
