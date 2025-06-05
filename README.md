# LunchAOS - Lunch Rating & Feedback System

A modern web application for rating lunch experiences, sharing feedback, and discovering the best lunch spots in your building.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) for version control

### Optional but Recommended
- [Visual Studio Code](https://code.visualstudio.com/) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

## Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications

### Development Tools
- [ESLint](https://eslint.org/) - Code linting
- [PostCSS](https://postcss.org/) - CSS processing
- [Autoprefixer](https://github.com/postcss/autoprefixer) - CSS vendor prefixing

## Features

- 🍽️ **Lunch Rating & Feedback**
  - Rate lunch by taste, variety, and wait time
  - Quick emoji reactions
  - View average ratings

- 🧭 **Crowd & Seating Insights**
  - Real-time building occupancy
  - Available seating information
  - Interactive crowd heatmap

- 🍰 **Food & Dessert Voting**
  - Vote for favorite food items
  - Track popular desserts
  - Share lunch photos

- 🏆 **Gamification & Leaderboards**
  - Earn badges for participation
  - Compete for special titles
  - Track achievements

- 📊 **Analytics & Trends**
  - Weekly food popularity trends
  - Building-specific insights
  - User engagement metrics

- 👨‍🍳 **Admin Dashboard**
  - View aggregated feedback
  - Highlight popular dishes
  - Moderate content

## Getting Started

1. **Install Node.js and npm**
   - Visit [Node.js website](https://nodejs.org/)
   - Download and install the LTS version
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lunchaos.git
   cd lunchaos
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
lunchaos/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx     # Home page
│   │   ├── layout.tsx   # Root layout
│   │   └── globals.css  # Global styles
│   ├── components/      # React components
│   └── lib/            # Utility functions
├── public/             # Static assets
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- We use ESLint and Prettier for code formatting
- Follow the TypeScript strict mode guidelines
- Use Tailwind CSS utility classes for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **Node.js version mismatch**
   ```bash
   nvm install 18
   nvm use 18
   ```

2. **Dependencies installation fails**
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

3. **TypeScript errors**
   ```bash
   npm run build
   # Fix any type errors shown
   ```

4. **Tailwind CSS not working**
   ```bash
   npm run dev
   # Ensure PostCSS is properly configured
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.