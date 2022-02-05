module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./web3auth/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#063299',
        primary2: '#D63E8D',
        secondary: '#9ca3af',
        background: '#f3f4f6',
        accent: '#FFFFFF',
        mainD: '#2563eb',
        secondaryD: '#f3f4f6',
        backgroundD2: '#18181b',
        backgroundD: '#000000',
        accentD: '#18181b',
        highlightD: '#27272a'
      },
    },
  },
  plugins: [],
}