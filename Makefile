release:
	yarn build
	rm -rf ~/projects/sukovanej.github.io/pw
	cp -r build ~/projects/sukovanej.github.io/pw
