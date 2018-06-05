DEVELOP_CONTAINER_NAME=zonky_docker_node_dev
DEVELOP_IMAGE=node:latest

.PHONY: help
# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html


help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

docker-develop:  ## Start docker container with development environment
	@ docker run \
		--name $(DEVELOP_CONTAINER_NAME) \
		-p 4200:4200 \
		-v $(PWD):/app \
		-ti \
		--entrypoint bash \
		$(DEVELOP_IMAGE)

docker-stop: ## Stop docker environment container and remove it
	@ docker rm $(DEVELOP_CONTAINER_NAME)