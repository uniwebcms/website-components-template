const dotenv = require('dotenv');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// dotenv.config({ path: '../.env.local' });  // Enable this line to merge multiple env files
dotenv.config({ path: '../.env' });

let url, baseUrl;

const { npm_lifecycle_event, TUTORIAL_SITE_URL, TUTORIAL_SITE_BASE_URL, GITHUB_REPOSITORY_OWNER, GITHUB_REPOSITORY } = process.env;

switch (npm_lifecycle_event) {
    case 'start':
    case 'build:dev':
    case 'serve:dev':
        url = 'http://localhost';
        baseUrl = '/';
        break;
    case 'build:prod':
    case 'serve:prod':
        if (TUTORIAL_SITE_URL && TUTORIAL_SITE_BASE_URL) {
            url = TUTORIAL_SITE_URL;
            baseUrl = TUTORIAL_SITE_BASE_URL;
        } else {
            let message =
                chalk.yellow.bold('Warning! ') +
                chalk.white('Critical environment variables are missing. This could potentially occur when building in production mode locally without setting the value of: ') +
                chalk.magenta.bold('TUTORIAL_SITE_URL') +
                chalk.white(' and ') +
                chalk.magenta.bold('TUTORIAL_SITE_BASE_URL') +
                chalk.white('.');

            message += chalk.blue.bold('\n\nHint! ') + chalk.white('Double check the value in .env\n');
            console.log(message);

            throw new Error("Error occurs when build or serve under development mode: 'build:prod' | 'serve:prod'");
        }
    case 'build:GH':
        if ((GITHUB_REPOSITORY_OWNER, GITHUB_REPOSITORY)) {
            url = GITHUB_REPOSITORY_OWNER;
            baseUrl = GITHUB_REPOSITORY;
        } else {
            let message = chalk.yellow.bold('Warning! ') + chalk.white('Critical environment variables are missing. This could potentially occur when building in production mode outside of the GitHub Actions Workflow environment.');
            message += chalk.blue.bold('\n\nHint! ') + chalk.white('If you want to build locally in production mode, try ') + chalk.cyan.bold('build:prod') + chalk.white('.\n');

            console.log(message);

            throw new Error("Error occurs when build under development mode: 'build:GH'");
        }
}

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
    module.exports = {
        title: 'Website Components',
        tagline: 'Tutorial of Website Components',
        url,
        baseUrl,
        onBrokenLinks: 'warn',
        onBrokenMarkdownLinks: 'warn',
        favicon: 'img/favicon.png',
        presets: [
            [
                '@docusaurus/preset-classic',
                /** @type {import('@docusaurus/preset-classic').Options} */
                ({
                    theme: {
                        customCss: require.resolve('./src/css/custom.css')
                    }
                })
            ]
        ],
        themeConfig:
            /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
            ({
                navbar: {
                    title: 'Docs',
                    logo: {
                        alt: 'UNIWEB Logo',
                        src: 'img/uniweb_black.svg',
                        srcDark: 'img/uniweb_white.svg',
                        width: 120,
                        style: { marginRight: '18px' }
                    },
                    items: [
                        {
                            type: 'doc',
                            docId: 'SimpleCollection/block',
                            position: 'left',
                            label: 'Components'
                        }
                    ]
                },
                footer: {
                    style: 'dark',
                    logo: {
                        alt: 'UNIWEB Logo',
                        src: 'img/uniweb_white.svg',
                        width: 160,
                        height: 51
                    },
                    links: [
                        {
                            label: 'Docs',
                            to: '/'
                        },
                        {
                            label: 'Components',
                            to: '/docs/SimpleCollection/block'
                        }
                    ],
                    copyright: `Copyright © ${new Date().getFullYear()} @uniwebcms/website-component-template. Built with Docusaurus.`
                },
                prism: {
                    theme: lightCodeTheme,
                    darkTheme: darkCodeTheme
                }
            })
    }
);
