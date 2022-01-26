.PHONY: build
build:
	yarn build && yarn frontend:prod

.PHONY: watch
watch: build
	find resources/ -type f | entr -cr yarn start:prod
