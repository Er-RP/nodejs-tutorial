#### Run the following command in project root and create an _Package.json_

```sh
npm init
```

#### Install the following packages

```sh
npm install --save-dev babel-cli babel-preset-env babel-core
```

#### Babel is mainly used to compile JavaScript code, which will have backward compatibility.

#### To provide instructions to Babel on the same, while executing, we need to create a file called **.babelrc** in the root folder. It contains a json object with details of the presets

1. Create an **index.js** file and write some arrow function inside that.

2. Install the babel-preset-es2015 plugin

```sh
npm install save-dev babel-preset-es2015
```

3. Create a file called _.babelrc_

```sh
{
  "presets": ["es2015"]
}

```

4. Run **_npm start_** and see the output
