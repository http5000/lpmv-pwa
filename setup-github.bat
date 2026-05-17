@echo off
setlocal
chcp 65001 >nul
cd /d "C:\Users\graph\Desktop\Claude App\lpmv-pwa"

echo.
echo =====================================================================
echo  LPMV-PWA — Setup GitHub uniquement (1 etape)
echo =====================================================================
echo.
echo  Un navigateur va s'ouvrir.
echo  Quand il affiche un code a 8 caracteres, c'est ce code qu'il
echo  faut coller dans le navigateur ET CLIQUER "Authorize".
echo.
echo  IMPORTANT : ne ferme pas la fenetre noire ni l'onglet du navigateur
echo  avant que ce script affiche "TERMINE".
echo.
pause

echo.
echo ---------------------------------------------------------------------
echo  Connexion GitHub
echo ---------------------------------------------------------------------
echo  Reponds aux questions (Entree pour les choix par defaut) :
echo    - Where? GitHub.com
echo    - Protocol? HTTPS
echo    - Authenticate Git with your GitHub credentials? Y
echo    - How? Login with a web browser
echo.
"C:\Program Files\GitHub CLI\gh.exe" auth login
if errorlevel 1 (
    echo.
    echo  [!] Echec auth GitHub. Verifie ta connexion et relance.
    pause
    exit /b 1
)

echo.
echo ---------------------------------------------------------------------
echo  Creation du repo prive lpmv-pwa et premier push
echo ---------------------------------------------------------------------
"C:\Program Files\GitHub CLI\gh.exe" repo create lpmv-pwa --private --source=. --remote=origin --push
if errorlevel 1 (
    echo.
    echo  [!] Echec creation repo. Peut-etre qu'il existe deja sous ton compte ?
    echo  Si c'est le cas, dis-le moi dans Claude.
    pause
    exit /b 1
)

echo.
echo =====================================================================
echo  TERMINE — repo GitHub cree et code pousse !
echo =====================================================================
echo.
echo  Reviens dans Claude et dis "GitHub OK" pour la suite.
echo.
pause
endlocal
