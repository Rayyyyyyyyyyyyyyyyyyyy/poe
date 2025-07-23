/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,vue,ts}'],
  theme: {
    screens: {
      sm: '500px',
      md: '800px',
      xl: '1280px'
    },
    extend: {
      colors: {
        // 專案可用顏色 (NTT Data)
        // normal text #3333
        primary: {
          DEFAULT: '#6785c1',
          10: '#e0e0e0', // function header background
          15: '#F5F5F5', // table header background & Dialog title background
          20: '#E0E0E0', // table Frame background
          40: '#b1c4e4',
          60: '#8facd9',
          80: '#6785c2',
          dark: '#070f26',
          welcome: '#dbdbdb'
        },

        blue: {
          DEFAULT: '#238dad',
          10: '#0072BC', //Hyperlink
          20: '#d5e4f5'
        },
        text: {
          DEFAULT: '#333',
          border: '#606266',
          welcome: '#555'
        },
        bg: {
          DEFAULT: '#dbdbdb',
          loginBorder: '#b5b5b3'
        },

        orange: {
          DEFAULT: '#e07800'
        },
        redText: {
          DEFAULT: '#ff3636'
        }
      },

      height: {
        header: '40px'
      },
      fontSize: {
        DEFAULT: '1rem', //button & context 16px
        20: '1.25rem', // dialog title & sub title 20px
        24: '1.5rem', // page header title 24px
        28: '1.75rem' // web header title 28px
      }
    }
  },
  /**
   * To avoid the conflicts on button style with Element Plus
   * https://juejin.cn/post/7084614555598323719
   */
  corePlugins: {
    preflight: false
  },
  plugins: []
}
