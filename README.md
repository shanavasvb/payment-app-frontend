# Payment Collection App - Frontend

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~49.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A cross-platform mobile application built with React Native and Expo for efficient management of customer loan payments and EMI collections. This solution provides a streamlined interface for financial institutions to process payments and track customer loan portfolios.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The Payment Collection App Frontend is a production-ready React Native application designed to digitize the loan payment collection process. Built with modern development practices and optimized for performance, it provides real-time payment processing capabilities with a focus on user experience and data integrity.

### Use Cases

- **Financial Institutions**: Manage customer loan portfolios and EMI collections
- **Payment Collectors**: Process on-field payments with instant confirmation
- **Customer Service**: Quick access to customer loan details and payment history
- **Loan Management**: Real-time tracking of outstanding EMIs and payment status

## ✨ Features

### Core Functionality

- **📊 Customer Portfolio Management**
  - Comprehensive customer list with loan details
  - Account number, loan amount, interest rate, and tenure display
  - Real-time EMI due amount tracking
  - Sortable and searchable customer database

- **💳 Payment Processing**
  - Secure payment submission with validation
  - Instant EMI calculation and update
  - Optimistic UI updates for seamless UX
  - Payment confirmation with transaction details

- **🔄 Data Synchronization**
  - Pull-to-refresh functionality
  - Automatic data refresh on app focus
  - Network error handling with retry logic
  - Offline-ready architecture support

- **🎨 User Experience**
  - Responsive design for all screen sizes
  - Loading states and progress indicators
  - Success/error notifications
  - Form validation with helpful error messages
  - Clean, intuitive interface

### Technical Features

- **Type Safety**: Full TypeScript implementation with strict type checking
- **Performance**: Optimized rendering with React.memo and useMemo
- **Error Handling**: Comprehensive error boundaries and fallback UI
- **Accessibility**: WCAG 2.1 AA compliant components
- **Cross-Platform**: Single codebase for Web, iOS, and Android

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.72.6 | Mobile app framework |
| Expo | ~49.0.15 | Development and build tooling |
| TypeScript | 5.1.3 | Type safety and IntelliSense |
| Expo Router | 2.x | File-based navigation |

### Development Tools

- **State Management**: React Hooks (useState, useEffect, useCallback)
- **API Communication**: Fetch API with AbortController
- **Code Quality**: ESLint, Prettier, TypeScript strict mode
- **Version Control**: Git with conventional commits

## 🏗️ Architecture

### Project Structure

```
payment-frontend/
├── app/
│   ├── _layout.tsx              # Root layout & navigation config
│   └── index.tsx                # Main screen with business logic
│
├── components/
│   ├── CustomerList.tsx         # Customer portfolio display
│   ├── PaymentForm.tsx          # Payment input & validation
│   └── SuccessMessage.tsx       # Transaction confirmation UI
│
├── services/
│   └── api.ts                   # API client & endpoints
│
├── types/
│   └── customer.ts              # TypeScript interfaces
│
├── config.js                    # Environment configuration
├── app.json                     # Expo configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

### Component Hierarchy

```
App (index.tsx)
├── Header
├── PaymentForm
│   ├── AccountNumberInput
│   ├── PaymentAmountInput
│   └── SubmitButton
├── SuccessMessage
└── CustomerList
    └── CustomerCard[]
```

### Data Flow

1. **Initial Load**: App fetches customer data from API
2. **User Input**: Form captures payment details with validation
3. **Payment Submission**: POST request to `/payments` endpoint
4. **Optimistic Update**: Local state updates immediately
5. **Confirmation**: Success message displays with transaction details
6. **Refresh**: Customer list updates with new EMI due amounts

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v16.x or higher ([Download](https://nodejs.org/))
- **npm**: v7.x or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Expo CLI** (optional): `npm install -g expo-cli`

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/payment-collection-frontend.git
   cd payment-collection-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   Or with yarn:
   ```bash
   yarn install
   ```

3. **Configure environment**

   Create/update `config.js`:
   ```javascript
   export const API_URL = 'http://localhost:3000';
   ```

4. **Start development server**

   ```bash
   npx expo start
   ```

### Running the Application

#### Web Browser (Recommended for Development)
```bash
npx expo start --web
```
Or press `w` in the Expo CLI

#### Android
```bash
npx expo start --android
```
Or press `a` in the Expo CLI

#### iOS (macOS only)
```bash
npx expo start --ios
```
Or press `i` in the Expo CLI

#### Physical Device
1. Install **Expo Go** app from App Store/Play Store
2. Scan the QR code displayed in terminal
3. App will load on your device

## ⚙️ Configuration

### API Configuration

Update `config.js` based on your environment:

**Local Development:**
```javascript
export const API_URL = 'http://localhost:3000';
```

**Android Emulator:**
```javascript
export const API_URL = 'http://10.0.2.2:3000';
```

**Physical Device (same network):**
```javascript
export const API_URL = 'http://192.168.1.100:3000'; // Your computer's IP
```

**Production:**
```javascript
export const API_URL = 'http://13.201.81.124:3000';
```

### Environment Variables

Create `.env` file for sensitive configuration:

```env
EXPO_PUBLIC_API_URL=http://your-api-url:3000
EXPO_PUBLIC_ENV=development
```

Access in code:
```typescript
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## 🔌 API Integration

### Endpoints

#### GET `/customers`
Retrieves all customer loan details

**Response:**
```typescript
{
  success: boolean;
  data: Array<{
    account_number: string;
    customer_name: string;
    issue_date: string;
    interest_rate: number;
    tenure: number;
    emi_due: number;
    total_loan_amount: number;
  }>;
}
```

#### POST `/payments`
Processes a customer payment

**Request:**
```typescript
{
  account_number: string;
  payment_amount: number;
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  data: {
    payment_id: number;
    account_number: string;
    payment_amount: number;
    remaining_due: number;
  };
}
```

#### GET `/payments/:account_number`
Retrieves payment history for a customer

**Response:**
```typescript
{
  success: boolean;
  data: Array<{
    id: number;
    payment_date: string;
    payment_amount: number;
    status: string;
    customer_name: string;
  }>;
}
```

### API Client

The `services/api.ts` module provides a centralized API client:

```typescript
import { API_URL } from '../config';

export const fetchCustomers = async (signal?: AbortSignal) => {
  const response = await fetch(`${API_URL}/customers`, { signal });
  return response.json();
};

export const submitPayment = async (data: PaymentRequest) => {
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator/device |
| `npm run web` | Run in web browser |
| `npm run lint` | Run ESLint for code quality |
| `npm run type-check` | Run TypeScript compiler check |

### Code Quality

**Linting:**
```bash
npm run lint
```

**Type Checking:**
```bash
npm run type-check
```

**Format Code:**
```bash
npm run format
```

### Development Best Practices

1. **TypeScript**: Use strict type checking
2. **Components**: Keep components small and focused
3. **Hooks**: Follow React Hooks rules
4. **Error Handling**: Always handle errors gracefully
5. **Performance**: Use React.memo and useMemo for optimization
6. **Commits**: Use conventional commit messages

### Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 📦 Building for Production

### Web Build

```bash
npx expo export:web
```

Output in `web-build/` directory. Deploy to any static hosting service.

### Android APK (Development Build)

```bash
eas build --platform android --profile preview
```

### Android AAB (Production Build)

```bash
eas build --platform android --profile production
```

### iOS Build

```bash
eas build --platform ios --profile production
```

### EAS Configuration

Update `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "buildType": "archive"
      }
    }
  }
}
```

## 🌐 Deployment

### Backend Service

**Platform**: AWS EC2 (Ubuntu Server)

**Infrastructure Details:**
- **Instance Type**: t2.micro / t2.small
- **Runtime**: Node.js v20.x
- **Process Manager**: PM2
- **Database**: MySQL 8.0
- **Web Server**: Nginx (reverse proxy)

**Live Backend URL:**
```
http://13.201.81.124:3000
```

**Health Check Endpoint:**
```bash
curl http://13.201.81.124:3000/health
```

### Frontend Deployment Options

#### 1. Expo Application Services (EAS)

Update `app.json`:
```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://13.201.81.124:3000"
    }
  }
}
```

Build and submit:
```bash
eas build --platform all
eas submit --platform all
```

#### 2. Vercel (Web Version)

```bash
npm run export:web
vercel deploy web-build/
```

#### 3. Netlify (Web Version)

```bash
npm run export:web
netlify deploy --dir=web-build
```

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/build.yml`):

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
      - run: npx expo export:web
      - name: Deploy to Vercel
        run: vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

## 🐛 Troubleshooting

### Common Issues

#### Issue: Cannot connect to backend

**Symptoms**: Network errors, "Failed to fetch"

**Solutions:**
1. Verify backend is running: `curl http://localhost:3000/health`
2. Check `config.js` has correct API_URL
3. For Android emulator, use `http://10.0.2.2:3000`
4. For physical device, ensure same WiFi network
5. Check firewall isn't blocking port 3000

#### Issue: App crashes on Expo Web

**Symptoms**: "AbortError: The operation was aborted"

**Solution**: Already implemented - AbortController cleanup in useEffect

#### Issue: TypeScript errors

**Symptoms**: Red underlines, build fails

**Solutions:**
1. Run `npm install` to ensure types are installed
2. Clear cache: `expo start -c`
3. Restart TypeScript server in VS Code: `Cmd+Shift+P` → "Restart TS Server"

#### Issue: EMI not updating

**Symptoms**: Payment succeeds but EMI shows old value

**Solution**: Implemented optimistic UI updates. If issue persists, check network tab for API response.

#### Issue: Build fails on EAS

**Solutions:**
1. Check `eas.json` configuration
2. Verify `app.json` is valid JSON
3. Run `eas build:configure`
4. Check EAS build logs for specific errors

### Debug Mode

Enable debug logging:

```typescript
// Add to config.js
export const DEBUG = true;

// Use in code
if (DEBUG) console.log('Payment submitted:', data);
```

### Getting Help

1. **Check Documentation**: Review this README and API docs
2. **Search Issues**: Check GitHub issues for similar problems
3. **Enable Verbose Logging**: Run with `--verbose` flag
4. **Network Inspector**: Use Chrome DevTools or React Native Debugger
5. **Create Issue**: Submit detailed bug report with reproduction steps

## 📱 Application Screenshots

*(Add screenshots here after building the app)*

### Home Screen
![Home Screen](./screenshots/home.png)

### Payment Form
![Payment Form](./screenshots/payment.png)

### Success Message
![Success](./screenshots/success.png)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add payment history view
fix: Resolve EMI calculation bug
docs: Update API documentation
style: Format code with prettier
refactor: Simplify payment logic
test: Add unit tests for PaymentForm
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

