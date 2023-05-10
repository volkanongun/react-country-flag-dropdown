TODO:

[x] find a way to copy images folder to esm and cjs folders for dry-run
[ ] publish package
[ ] install and test

npm publish --dry-run
npm login
npm publish

// obsolete scripts
"build": "npm run esm && npm run cjs",
"cjs": "tsc --build --module commonjs --outDir dist/cjs && npm run copy-files-cjs",
"copy-files-cjs": "copyfiles -u 1 src/images/**/\*.svg src/PhoneNumberSelectorWithFlags/**/\*.css dist/cjs/",
