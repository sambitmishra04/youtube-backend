- hello

## env
- URI BETTER NAEM THAN URL
- dotenv package must be installed to use this 
- as early as possible import and configure dotenv 
- make these variables available to load as soon as possible :: all should get its access
- so it is done in the first file loaded(ie index.js): fastest
- for experimrntal import
```json
"scripts": {
    "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
  },
```