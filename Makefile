build: check web/bower_components
	

infrastructure:
	cd dev; ./launch.py

check: node_modules vendor
	./node_modules/.bin/jshint web/js/*.js
	./node_modules/.bin/jscs web/js/*.js
	./node_modules/.bin/csslint --ignore=ids --errors=empty-rules web/css/*.css
	./vendor/bin/phpcs --extensions=php --standard=dev/CC -s src/
	./vendor/bin/phpmd src/ text dev/phpmd.xml
	./vendor/bin/phpunit src/
	
web/bower_components: web/bower.json
	cd web; bower install
	
vendor: composer.json
	composer install
	touch vendor
	
node_modules: package.json
	npm install
	touch node_modules

init-dev: config.php
	rm -fr dev/blueprint
	git clone git@github.com:istvan-antal/blueprint.git dev/blueprint
	
config.php:
	cp config.sample.php config.php