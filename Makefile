init-dev:
	rm -fr dev/blueprint
	git clone git@github.com:istvan-antal/blueprint.git dev/blueprint

build:
	composer install
	
infrastructure:
	cd dev; ./launch.py