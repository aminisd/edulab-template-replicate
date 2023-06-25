module.exports = {
    mount: {
        src: '/',
    },
    buildOptions: {
        out: 'dist',
        // Configure Snowpack's rollupOptions to create a single entry point
        rollupOptions: {
            input: {
                main: './src/js/script.js',
            },
        },
    },
    optimize: {
      bundle: true,
      minify: true,
      target: 'es2018',
    },
};
