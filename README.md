# Uniweb Modules

This repository is a template for creating remote modules for websites made with [Uniweb CMS](https://uniwebcms.com). Each module is a collection of web components. The components that are exported to be used directly in a website are called blocks.

The [Uniweb programming framework](https://help.uniweb.app/) is based on [React JS](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Webpack module federation](https://webpack.js.org/concepts/module-federation/). A website is assigned a single remote module, which is made out of several web components. Different websites can use the same module. A repository can host multiple modules, and components in different modules can share common components across modules.

## Quick start

The goal is to create a repository and connect it with a test website so that you can create and modify web components and see the results instantly.

If you already have Node.js, Yarn and a code editor such as VS Code installed, you are ready to start. Otherwise [configuring the development toolchain](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_toolchain.md) first.

Next, you will need 2 terminal windows: one to run a web server, and another to build the project and watch for code changes.

1. **Initialize** the project dependencies

``` bash
yarn
```

2. Start a **web server** with a public tunnel pointing to it

``` bash
yarn serve --tunnel
```

The web server will serve the files located under the folder `build_dev`. Initially, the folder will contain a single file named `quick-tunnel.txt` with the URL of the current [Cloudflare quick tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/do-more-with-tunnels/trycloudflare/) pointing to http://localhost:3005.

> You should be able to see the contents of `build_dev` at http://localhost:3005 and also at the URL saved in `build_dev/quick-tunnel.txt`.

3. In another terminal, **build and watch** the current module as set in the environment variable `TARGET_MODULE` in the `.env` file.

``` bash
yarn watch
```

A bundle of JavaScript files will be built in dev mode and saved to the subfolder `build_dev/[module-name]` folder. The source files under the `src` folder will be watched for changes and the bundle will be rebuilt as necessary.

4. [Create a test website](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_with_tunnel.md#connecting-the-module-to-a-website) and set the Dev Mode URL to the URL produced in the last step. Continue developing the components in your module and testing them on the test website.

![img.jpg](https://github.com/uniwebcms/uniweb-module-builder/raw/main/docs/assets/dev_mode.jpg)

1. [Release a production version](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/prod_distribution.md) when desired. Then configure websites and/or website templates to use the production URL of the module.
