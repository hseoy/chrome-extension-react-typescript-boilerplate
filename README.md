# Chrome Extension with React & TypeScript

## Getting started

1. Create a project based on this boilerplate.

```
$ npx degit https://github.com/hseoy/chrome-extension-react-typescript-boilerplate <project name>
```

2. install the dependencies.

```
$ yarn install
```

3. To build the extension, and rebuild it when the files are changed, run

```
$ yarn dev
```

4. Now a directory named `dist` is created. You have to add this directory to your Chrome browser:

```
1. Open Chrome.
2. Navigate to `chrome://extensions`.
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the `dist` directory
```
