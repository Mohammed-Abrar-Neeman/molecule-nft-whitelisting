//const defaultTheme = require("tailwindcss/defaultConfig");

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  //important: true,
  theme: {
    //...defaultTheme,
    colors: {
      //...defaultTheme.colors,
      primary: '#E1A346',
      white: '#ffffff',

      net_apr: '#1225259E',
      card_button_bg: '#D1D5DB',
      card_button_text: '#111928A8',
      stats_platform: '#929B9B',
      stats_percetage: '#00A478',
      dark_sidebar: '#0F0B1C',
      dark_card_heading: '#FFFFFF9E',
      dark_portfolio_bg: '#1A1A1A',
      stats_percetage_negative: '#FF2626',
      dark_deposit_btn: '#3F3F3FAD',
      dark_toggle_btn: '#2F2E2E',
      sidebar_text: '#FD4E05',
      sidebar_user: '#2D3648',

      text: {
        DEFAULT: '#122525',
        light: '#6C7281',
      },
      light: {
        DEFAULT: '#122525',

        lighter: '#1225259E',
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Poppins', 'serif'],
    },
    fontSize: {
      titans_tittle: ['36px', '43px'],
      titans_card_tittle: ['26px', '31px'],
      titans_card_value: ['50px', '60px'],
      titans_card_sub_title: ['15px', '18px'],
      titans_card_sub_value: ['18px', '21px'],
      titans_card_button: ['16px', '24px'],
      titans_stats_coin_name: ['21px', '32px'],
      titans_stats_pl_name: ['19px', '28px'],
      titans_stats_percentage: ['22px', '33px'],
      titans_molecule_text: ['31px', '46px'],
    },
    fontWeight: {
      titans_fw_300: 300,
      titans_fw_500: 500,
      titans_fw_600: 600,
      titans_fw_400: 400,
    },
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [require('flowbite/plugin')],
};
