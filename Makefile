BIN = ./node_modules/.bin
SCRIPT = 'microjungle'
HEADER = "`cat src/header.js`"

.PHONY: eslint
eslint:
	@$(BIN)/eslint src/

.PHONY: jscs
jscs:
	@$(BIN)/jscs src/

.PHONY: mocha
mocha:
	@$(BIN)/mocha-phantomjs test/test.html

.PHONY: test
test: eslint jscs mocha

.PHONY: strip
strip:
	@$(BIN)/uglifyjs src/$(SCRIPT).js \
		-b indent-level=4 \
		-o dist/$(SCRIPT).js \
		--preamble $(HEADER)

.PHONY: min
min:
	@$(BIN)/uglifyjs src/$(SCRIPT).js \
		-c -m \
		--preamble $(HEADER) \
		--source-map dist/$(SCRIPT).min.js.map \
		-o dist/$(SCRIPT).min.js

.PHONY: dist
dist: strip min
