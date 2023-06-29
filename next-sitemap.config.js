/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.marku.me',
    outDir: './out',
    changefreq: "weekly",
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ["/404"],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
    },
  };