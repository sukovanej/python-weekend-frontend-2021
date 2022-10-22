OUT_FOLDER = ~/projects/sukovanej.github.io/docs/pw

release:
	yarn build
	rm -rf $(OUT_FOLDER)
	cp -r build $(OUT_FOLDER)
