.PHONY: install run test lint

install:
	npm install

run:
	./node_modules/.bin/nodemon --exec \
		./node_modules/.bin/babel-node -- src/server/server.js

test:
	./node_modules/.bin/mocha \
		--compilers="js:babel-core/register" \
		--require babel-polyfill \
		--recursive src/shared/

lint:
	./node_modules/.bin/eslint src/
