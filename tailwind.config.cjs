/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: '16px',
      lg: '8px',
      xl: '0px'
    },
    extend: {
      fontFamily: {
        Ubuntu: ['Ubuntu', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        'geel': '#F2C76E',
        'licht': '#eaf4f4',
        'donkergroen': '#6b9080',
        'heeldonkergroen': '#3d5248',
        'rood': '#D7594D',
        'paars': "#AB92B9",
        'achtergrond': '#F8F6F2',
        'oranje': "#F5B06F"
      },
    },
  },
  plugins: [],
}
