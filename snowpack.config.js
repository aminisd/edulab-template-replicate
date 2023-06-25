module.exports = {
    mount: {
        src: '/',
    },
    buildOptions: {
        out: 'dist',
        // Configure Snowpack's rollupOptions to create a single entry point
        rollupOptions: {
            input: {
                main: './src/js/main.js',
            },
        },
    },
};
