.PHONY: build
build:
	nvm use && yarn && yarn frontend:prod && yarn build

.PHONY: watch
watch: build
	find resources/views/ -type f | entr -cr yarn start:prod

.PHONY: deploy
deploy: build
	pm2 reload main
