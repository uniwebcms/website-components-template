const dotenv = require('dotenv');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// dotenv.config({ path: '../.env.local' });
dotenv.config({ path: '../.env' });

const repo_owner = process.env.GITHUB_REPOSITORY_OWNER;
const repo = process.env.GITHUB_REPOSITORY;

const url = `https://${repo_owner}.github.io`;
const repoName = repo.replace(repo_owner, '').replace(/^\/|\/$/g, '');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
    module.exports = {
        title: 'Website Components',
        tagline: 'Tutorial of Website Components',
        url: url,
        baseUrl: `/${repoName}/`,
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
