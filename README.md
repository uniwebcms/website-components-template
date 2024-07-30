# Component Libraries

This repository is a template for creating component libraries for websites made with [Uniweb CMS](https://uniwebcms.com). Each library is a collection of web components. Create a new repository from this [GitHub template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) as shown in the image below.

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="300">

The [Uniweb programming framework](https://help.uniweb.app/) is based on [React JS](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Webpack module federation](https://webpack.js.org/concepts/module-federation/). A website is assigned a single remote module, which is made out of several web components. Different websites can use the same module. A repository can host multiple modules. Components in different modules can share common components across modules.

## Quick start for production 🏭

The simplest build-and-deploy approach is to [use the included GitHub workflow](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/build_and_deploy_with_gh_actions.md), which uses GitHub Pages for hosting the distribution files. Another good option is to [use Cloudflare Pages](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/prod_distribution.md); it's free but you must create an account first.

If [GitHub Actions are enabled](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/build_and_deploy_with_gh_actions.md), after about a minute and a half, a new code distribution and a tutorial website will be available at

```
https://USER-NAME.github.io/REPO-NAME
```

⏱️It only takes a minute to configure the build and deploy tasks. Once configured, new commits to the `main` branch will perform new deployments automatically. For development, it is recommended to [create a branch](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository) named `develop` and make all your commits to it. When ready to release a production version of your modules, [merge](https://nira.com/how-to-merge-branches-in-github/) the `develop` branch into `main` branch so that the build-and-deploy workflow is triggered from the `main` branch.

## Quick start for development 🐛

The goal is to create a repository and connect it with a test website so that you can create and modify web components and see the results instantly.

The included sever project provides a simple yet powerful solution for quickly serving local files over the internet using a combination of web server and a temprary Cloudflare's Quick Tunnel. 

**⚠ Important**: Install the `Cloudflared` command and make sure it's in your PATH. For the latest installation instructions, visit: [Cloudflare Tunnel
Downloads](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)

> 🗒 It is also possible to use a permanent tunnel URL. For example, you can set up a [Cloudflare named tunnel](https://developers.cloudflare.com/pages/how-to/preview-with-cloudflare-tunnel/) or a [Pagekite tunnel](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/pagekite.md). If using a permanent tunnel, set the `TUNNEL_URL` property in your `.env.dev` file to the tunnel's URL.

If you already have Node.js, Yarn and a code editor such as VS Code installed, you are ready to start. Otherwise [configure the development toolchain](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_toolchain.md) first.

Next, you will need 2 terminal windows: one to run a web server, and another to build the project and watch for code changes.

**Step 1**: **Initialize** the project dependencies

``` bash
yarn
```

**Step 2**: Start a **web server** with a public tunnel pointing to it

``` bash
yarn start
```

The web server will serve the files located under the folder `build_dev`. Initially, the folder will contain a single file named `quick-tunnel.txt` with the URL of the current [Cloudflare quick tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/do-more-with-tunnels/trycloudflare/) pointing to http://localhost:3005. The quick tunnel URL changes everytime the server is started and has the form `https://[tunnel-sub-domain].trycloudflare.com`. 

> 🗒 You should be able to see the contents of `build_dev` at http://localhost:3005 and also at the URL saved in `build_dev/quick-tunnel.txt`.

**Step 3**: In another terminal, **build and watch** the current **target module**. The name of the target module is set in the environment variable `TARGET_MODULE` in the `.env` file or in your own `.env.dev` file (not committed).

``` bash
yarn watch
```

A bundle of JavaScript files will be built in dev mode and saved to the subfolder `build_dev/[module-name]`. The default module name is `SimpleCollection`. All source files under the `src` folder are watched for changes and the target bundles are rebuilt as necessary.

The output of the watch script gives you the URL that you need to copy and paste to connect a test website with your dev environment.

```diff
+ Dev URL: https://[tunnel-sub-domain].trycloudflare.com/SimpleCollection
```

> 🗒 When connecting a website with a module, the URL must include the module name in its path because there might be several modules hosted under the same domain.

**Step 4**: [Create a test website](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/dev_with_tunnel.md#connecting-the-module-to-a-website), turn on its **Dev Mode**, and set the dev-mode **Website  Styler** to the URL produced in the last step (see the picture below). Continue developing the components in your module and reload the website to get the latest test bundle as it changes.

![img.jpg](https://github.com/uniwebcms/uniweb-module-builder/raw/main/docs/assets/dev_mode.jpg)

**Step 5**: Release a production version with either [GitHub Pages](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/build_and_deploy_with_gh_actions.md) (simplest option) or [Cloudflare Pages](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/prod_distribution.md) (it's free but you must create an account first). Once configured, commits to the `main` branch will perform new deployments automatically. To avoid deploying a development version of a module, it is recommended to create a `develop` branch and perfom all coding on that branch. When the code is ready, you can merge the `develop` branch into the `main` branch, which will then trigger the build and deploy tasks. 

**Step 6**: Configure websites and/or website templates to use the production URL of the module.

## Next steps

- [Content and template editing with Docufolio](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/docufolio.md)
- [Web theme for websites and templates](https://github.com/uniwebcms/uniweb-module-builder/blob/main/docs/webthemes.md)
- [Examples of web components](https://github.com/uniwebcms/express/tree/main/src/blocks)
