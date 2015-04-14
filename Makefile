build:
	composer install
	cd web; bower install

infrastructure:
	cd dev; ./launch.py

check:
	./vendor/bin/phpcs --extensions=php --standard=dev/CC -s src/
	./vendor/bin/phpmd src/ text dev/phpmd.xml
	./vendor/bin/phpunit src/

init-dev: config.php
	rm -fr dev/blueprint
	git clone git@github.com:istvan-antal/blueprint.git dev/blueprint
	
config.php:
	cp config.sample.php config.php