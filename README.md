# Weather Watch

# Requirements

 * PHP5.6+
 * Composer
 * Nginx

# Setup

```bash
make init-dev
make build
echo -e 'TARGET_HOST := yourhost\nTARGET_DIR := /path/to/weather-watch' > Makefile.config1
```

Customize: config.php

# Launching on AWS

Setup blueprint: https://github.com/istvan-antal/blueprint

and run:

```bash
make infrastructure 
```