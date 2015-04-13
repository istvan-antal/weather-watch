build:
	composer install
	cd web; bower install

infrastructure:
	cd dev; ./launch.py

init-dev: config.php
	rm -fr dev/blueprint
	git clone git@github.com:istvan-antal/blueprint.git dev/blueprint
	
config.php:
	cp config.sample.php config.php