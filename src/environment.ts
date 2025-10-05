export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  googleAnalyticsId: '',
  sentryDsn: '',
  version: '1.0.0-dev',
  features: {
    blog: true,
    analytics: false,
    pwa: true,
    animations: true,
  },
  cache: {
    maxAge: 5 * 60 * 1000,
    maxSize: 10 * 1024 * 1024,
  },
  social: {
    github: 'https://github.com/Agerday',
    linkedin: 'https://linkedin.com/in/adrien-gerday',
    email: 'adrien.gerday@gmail.com',
  },
};
