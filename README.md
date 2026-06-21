# Omni - All-in-One Utility Tools

<div align="center">

A comprehensive suite of **free, production-ready tools** for calculators, unit converters, developer utilities, text processing, and SEO optimization.

[Live Demo](#) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Tools](#tools-included)

</div>

---

## 📋 Overview

Omni is a feature-rich web application that brings together 30+ utility tools in a single platform. From financial calculators to developer tools, unit converters to SEO utilities, Omni provides everything you need in one place.

Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS** for optimal performance and user experience.

---

## ✨ Features

- 🧮 **30+ Calculators** - EMI, CGPA, GPA, BMI, Age, Percentage, Retirement, and more
- 🔄 **Unit Converters** - Length, Temperature, Data Storage conversions
- 🛠️ **Developer Tools** - Base64 encoder/decoder, JSON formatter, JWT decoder, Regex tester, UUID generator, Password generator, Hash generator, Color converter, URL encoder/decoder
- 📝 **Text Utilities** - Word counter with detailed analytics
- 🔍 **SEO Tools** - Meta tag generator, XML sitemap generator
- 📚 **Educational Guides** - Comprehensive blog posts and FAQs
- 🎯 **Command Palette** - Quick access to all tools with keyboard shortcuts
- 🧭 **Breadcrumb Navigation** - Easy navigation through the app
- 👤 **User Hub** - Personalized user experience
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times

---

## 🔧 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, PostCSS
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Backend:** Express.js (optional)
- **API:** Google Gemini API
- **Animation:** Motion

---

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd omni
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local file
   echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local
   ```

   - Get your Gemini API key from [Google AI Studio](https://ai.google.dev)

4. **Start the development server**
   ```bash
   npm run dev
   ```

   - The app will be available at `http://localhost:3000`

---

## 🚀 Usage

### Development

```bash
# Start dev server with sitemap generation
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run lint

# Clean build artifacts
npm run clean
```

### Project Structure

```
src/
├── components/          # Reusable React components
│   ├── calculators/    # Calculator tools
│   ├── converters/     # Unit converter tools
│   ├── devtools/       # Developer tools
│   ├── seo/            # SEO utilities
│   └── text/           # Text processing tools
├── blog/               # Blog post components
├── data/               # Configuration and static data
├── lib/                # Utility functions and hooks
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

---

## 🛠️ Tools Included

### Calculators

- Age Calculator
- BMI Calculator
- Percentage Calculator
- Marks/GPA Calculator
- EMI Calculator
- SIP Calculator
- Retirement Calculator
- Inflation Calculator
- And 15+ more specialized calculators

### Converters

- Length Converter
- Temperature Converter
- Data Storage Converter

### Developer Tools

- Base64 Encoder/Decoder
- JSON Formatter & Validator
- JWT Decoder
- Regex Tester
- Password Generator
- UUID Generator
- Hash Generator
- Color Converter
- URL Encoder/Decoder

### SEO Tools

- Meta Tag Generator
- XML Sitemap Generator

### Text Utilities

- Word Counter with Analytics

---

## 📖 Features Documentation

### Command Palette

Press `Ctrl+K` (or `Cmd+K` on Mac) to open the command palette for quick navigation to any tool.

### Responsive Design

The app is fully responsive and works on:

- Desktop browsers
- Tablets
- Mobile devices

### SEO Optimized

- Automatic XML sitemap generation
- Meta tag management
- SEO report generator

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. Ensure TypeScript types are properly defined
2. Follow the existing component structure
3. Use Tailwind CSS for styling
4. Test on multiple devices/browsers
5. Update documentation as needed

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🐛 Issues & Support

If you encounter any issues or have suggestions, please open an issue on the repository.

---

## 📞 Contact

For questions or feedback, please reach out through the repository's issue tracker.

---

<div align="center">

**Made with ❤️ for developers and students**

</div>
