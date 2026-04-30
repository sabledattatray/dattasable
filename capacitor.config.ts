import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dattasable.app',
  appName: 'DattaSable',
  webDir: 'out',
  server: {
    // This is the magic! The app will load your live site.
    // All updates to the site appear instantly in the app.
    url: 'https://dattasable.com',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
