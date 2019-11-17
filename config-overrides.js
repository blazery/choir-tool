const rewireMobX = require('react-app-rewire-mobx');
const {
    addDecoratorsLegacy,
    useEslintRc,
    override,
} = require('customize-cra');

/* config-overrides.js */
module.exports = function override(config, env) {
    config = addDecoratorsLegacy()(config);
    config = useEslintRc()(config);
    return config;
}