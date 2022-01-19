.PHONY: build
build:
	yarn build && yarn css:prod

.PHONY: watch
watch: build
	find public/ src/ resources/ | entr -cr yarn start:prod
