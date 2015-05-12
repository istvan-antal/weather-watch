# Weather Watch

# Requirements

 * PHP5.6+
 * Composer
 * Nginx

# Setup

```bash
make init-dev
make build
echo -e 'TARGET_HOST := yourhost\nTARGET_DIR := /path/to/weather-watch' > Makefile.config
```

Customize: config.php

# Launching on AWS

Setup constructor: https://github.com/istvan-antal/constructor

and run:

```bash
construct
```

Git  hook setup
===============
```bash
printf '#!/bin/bash\nmake check\n' > .git/hooks/pre-commit; chmod +x .git/hooks/pre-commit
printf '#!/bin/bash\nmake' > .git/hooks/post-merge; chmod +x .git/hooks/post-merge
```