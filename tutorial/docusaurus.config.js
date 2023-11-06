const dotenv = require('dotenv');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const getConfig = require('@uniwebcms/tutorial-builder/config');

dotenv.config({ path: '../.env' });
// dotenv.config({ path: '../.env.local' });   // enable this line if you want to have a local .env file

const themeConfig = {
    prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
    }
};

module.exports = getConfig(process.env, themeConfig);
