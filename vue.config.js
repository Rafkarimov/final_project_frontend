const { defineConfig } = require("@vue/cli-service");
// аналог application.yml в Vue проекте
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { port: 3000 },
});
