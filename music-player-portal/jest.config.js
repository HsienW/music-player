module.exports = {
    verbose: true,
    testEnvironment: 'jest-environment-node',
    transformIgnorePatterns: ["/node_modules/"],
    collectCoverageFrom: [
        '!<rootDir>/src/registerServiceWorker.js',
        '!<rootDir>/src/serviceWorker.js',
        '!<rootDir>/node_modules/',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};

