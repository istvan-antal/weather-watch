def build(infrastructure):
    instance = infrastructure.create_instance('weather-watch')

    instance.provision()
    instance.setup_generic_php()

    instance.install_node()
    instance.install_bower()

    instance.clone_project('git@github.com:istvan-antal/weather-watch.git')

    instance.run_commands(
        'cd /opt/apps/weather-watch',
        'make config.php',
        'make'
    )

    instance.use_nginx_config('dev/nginx.conf')

    instance.install_my_key()

    print "Please SSH into the instance and customize config.php"