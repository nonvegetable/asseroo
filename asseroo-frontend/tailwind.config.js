import { heroui } from "@heroui/react"

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          50: "#fefaf5",
          100: "#fdf5eb",
          200: "#fce8d8",
          300: "#f9d9c1",
          400: "#f4c9a9",
          500: "#f0b892",
          600: "#e8a981",
          700: "#e09a70",
          800: "#d8895f",
          900: "#d0744e",
        },
        cream: {
          50: "#fffbf5",
          100: "#fff9f0",
          200: "#fff2e6",
          300: "#ffe8d6",
          400: "#ffdec6",
          500: "#ffd4b5",
          600: "#f5c8a0",
          700: "#e8b88a",
          800: "#dba875",
          900: "#ce985f",
        },
        softBlue: {
          50: "#f5f9fd",
          100: "#eef5fc",
          200: "#dde9f8",
          300: "#ccddf4",
          400: "#bbd1f0",
          500: "#aac5ec",
          600: "#98b9e8",
          700: "#86ade4",
          800: "#74a1e0",
          900: "#6295dc",
        },
        softPink: {
          50: "#fef7f9",
          100: "#fef0f4",
          200: "#fce1ea",
          300: "#fad2e0",
          400: "#f8c3d6",
          500: "#f6b4cc",
          600: "#efa3bd",
          700: "#e892ae",
          800: "#e1819f",
          900: "#da7090",
        },
        softPurple: {
          50: "#faf8fe",
          100: "#f5f1fc",
          200: "#ebe3fa",
          300: "#e1d5f8",
          400: "#d7c7f6",
          500: "#cdb9f4",
          600: "#c3abf2",
          700: "#b99df0",
          800: "#af8fee",
          900: "#a581ec",
        },
        softGreen: {
          50: "#f7fdf9",
          100: "#f0fbf3",
          200: "#e1f6e8",
          300: "#d2f1dd",
          400: "#c3ecd2",
          500: "#b4e7c7",
          600: "#a5e2bc",
          700: "#96ddb1",
          800: "#87d8a6",
          900: "#78d39b",
        },
      },
      backgroundImage: {
        "gradient-pastel":
          "linear-gradient(135deg, #ffffff 0%, #f5f9fd 30%, #eef5fc 60%, #fef0f4 100%)",
        "gradient-cream":
          "radial-gradient(circle at 20% 50%, rgba(255, 245, 235, 0.8), transparent 50%), radial-gradient(circle at 80% 80%, rgba(239, 163, 189, 0.1), transparent 50%), linear-gradient(to bottom, #fffbf5, #fef9f0)",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)",
        "soft-md": "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#4a4a4a",
            primary: {
              DEFAULT: "#aac5ec",
              foreground: "#243a59",
            },
            secondary: {
              DEFAULT: "#fce1ea",
              foreground: "#5a3a45",
            },
            success: {
              DEFAULT: "#b4e7c7",
              foreground: "#2d4a3f",
            },
            warning: {
              DEFAULT: "#f9d9c1",
              foreground: "#5a3a2a",
            },
            danger: {
              DEFAULT: "#f4a8a8",
              foreground: "#5a2a2a",
            },
            info: {
              DEFAULT: "#cdb9f4",
              foreground: "#4a3a5a",
            },
          },
        },
      },
    }),
  ],
}

export default config
