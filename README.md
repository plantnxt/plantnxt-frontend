# PlantNxt Frontend

Modern React-based manufacturing intelligence dashboard with AI-powered insights and real-time monitoring capabilities.

## 🚀 Features

- **Intelligent Sidebar**: Collapsible navigation with pin functionality
- **Theme Toggle**: Dark/Light mode support
- **Real-time Dashboard**: Live metrics and alerts
- **AI Copilot**: Natural language query interface
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/plantnxt-frontend.git
cd plantnxt-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### AWS S3 (Recommended for Production)

**Quick Deploy:**

```bash
# Install AWS CLI first
npm install -g aws-cli

# Configure AWS credentials
aws configure

# Deploy to S3
npm run deploy:s3
```

**Using Deployment Script:**

```bash
# Edit deploy-s3.sh with your bucket name
./deploy-s3.sh
```

**Manual Deployment:**

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete
```

### Other Deployment Options

**Vercel:**

```bash
npm install -g vercel
vercel --prod
```

**Netlify:**

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Manual Server:**

1. Run `npm run build`
2. Upload `dist/` contents to your web server

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Sidebar, TopNav)
│   └── ui/             # Base UI components
├── pages/              # Page components
│   ├── Dashboard/      # Dashboard pages and components
│   ├── Login/          # Authentication pages
│   └── DesignPreview/  # Design system preview
├── hooks/              # Custom React hooks
├── config/             # App configuration
├── data/               # Mock data and types
└── lib/                # Utility functions
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_ENV=development
```

### Build Configuration

- **Entry**: `src/main.tsx`
- **Output**: `dist/`
- **Port**: `5173` (development)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Demo**: [app.plantnxt.com](https://app.plantnxt.com)
- **Documentation**: [docs.plantnxt.com](https://docs.plantnxt.com)
- **API**: [api.plantnxt.com](https://api.plantnxt.com)

## 🆘 Support

For support, email support@plantnxt.com or create an issue in this repository.
