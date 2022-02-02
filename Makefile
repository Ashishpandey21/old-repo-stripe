.PHONY: build
build:
	yarn && yarn frontend:prod && yarn build

.PHONY: watch
watch: build
	find resources/views/ -type f | entr -cr yarn start:prod
