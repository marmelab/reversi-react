.PHONY: install run test lint

install:
	npm install

run:
	node src/server.js

test:
	./node_modules/.bin/mocha \
		--compilers="js:babel-core/register" \
		--require babel-polyfill \
		--recursive src/

lint:
	./node_modules/.bin/eslint src/
