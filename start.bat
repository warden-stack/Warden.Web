IF "%1"=="" ( SET "APP_ENV=local" ) ELSE ( SET "APP_ENV=%1" )
IF "%2"=="" ( SET "WATCH=-w" ) ELSE ( SET "WATCH=%2" )
if "%APP_ENV"=="-n" (
	SET "WATCH="-n"
	SET "APP_ENV=local"
)
IF "%WATCH"=="-w" (
	node node_modules/aurelia-cli/bin/aurelia-cli.js run --env %APP_ENV --watch
)
ELSE (
	node node_modules/aurelia-cli/bin/aurelia-cli.js build --env %APP_ENV
	node node_modules/pushstate-server/bin/pushstate-server . 9000
)

