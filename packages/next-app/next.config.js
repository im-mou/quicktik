/** @type {import('next').NextConfig} */

const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

const nextConfig = {
    reactStrictMode: true,
    webpack: (config, options) => {
        // @To-do setup build hash/version from git
        const newconfig = config.plugins.push(new GitRevisionPlugin());

        // Important: return the modified config
        return config;
    },
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/' },
            '/welcome': { page: '/welcome' }
        };
    },
    images: {
        loader: 'custom'
    }
};

module.exports = nextConfig;
