@echo off
setlocal
chcp 65001 >nul
cd /d "C:\Users\graph\Desktop\Claude App\lpmv-pwa"

echo.
echo =====================================================================
echo  LPMV-PWA — Setup interactif (3 etapes)
echo =====================================================================
echo.
echo  Ce script va te connecter a :
echo    1. Supabase (ouvre ton navigateur)
echo    2. Supabase project link (te demande le mot de passe DB)
echo    3. GitHub (ouvre ton navigateur) + cree le repo prive
echo.
echo  Garde sous la main : ton fichier Desktop\LPMV PWA.txt
echo                       (pour le mot de passe DB a l'etape 2)
echo.
pause

echo.
echo ---------------------------------------------------------------------
echo  ETAPE 1/3 : Connexion Supabase
echo ---------------------------------------------------------------------
echo  Un navigateur va s'ouvrir. Clique "Authorize Supabase CLI".
echo.
call npx supabase login
if errorlevel 1 (
    echo.
    echo  [!] Echec a l'etape 1. Verifie ta connexion internet et relance.
    pause
    exit /b 1
)

echo.
echo ---------------------------------------------------------------------
echo  ETAPE 2/3 : Liaison au projet Supabase LPMV
echo ---------------------------------------------------------------------
echo  Quand il demande "Enter your database password", colle le
echo  "DB Pass" qui est dans ton fichier Desktop\LPMV PWA.txt
echo  (le mot de passe ne s'affichera pas pendant que tu le tapes,
echo   c'est normal — colle-le et appuie Entree).
echo.
call npx supabase link --project-ref hgijgsjawkoxfmyecqxe
if errorlevel 1 (
    echo.
    echo  [!] Echec a l'etape 2. Verifie le mot de passe et relance.
    pause
    exit /b 1
)

echo.
echo ---------------------------------------------------------------------
echo  ETAPE 3/3 : Connexion GitHub + creation du repo prive
echo ---------------------------------------------------------------------
echo  Reponds :
echo    - Where? GitHub.com
echo    - Protocol? HTTPS
echo    - Authenticate? Login with a web browser
echo  Note le code a 8 caracteres affiche, puis appuie Entree,
echo  colle-le dans la page GitHub qui s'ouvre, et autorise.
echo.
"C:\Program Files\GitHub CLI\gh.exe" auth login
if errorlevel 1 (
    echo.
    echo  [!] Echec auth GitHub. Relance le script.
    pause
    exit /b 1
)

echo.
echo  Creation du repo prive "lpmv-pwa" et push initial...
"C:\Program Files\GitHub CLI\gh.exe" repo create lpmv-pwa --private --source=. --remote=origin --push
if errorlevel 1 (
    echo.
    echo  [!] Echec creation repo. Peut-etre qu'il existe deja ?
    pause
    exit /b 1
)

echo.
echo =====================================================================
echo  TERMINE — tout est connecte !
echo =====================================================================
echo.
echo  Tu peux maintenant :
echo    - supprimer le fichier Desktop\LPMV PWA.txt (plus besoin)
echo    - revenir dans Claude et dire "c'est fait" pour la suite
echo.
pause
endlocal
