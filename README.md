# 🚀 Cryptocurrency Dashboard

A modern and comprehensive cryptocurrency tracking dashboard, built as part of Platzi's AI programming learning challenge.

## 📋 Project Description

This project is an interactive dashboard for cryptocurrency tracking and analysis that includes:

* **Portfolio Overview**: General portfolio overview with key metrics and real-time charts
* **Portfolio Management**: Detailed holdings management and asset allocation
* **DeFi & Yield**: Liquidity pool and yield tracking
* **NFT Tracker**: NFT collection monitoring and floor prices
* **On-Chain Data**: Blockchain activity analysis and statistics
* **Gas Tracker**: Gas price monitoring and estimates
* **Whale Alerts**: Alerts for large market movements
* **Alert System**: Customizable notifications

## 🛠️ Technologies Used

* **Frontend**: Next.js 16.1.6 with React 19.2.4
* **Styling**: Tailwind CSS 4.2.0
* **Components**: Radix UI for accessible components
* **Charts**: Chart.js for interactive visualizations
* **Type Safety**: TypeScript 5.7.3
* **State Management**: React Hooks and Context API
* **Icons**: Lucide React
* **Forms**: React Hook Form with Zod for validation

## 🎯 Main Features

### 💰 Portfolio Management

* Real-time portfolio value tracking
* Holdings visualization with percentage changes
* Historical performance charts
* Asset allocation analysis

### 📊 Advanced Analytics

* Interactive charts with multiple time periods
* Network statistics and market metrics
* Blockchain activity heatmap
* Analysis of the most frequently used smart contracts

### 🔔 Smart Alert System

* Customizable price alerts
* Low gas price notifications
* Whale movement detection
* Portfolio and DeFi alerts

### 🎨 Modern Design

* Elegant dark interface with gradients
* Smooth animations and fluid transitions
* Responsive design for all devices
* Customizable theme with dark/light mode

## 🚀 How to Run the Project

### Prerequisites

* Node.js (version 18 or higher)
* npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd crypto-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```text
crypto-dashboard/
├── app/                    # Next.js pages
│   ├── page.tsx            # Main dashboard page
│   └── layout.tsx          # Main layout
├── components/             # React components
│   ├── dashboard/          # Dashboard components
│   ├── ui/                 # Reusable UI components
│   └── theme-provider.tsx  # Theme provider
├── lib/                    # Utilities and configurations
├── public/                 # Static files
├── styles/                 # Global styles
├── hooks/                  # Custom hooks
└── .next/                  # Next.js build
```

## 🎨 Featured Components

### Sidebar Component

* Main navigation with multiple views
* Wallet connection indicator
* Minimalist design with hover effects

### Portfolio Chart

* Line charts with gradients
* Multiple time periods (1D, 1W, 1M, 3M, 1Y)
* Interactive tooltips with detailed data

### Metric Cards

* Informational cards with icons
* Performance indicators
* Counting animations

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file to configure environment variables:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### Customization

* Modify colors in `tailwind.config.js`
* Adjust metrics in `app/page.tsx`
* Customize components in `components/dashboard/`

## 🤝 Contributing

Contributions are welcome! If you want to improve this project:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Improvements

* [ ] Real integration with cryptocurrency APIs
* [ ] Wallet integration (MetaMask, WalletConnect)
* [ ] Push notification system
* [ ] Data export to CSV/Excel
* [ ] Optimized mobile mode
* [ ] Multilingual support
* [ ] Strategy backtesting

## 🙋‍♂️ About the Developer

This project was developed by **Ronald Cubides** as part of Platzi's AI programming learning challenge. It demonstrates the capabilities of AI in assisting with the development of modern web applications.

### How Can You Help?

I would love to receive feedback and suggestions to improve this project:

* **Bug Reports**: If you find an issue, please open an issue
* **Feature Suggestions**: Ideas for new functionality
* **Code Improvements**: Optimizations or best practices
* **UI/UX Design**: Improvements to the interface and user experience
* **Documentation**: Help improve the project documentation

---

**⭐ If you like this project, don't forget to give it a star on GitHub!**

---

*Developed with ❤️ by Ronald Cubides*