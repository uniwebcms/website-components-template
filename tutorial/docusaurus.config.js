const dotenv = require('dotenv');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// dotenv.config({ path: '../.env.local' });  // Enable this line to merge multiple env files
dotenv.config({ path: '../.env' });

const mode = process.env.mode;
const repo_owner = process.env.GITHUB_REPOSITORY_OWNER || '';
const repo = process.env.GITHUB_REPOSITORY || '';

if (mode === 'production' && (!repo_owner || !repo)) {
    let message =
        chalk.yellow.bold('Warning! ') +
        chalk.white(
            'Critical environment variables are missing. This could potentially occur when building in production mode locally or outside of the GitHub Pages Workflow environment. The build can still be processed, but the tutorial page may fail to load.\n\n'
        );

    message += chalk.white('The configuration will utilize the following environment variables: ') + chalk.magenta.bold('GITHUB_REPOSITORY_OWNER') + chalk.white(' and ') + chalk.magenta.bold('GITHUB_REPOSITORY');

    message +=
        chalk.green.bold('\n\n\nHint! ') +
        chalk.white('In case your are using other CI/CD tool rather than GitHub Pages, change the value of ' + chalk.cyan.bold('url') + chalk.white(' and ') + chalk.cyan.bold('baseUrl')) +
        chalk.white(' in the configuration.');

    message += chalk.white('\n\nFor more information, please read: ') + terminalLink(chalk.blue.bold('Docusaurus'), 'https://docusaurus.io/docs/api/docusaurus-config');
    console.log(message);
}

const url = `https://${repo_owner}.github.io`;
const repoName = repo.replace(repo_owner, '').replace(/^\/|\/$/g, '');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
    module.exports = {
        title: 'Website Components',
        tagline: 'Tutorial of Website Components',
        url: mode === 'production' ? url : 'https://example.com',
        baseUrl: mode === 'production' ? `/${repoName}/tutorial/` : '/',
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
