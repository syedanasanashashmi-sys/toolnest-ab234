/**
 * ToolNest - Global Site Configuration
 * Easily customize branding, domain, contact info, social links, and monetization.
 */
export const siteConfig = {
  name: 'ToolNest',
  shortName: 'ToolNest',
  tagline: 'Free Online Tools — Fast, Private & Easy',
  description: 'Fast, simple, and 100% privacy-friendly online tools that work directly in your browser. No registration, no server uploads, completely free.',
  domain: 'toolnest.netlify.app',
  url: 'https://toolnest.netlify.app',
  contactEmail: 'syedanasanashashmi@gmail.com',
  author: 'ToolNest Team',
  
  social: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    discord: 'https://discord.com',
  },

  monetization: {
    // Set to true when you want to enable AdSense placeholders or live script
    adsEnabled: true,
    adsenseClientId: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your AdSense publisher ID
    adPlaceholderText: 'ADVERTISEMENT',
    affiliatesEnabled: true,
  },

  privacyGuarantee: 'Your files and data are processed 100% inside your browser and never uploaded to any server.',
  
  copyrightYear: new Date().getFullYear(),
};
