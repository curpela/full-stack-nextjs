require("dotenv").config();
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
  withSass({
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000
          }
        }
      });

      return config;
    },
    env: {
      API_URI: process.env.API_URI,
      GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API
    }
  })
);


