@ECHO off
REM A wrapper script for `git.exe`
SETLOCAL

SET "_dp0=%~dp0"
IF NOT EXIST "%_dp0%bin\git.exe" (
  SET "_prog=git"
  GOTO :end
)

where /Q $path:git || ( SET "_firstGitExe=" && GOTO :next )

FOR /F "delims=" %%i IN ('where $path:git') DO (
  SET "_firstGitExe=%%i"
  GOTO :next
)

:next
IF NOT "%_firstGitExe%"=="%_dp0%bin\git.exe" (
  SET "PATH=%_dp0%bin;%PATH%"
)

SET "_prog=%_dp0%bin\git.exe"

IF EXIST "%_dp0%bin\ca-bundle.crt" (
  SET "_opt= -c http.sslcainfo="%_dp0%bin\ca-bundle.crt""
) ELSE (
  SET "_opt="
)

:end
REM where $path:git
ECHO 1 %_firstGitExe%
ECHO 2 %_prog%
ECHO 3 %PATH%
pause
ECHO.
ECHO "%_prog%"%_opt% %*
ECHO.

"%_prog%"%_opt% %*

ENDLOCAL
EXIT /b %errorlevel%
