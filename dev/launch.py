#!/usr/bin/env python
from blueprint import Infrastructure
import argparse

parser = argparse.ArgumentParser(description='Launch the application.')
parser.add_argument('--env', metavar='env', type=str, help='Environment to launch in.', default='dev')
parser.add_argument('--name', metavar='name', type=str, help='Application name.', default='weather-watch')
args = parser.parse_args()

blueprint = Infrastructure(environment=args.env)
instance = blueprint.create_instance(id=args.name)

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

instance.use_nginx_config('nginx.conf')

instance.install_my_key()

print "Please SSH into the instance and customize config.php"