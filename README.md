# Uniweb Modules

This repository is a template for creating **modules** suitable to be used in websites made with [Uniweb CMS](https://uniwebcms.com). A Uniweb module is a collection of web blocks and components.

The [module development documentation](https://help.uniweb.app/) explains the programming framework, which is based on [React JS](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Webpack](https://webpack.js.org/).

:stopwatch: It should take about 5 minutes to get started building and testing a module using this repository.

## Getting started

Your first goal is to create your own repository and connect it live with a Uniweb website so that you can create and modify web components and see the results instantly.

- [Configuring the development toolchain](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_toolchain.md).
- [Run a web server and a public tunnel to localhost](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_with_tunnel.md)

Make sure that all packages are up to date by running `yarn`.

```bash
yarn
```

Next, start a web server on localhost and a public tunnel to it with the following command:

```bash
yarn run serve --tunnel
```

> The default tunnel uses Cloudflare quick tunnel which provides a different URL every time the web server is started. It is also possible to configure a permanent tunnel URL in the environment variables. See [how to configure a named tunnel](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_with_tunnel.md).

The final step is to build a bundle in development mode and watch the source files for changes.

```bash
yarn run watch:tunnel
```

## Module builder

The pre-installed [Uniweb module builder](https://github.com/uniwebcms/uniweb-module-builder) package is the NPM version. To use the latest version from the GitHub repository, run the following at the root level of this repository.

```bash
yarn up @uniwebcms/module-builder@https://github.com/uniwebcms/uniweb-module-builder.git
```

To use the NPM version, simply run

```bash
yarn up @uniwebcms/module-builder
```
