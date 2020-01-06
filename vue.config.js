module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-hacker-news-app/dist/" : "/",
  outputDir: "dist",
  indexPath: "../index.html"
};
