.PHONY: install run watch build test lint

install:
	npm install

run:
	./node_modules/.bin/nodemon --exec \
		./node_modules/.bin/babel-node -- src/server/server.js

build:
	./node_modules/.bin/webpack -d --display-error-details

watch:
	./node_modules/.bin/webpack --watch -d

test:
	./node_modules/.bin/mocha \
		--compilers="js:babel-core/register" \
		--require babel-polyfill \
		--recursive src/shared/

lint:
	./node_modules/.bin/eslint src/
