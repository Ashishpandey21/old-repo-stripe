BRANCH = $(shell git rev-parse --abbrev-ref HEAD)

.PHONY: build
build:
	yarn && yarn frontend:prod && yarn build

.PHONY: watch
watch: build
	find resources/views/ -type f | entr -cr yarn start:prod

.PHONY: pull
pull:
	git fetch --all && git reset --hard origin/$(BRANCH)

.PHONY: deploy
deploy: pull build
	pm2 reload main
