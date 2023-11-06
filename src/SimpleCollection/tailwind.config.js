const path = require('path');

module.exports = {
    content: [
        '../*.{js,jsx}',
        '../**/*.js',
        path.join(path.dirname(require.resolve('@uniwebcms/express')), '**/*.js') // remove this line if your module collection does not require @uniwebcms/express
    ],
    theme: {},
    plugins: [require('@tailwindcss/line-clamp')]
};
