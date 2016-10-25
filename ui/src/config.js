require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiBaseUrl: process.env.API_URL || 'https://api.github.com',
  app: {
    title: 'React Universal Saga Modular',
    description: 'Universal & Modular React Kit ft. Redux Saga',
    head: {
      titleTemplate: 'RasperryPi Morse Interpreter',
      meta: [
        { name: 'description',
          content: 'A simple morse interpreter from web text input to blinking LED.'
        },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Raspberry Pi Morse Interpreter' },
        { property: 'og:image', content: 'https://facebook.github.io/react/img/logo_og.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Raspberry Pi Morse Interpreter' },
        {
          property: 'og:description',
          content: 'A simple morse interpreter from web text input to a blinking LED.'
        }
      ]
    }
  },
}, environment);
