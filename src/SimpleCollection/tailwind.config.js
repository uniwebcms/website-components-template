const path = require('path');

module.exports = {
    content: ['../*.{js,jsx}', '../**/*.js', path.join(path.dirname(require.resolve('@uniwebcms/express')), '**/*.js')],
    theme: {},
    plugins: [require('@tailwindcss/line-clamp')]
};
