/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
  "./App.{js,jsx,ts,tsx}",
  "./src/screens/**/*.{js,jsx,ts,tsx}",
  "./src/components/**/*.{js,jsx,ts,tsx}",
  "./global.css",
],
  
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    
    extend: {},
  },
  
  
  
  
  plugins: [],

}