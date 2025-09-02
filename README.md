# CTS - Chauffeur Transport Service

A modern, multi-language transportation service website built with Next.js, offering luxury chauffeur services with an intuitive booking system and elegant user interface.

## 🚗 About

CTS is a premium chauffeur transport service platform that provides:
- **Luxury Transportation**: Professional chauffeur services with a premium fleet
- **Multi-Language Support**: Available in English, Spanish, and French
- **Advanced Booking System**: Easy-to-use reservation system with date/time selection
- **Fleet Management**: Showcase of available vehicles including luxury sedans, SUVs, and vans
- **Interactive UI**: Modern design with custom components and smooth animations

## ✨ Features

- 🌍 **Multi-language Support** - EN, ES, FR translations
- 📱 **Responsive Design** - Optimized for all devices
- 🎨 **Modern UI/UX** - Custom components with smooth animations
- 📅 **Booking System** - Advanced date/time picker with confirmation flow
- 🚙 **Fleet Showcase** - Interactive gallery of available vehicles
- 📍 **Location Services** - Address autocomplete and mapping
- 📞 **Contact Integration** - Phone input with international support
- 🎭 **Custom Cursor** - Enhanced user interaction
- 🔄 **Circular Gallery** - Interactive destination showcase
- 🌙 **Theme Support** - Light/dark mode compatibility

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: Custom component library with Radix UI primitives
- **Internationalization**: Custom i18n implementation
- **Form Handling**: React Hook Form with validation
- **Date/Time**: Advanced datetime picker components
- **Animations**: Framer Motion and CSS animations
- **Icons**: Lucide React
- **Phone Input**: International phone number handling
- **Maps**: Address autocomplete integration

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cts
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
cts/
├── app/                     # Next.js App Router pages
│   ├── about/              # About page
│   ├── booking/            # Booking system with confirmation
│   ├── contact/            # Contact page
│   ├── fleet/              # Vehicle fleet showcase
│   ├── login/              # Authentication
│   ├── services/           # Services overview
│   └── components/         # App-specific components
├── components/             # Shared UI components
│   ├── ui/                 # Reusable UI components
│   └── login-form.tsx      # Authentication form
├── lib/                    # Utilities and configurations
│   ├── i18n/              # Internationalization
│   └── utils.ts           # Utility functions
├── public/                 # Static assets
│   ├── images/            # Vehicle and service images
│   └── circular-gallery/  # Destination images
└── src/                   # Additional components and utilities
```

## 🌐 Internationalization

The application supports multiple languages:
- **English** (`en.json`)
- **Spanish** (`es.json`) 
- **French** (`fr.json`)

Language files are located in `lib/i18n/` and managed through the `TranslationContext`.

## 🚙 Fleet

The platform showcases various vehicle types:
- Luxury sedans (Mercedes E-Class, Audi A6)
- Premium SUVs (Range Rover, Kia Sorento)
- Executive vehicles (Mercedes S-Class)
- Group transport (Mercedes Viano, Sprinter, Bus)

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## ⚙️ Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configurations:
```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

### Styling
- Global styles: `app/globals.css`
- Component styles: Individual CSS modules
- Tailwind configuration: `tailwind.config.js`

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Docker containers
- Traditional hosting with Node.js

Check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and inquiries, please use the contact form on the website or reach out through the provided contact information.

---

Built with ❤️ using Next.js and modern web technologies.
