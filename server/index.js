const exec = require('child_process').exec;
const dotenv = require('dotenv');

dotenv.config({ path: '../.env.dev' });
dotenv.config({ path: '../.env' });

const port = process.env.DEV_SERVER_PORT;

const serve = () => {
    const serveProcess = exec(
        `yarn run http-server ../build_dev -p=${port} --cors`
    );
    serveProcess.stdout.on('data', function (data) {
        console.log(data);
    });
};

serve();
