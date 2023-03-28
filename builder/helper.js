const { release, deploy } = require('uniweb-module-builder');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

const doRelease = () => {
    release(__dirname);
};

const doDeploy = (param) => {
    deploy(__dirname, param === 'commit');
};

module.exports = { doRelease, doDeploy };
