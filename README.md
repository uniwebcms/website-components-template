# Uniweb Modules

This repository is a template for creating remote modules for websites made with [Uniweb CMS](https://uniwebcms.com). Each module is a collection of web components. The components that are exported to be used directly in a website are called blocks.

The [Uniweb programming framework](https://help.uniweb.app/) is based on [React JS](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Webpack module federation](https://webpack.js.org/concepts/module-federation/). A website is assigned a single remote module, which is made out of several web components. Different websites can use the same module. A repository can host multiple modules. Components in different modules can share common components across modules.

## Quick start

The goal is to create a repository and connect it with a test website so that you can create and modify web components and see the results instantly.

If you already have Node.js, Yarn and a code editor such as VS Code installed, you are ready to start. Otherwise [configure the development toolchain](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_toolchain.md) first.

Next, you will need 2 terminal windows: one to run a web server, and another to build the project and watch for code changes.

**Step 1**: **Initialize** the project dependencies

``` bash
yarn
```

**Step 2**: Start a **web server** with a public tunnel pointing to it

``` bash
yarn serve --tunnel
```

The web server will serve the files located under the folder `build_dev`. Initially, the folder will contain a single file named `quick-tunnel.txt` with the URL of the current [Cloudflare quick tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/do-more-with-tunnels/trycloudflare/) pointing to http://localhost:3005. The quick tunnel URL changes everytime the server is started and has the form `https://[tunnel-sub-domain].trycloudflare.com`. 

**Note**: It's possible to skip the creation of the quick tunnel by not passing the `--tunnel` option when starting the server. Instead, set the URL of a permanent tunner (e.g. from [Pagekite](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/pagekite.md)) in the variable `TUNNEL_URL` in a `.env.dev` file.

> You should be able to see the contents of `build_dev` at http://localhost:3005 and also at the URL saved in `build_dev/quick-tunnel.txt`.

**Step 3**: In another terminal, **build and watch** the current **target module**. The name of the target module is set in the environment variable `TARGET_MODULE` in the `.env` file or in your own `.env.dev` file (not committed).

``` bash
yarn watch
```

A bundle of JavaScript files will be built in dev mode and saved to the subfolder `build_dev/[module-name]`. The default module name is `SimpleCollection`. All source files under the `src` folder are watched for changes and the target bundles are rebuilt as necessary.

The output of the watch script gives you the URL that you need to copy and paste to connect a test website with your dev environment.

```diff
+ Dev URL: https://[tunnel-sub-domain].trycloudflare.com/SimpleCollection
```

> Note: When connecting a website with a module, the URL must include the module name in its path because there might be several modules hosted under the same domain.

**Step 4**: [Create a test website](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_with_tunnel.md#connecting-the-module-to-a-website), turn on its **Dev Mode**, and set the dev-mode **Website  Styler** to the URL produced in the last step (see the picture below). Continue developing the components in your module and reload the website to get the latest test bundle as it changes.

![img.jpg](https://github.com/uniwebcms/uniweb-module-builder/raw/main/docs/assets/dev_mode.jpg)

**Step 5**: [Release a production version](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/prod_distribution.md) when desired. Then configure websites and/or website templates to use the production URL of the module.
