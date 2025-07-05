# 🚀 GitHub Explorer

A modern, beautiful React application for discovering GitHub users and exploring their repositories. Built with TypeScript, Vite, and a GitHub-inspired design system.

![GitHub Explorer](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Live Demo

🌐 **[Try it live!](https://asruldev.github.io/sigithub/)**

## 🎯 Features

### 🔍 **Smart Search**
- **Real-time GitHub user search** with instant results
- **Keyboard shortcuts** for power users (`/` or `Ctrl+K` to focus search)
- **Search suggestions** with example queries
- **Debounced search** to prevent API spam

### 👥 **User Discovery**
- **Up to 5 users** displayed per search
- **User avatars** and profile information
- **Direct links** to GitHub profiles
- **Responsive design** for all devices

### 📚 **Repository Exploration**
- **Expandable user cards** with smooth animations
- **Repository details** including descriptions and star counts
- **Formatted numbers** (1k, 2.5k, etc.) for better readability
- **Empty states** for users without repositories

### 🎨 **Modern UI/UX**
- **GitHub-inspired design** with familiar colors and patterns
- **Dark mode support** (follows system preference)
- **Smooth animations** and hover effects
- **Loading states** with spinners and progress indicators
- **Error handling** with user-friendly messages

### 📱 **Responsive Design**
- **Mobile-first approach** with touch-friendly interactions
- **Tablet and desktop** optimized layouts
- **Accessible design** with proper ARIA labels
- **Keyboard navigation** support

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 6.3.5** - Lightning-fast build tool
- **CSS3** - Modern styling with CSS custom properties

### **APIs & Services**
- **GitHub REST API** - User and repository data
- **GitHub Pages** - Free hosting and deployment

### **Development Tools**
- **ESLint** - Code quality and consistency
- **Vitest** - Fast unit testing
- **gh-pages** - Automated deployment

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/asruldev/sigithub.git
cd sigithub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the app in action!

### 4. Build for Production
```bash
npm run build
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

### Test Coverage
- ✅ API helper functions
- ✅ Component rendering
- ✅ User interactions
- ✅ Error handling

## 📦 Project Structure

```
sigithub/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── SearchUser.tsx  # Search functionality
│   │   ├── RepoList.tsx    # Repository display
│   │   └── UserList.tsx    # User list component
│   ├── helpers/            # Utility functions
│   │   └── api.ts         # GitHub API integration
│   ├── types/             # TypeScript definitions
│   │   └── types.ts       # User and Repo interfaces
│   ├── styles/            # Styling
│   │   └── index.css      # Main stylesheet
│   ├── tests/             # Test files
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🎨 Design System

### **Colors**
- **Primary**: `#0969da` (GitHub blue)
- **Background**: `#f6f8fa` (light gray)
- **Text**: `#24292f` (dark gray)
- **Borders**: `#d0d7de` (medium gray)

### **Typography**
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales from 0.8rem to 2.5rem

### **Components**
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Hover effects with transform animations
- **Inputs**: Focus states with blue outline
- **Loading**: Smooth spinner animations

## 🌐 Deployment

This project is automatically deployed to GitHub Pages using the `gh-pages` package.

### Manual Deployment
```bash
npm run deploy
```

### Deployment Process
1. **Build** the production files
2. **Push** to `gh-pages` branch
3. **GitHub Pages** serves the static site

## 🔧 Configuration

### Environment Variables
No environment variables required - uses public GitHub API.

### API Rate Limits
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

### Customization
- **Colors**: Modify CSS custom properties in `src/styles/index.css`
- **API**: Update endpoints in `src/helpers/api.ts`
- **Styling**: Edit component styles in the CSS file

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 1. Fork the Repository
```bash
git clone https://github.com/your-username/sigithub.git
```

### 2. Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes
- Follow the existing code style
- Add tests for new features
- Update documentation

### 4. Commit and Push
```bash
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### 5. Open a Pull Request
- Describe your changes clearly
- Include screenshots if UI changes
- Link any related issues

## 📝 Development Guidelines

### **Code Style**
- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Use **functional components** with hooks
- Keep components **small and focused**

### **Testing**
- Write **unit tests** for utilities
- Test **component rendering**
- Mock **API calls** in tests
- Maintain **good test coverage**

### **Performance**
- Use **React.memo** for expensive components
- Implement **lazy loading** for images
- Optimize **bundle size** with tree shaking
- Use **CSS-in-JS** sparingly

## 🐛 Known Issues

- **TypeScript errors** in IDE: These are IDE-specific and don't affect the build
- **API rate limits**: Consider authentication for production use
- **Mobile performance**: Large repository lists may be slow on older devices

## 🔮 Roadmap

### **Planned Features**
- [ ] **User authentication** with GitHub OAuth
- [ ] **Repository filtering** by language, stars, etc.
- [ ] **Advanced search** with multiple criteria
- [ ] **Repository analytics** and insights
- [ ] **Offline support** with service workers
- [ ] **PWA features** (installable app)

### **Improvements**
- [ ] **Performance optimization** for large datasets
- [ ] **Accessibility enhancements** (ARIA, screen readers)
- [ ] **Internationalization** (i18n) support
- [ ] **Theme customization** options

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub** for the amazing API and design inspiration
- **React team** for the incredible framework
- **Vite team** for the fast build tool
- **Inter font** by Google Fonts
- **Open source community** for all the amazing tools

## 👨‍💻 Author

**Asrul Harahap**

- 🌐 [GitHub](https://github.com/asruldev)
- 📧 [Email](mailto:talkasrul@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/asruldev)

---

<div align="center">

**Built with ❤️ for the GitHub community**

[⭐ Star this repo](https://github.com/asruldev/sigithub) | [🐛 Report issues](https://github.com/asruldev/sigithub/issues) | [💡 Suggest features](https://github.com/asruldev/sigithub/discussions)

</div>