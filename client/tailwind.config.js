/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/scenes/*.{js,jsx,ts,tsx}",

    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '100': '100',
      },
      spacing: {
        'ex': '45px',
        '65': '150px',
        '69': '100px',
        '71.5': '1px',
        '102': '110px',
        '74': '90px',
        '76': '18rem',
        '81': '20rem',
        '82': '21rem',
        '83': '22rem',
        '94': '32rem',
        '108': '34rem',
        '114': '40rem',
        '160': '80rem',
        '240': '240rem',
        '200': '205px',
        '310': '310px',
        '350': '350px',
        '400': '400px',
        '700': '750px',
        '850': '850px',
        '900': '900px',
        '950': '950px',
        '1000': '1000px',
        '1200': '1200px',
        '0.1': '0.05rem',
        '22': '12rem',
      },
      boxShadow: {
        even: '2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

