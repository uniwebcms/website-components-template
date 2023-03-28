# Uniweb Website Component Template

This repository is a complete template for creating **widget collections** for the [Uniweb CMS](https://uniwebcms.com) application and the websites made with it. Each widget collection acts as a software plugin. The [widget development documentation](https://help.uniweb.app/) explains the programming framework, which is based on [React JS](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Webpack](https://webpack.js.org/).

:stopwatch: It should take about 5 minutes to get started building and testing a widget collection using this repository. You do not need to install any tools. All you need is a free [Cloudflare Pages](https://pages.cloudflare.com) project and edit access to a Uniweb website. It is also possible to build and test your widget collections locally.

## Setting up a distribution server

The building process can be done remotely or on a local computer. With a remote build, you can work entirely online by editing your code with the [GitHub code editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor) and then letting Cloudflare build a distribution bundle every time you commit changes to a selected branch. With local builds, Cloudflare is used only as a content delivery network for the distribution bundle.

### Setup step 1: Create a Cloudflare project

The first step is to configure a **free Cloudflare project** that can be used for both building and distribution, or just for distribution.

Start by creating a [Cloudflare Pages](https://pages.cloudflare.com/) project and then connecting your repository to it. If you want, you can configure your Cloudflare project to run a new build command whenever a particular branch changes. The build command is:

```bash
yarn build
```

The **target collection** of the build is defined in the environment variable `TARGET_COLLECTION` located in the `.env` file of this repository. The default value is `MainCollection`. You can edit the `.env` file and set a new value for it, or you can manage its value directly in your Cloudflare project, which has higher precedence that the one in `.env`.

Every time you commit to your main branch, a production build will be executed automatically.

> Cloudflare lets you [skip a build](https://developers.cloudflare.com/pages/platform/branch-build-controls/#skip-builds) by adding `[CI Skip]` to the commit message.

If you prefer building your distribution locally, simply leave the _Build command_ blank. Then you can commit your builds in the dist folder, or you can use [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) to push the files to Cloudflare without committing them to the repository.

### Setup step 2: Link your widget collection to a website

A widget collection can be linked to a website for production or development purposes. For development, you switch a website into **dev mode** and then provide a URL to a widget collection for testing purposes. For production, you have to create a **widget collection profile** with information about the collection. The specific steps for each case are described in the following subsections.

#### **Linking a collection for development purposes** :tractor:

Here we assume that you have access to a [Uniweb instance](https://help.uniweb.app/uniweb_instance) where you can create a [website](https://help.uniweb.app/website). You can use an existing website or create a new one. You will configure the website to request your choice of **widget collection**.

If you don't have a website, create a [docufolio](https://help.uniweb.app/docufolio) of type _website content_ and add some basic text. For example, let the content be just a single topic and some text, like a "Hello world" title. Then a create website that uses the new docufolio as its contents.

Let's begins by connecting the **Widget Collection** to the **dev mode** of a website.

1. Open a website and turn on **dev mode**.

2. Set the widget collection URL. If you are distributing your builds with Cloudflare, use the public URL of your Cloudflare project. If you are using a public tunnel to localhost, use the URL of the tunnel.
3. Apply the changes.

You should now see that the website is using the widgets defined in the widget collection that you selected.

#### **Linking your collections to a live website** :rocket:

You can link a widget collection to a docufiolio as its **default styler**. In addition, a website can override the default styler set in a source docufolio by setting its own styler.

Before linking a widget collection to a docufolio and/or to a website, you must create [widget collection profile](help.uniweb.app/creating_a_widget_collection_profile) for it with basic information about its distribution URL, description, and optional links to its documentation and source code.

In a docufolio, open its settings and choose the desired collection profile in the **Styler** field.

<!-- In the case of a docufolio, you can set the `Custom Styler` field to be the public URL plus the path to the collection.

![img.jpg](docs/assets/docufolioInfo.png) -->

## Programming widgets

You can edit the files in this repository with a local editor or with the online [GitHub code editor](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor). To edit files online, simply type <kbd>.</kbd> at any page of the repository on the GitHub website.

> The github.dev editor runs entirely in your browser’s sandbox. Your work is saved in the browser’s local storage until you commit it.

If this is your first collection, you can get started quickly by duplicating the example collection included in the repository. To do that, simply go to the `src` folder and follow these steps:

1. Duplicate the `MainCollection` to keep a copy of it.
1. Name the new copy `ExampleCollection`.
1. Work directly on the `MainCollection`.

After editing the files in the repository, remember to commit the changes so that Cloudflare starts a new build process. The steps are as follows:

1. Go to the Source Control tab on the left panel, type a message and then click the _Commit & Push_ button.
2. Go to the Source Control tab on the left panel, and [commit your changes](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor#commit-your-changes).
3. Once the Cloudflare build process is complete, you can see the results by reloading the website.

## Building collections locally

Letting Cloudflare build your collection is a good option for repositories that only have one collection in them as, for now, you cannot connect one GitHub repository to multiple Cloudflare Pages projects. For repositories with multiple collections, you have to build them locally, and use Cloudflare for distribution only. Building locally is also faster, but requires you to have Yarn installed.

Whenever possible, we recommend local builds for production and [public tunneling to localhost](#developing-with-a-localhost-tunnel) for development. For the scenario where you want the flexibility of updating website components without a computer, e.g. with your phone, using online tools for editing and building is the ideal choice. Online building is also good to get your first project started with minimal effort.

The most common setup is having a `master` branch and a `develop` branch and configuring Cloudflare to distribute the `dist` folder in the `master` branch. With that branch structure, the frequent commits are done on the `develop` branch, which is only merged into the `master` branch to make a new version publicly available.

### Publishing new bundles

Remote building is a good option to distribute production bundle of a single widget collection. However, local building is better for frequent development and/or repositories with multiple widget collections.

> You can use local building for production, development or both. To disable remote building, go to your Cloudflare project and remove the build command from it.

In local building mode, you use Yarn to build the output bundle. You can target both production and development modes. For production, you first build and then commit the distribution bundle to the git repository. Cloudflare will pick up the change and start the public distribution of the new bundle.

Make sure that the [Yarn package manager](https://yarnpkg.com/) is installed and run the basic `yarn` script at the root of the repository to install all the dependencies.

```bash
yarn
```

Before building, make sure that the `TARGET_COLLECTION` environment variable is set with the name of the collection that you want to build. You can write the setting in `.env` if you want to commit the change, or in `.env.local` if you want to be ignored in the commit (ideal when working with other team members working on different collections).

You can build and commit a new distribution bundle by running the `build:prod-commit` action.

```bash
yarn build:prod-commit
```

> You can also set the `TARGET_COLLECTION` in the build command using this syntax: `TARGET_COLLECTION=[some_name] yarn build:prod-commit`

### Developing with a localhost tunnel

For development environments, we recommend working with a public tunnel to your localhost URL instead of committing your dev builds. With that setup, you don't have to commit the changes in order for them to go live. You simply make changes to the code in your file system, and then let Yarn rebuild it automatically. You just have to reload a website linked to the collection whenever you want to see the results of your changes.

> The latest version build of your code is available to the site via the public tunnel that you opened.

Follow the instructions on working with a public tunnel to set up a tunnel and develop locally with it.

## How to create a new Widget Collection

1. Create a folder under `src` with the name of the new **widget collection**. e.g. `src/MarketingClassic`.

2. Create a `index.js` file and export all necessary components that the website may need in that file. For example, [src/MarketingClassic/index.js](./src/MarketingClassic/index.js)

3. If your widgets are built with Tailwind css, place the `tailwind.config.js` file under the root folder of the target remote. For example, [src/MarketingClassic/tailwind.config.js](./src/MarketingClassic/tailwind.config.js). Import the default Tailwind css file in `index.js`. For example, [src/MarketingClassic/index.css](./src/MarketingClassic/index.css)

## Choosing between Tailwind and Twind for widget CSS

[Tailwind](https://tailwindcss.com/) is a CSS framework based on atomic utility classes. Tailwind classes are found and defined at build time and distributed as standard CSS. In contrast, [Twind](https://twind.dev/) is a tailwind-in-js CSS framework that defines the Tailwind utility classes at runtime when they are needed.

Uniweb widgets support both approaches when building a widget collection for Uniweb-made websites. However, when building a system-level collection for the Uniweb application, the only valid option is Twind.

We recommend using Tailwind when creating a collection for a website and Twind when creating a collection for the Uniweb system.

The example `MainCollection` included in this repository includes the `tailwind.config.js` and `index.css` files that are needed to define a collection using the Tailwind framework. When building a system-level collection, there two files should can be removed from the collection's project because they are not used by Twind.