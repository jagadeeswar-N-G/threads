const path = require("path");

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  images: {
    domains: [
      'twitter-clone-bucket.s3.ap-northeast-2.amazonaws.com',  
      'threads-api-dev.s3.us-east-1.amazonaws.com',             
    ],
  },
};
