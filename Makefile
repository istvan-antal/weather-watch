ifneq ($(wildcard Makefile.config),)
    include Makefile.config
endif

build: check web/bower_components web/shared/typings web/angular2/typings
	cd web/shared; ../../node_modules/.bin/tsc
	cd web/angular2; ../../node_modules/.bin/tsc

web/shared/typings: web/shared/tsd.json
	cd web/shared; ../../node_modules/.bin/tsd reinstall
	cd web/shared; ../../node_modules/.bin/tsd rebundle
	touch web/shared/typings

web/angular2/typings: web/angular2/tsd.json
	cd web/angular2; ../../node_modules/.bin/tsd reinstall
	cd web/angular2; ../../node_modules/.bin/tsd rebundle
	touch web/angular2/typings

clean:
	rm -fr node_modules
	rm -fr web/bower_components
	rm -fr web/angular2/typings
	rm -fr web/shared/typings

deploy: build
	git push
	ssh $(TARGET_HOST) 'cd $(TARGET_DIR); git pull; make'

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

config.php:
	cp config.sample.php config.php