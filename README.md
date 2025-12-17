# Payment Collection App - Frontend

A React Native mobile application built with Expo Router for managing customer loan payments and EMI collections.

## 📱 Features

- **Customer Management**: View all customers with loan details (account number, loan amount, interest rate, tenure, EMI due)
- **Payment Processing**: Submit payments against customer accounts
- **Real-time Updates**: Instant EMI due updates after successful payment (optimistic UI)
- **Success Notifications**: Web-compatible success messages with auto-dismiss
- **Pull-to-Refresh**: Manually refresh customer data
- **Form Validation**: Client-side validation for account numbers and payment amounts
- **Responsive Design**: Works on Web, iOS, and Android

## 🛠️ Tech Stack

- **Framework**: React Native with Expo Router
- **Language**: TypeScript
- **State Management**: React Hooks (useState, useEffect)
- **API Communication**: Fetch API with AbortController
- **UI Components**: Custom reusable components
- **Navigation**: File-based routing (no tab navigation)

## 📁 Project Structure

```
payment-frontend/
├── app/
│   ├── _layout.tsx          # Root layout configuration
│   └── index.tsx            # Main screen with business logic
├── components/
│   ├── CustomerList.tsx     # Customer cards display component
│   ├── PaymentForm.tsx      # Payment submission form
│   └── SuccessMessage.tsx   # Success banner component
├── services/
│   └── api.ts               # API service layer (fetch calls)
├── types/
│   └── customer.ts          # TypeScript interfaces
├── config.js                # API URL configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure API URL**

   Update `config.js` with your backend server URL:
   ```javascript
   export const API_URL = 'http://127.0.0.1:3000';
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on different platforms**

   - Press `w` for Web
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app for physical device

## 🔌 API Integration

The app connects to a backend API with the following endpoints:

### GET `/customers`
Fetches all customer loan details
```typescript
Response: {
  success: boolean;
  data: Customer[];
}
```

### POST `/payments`
Submits a payment for a customer
```typescript
Request: {
  account_number: string;
  payment_amount: number;
}

Response: {
  success: boolean;
  data: {
    payment_id: number;
    account_number: string;
    payment_amount: number;
    remaining_due: number;
  }
}
```

## 🎨 Key Features Implementation

### Optimistic UI Updates
Payments update the local state immediately without waiting for a refresh, providing instant feedback to users.

### AbortController Pattern
Network requests use AbortController to prevent memory leaks when components unmount (especially important for Expo Web).

### Type Safety
Full TypeScript coverage with interfaces for Customer, Payment responses, and component props.

### Component Separation
Business logic is separated from UI components for better maintainability and reusability.

## 🐛 Troubleshooting

### Issue: Infinite loading on Expo Web
**Solution**: AbortController cleanup is implemented in useEffect to prevent aborted requests.

### Issue: toFixed() crashes
**Solution**: All numeric fields from API are wrapped with `Number()` before calling `.toFixed()` to handle string values from MySQL DECIMAL fields.

### Issue: EMI not updating after payment
**Solution**: Optimistic state update is implemented - local state updates immediately using the `remaining_due` from API response.

## 📝 Environment Variables

Create a `.env` file (if needed):
```
API_URL=http://your-backend-url:3000
```

## 🔧 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser

## 📦 Dependencies

Key dependencies:
- `expo` - Expo framework
- `expo-router` - File-based routing
- `react-native` - React Native core
- `typescript` - Type safety

## 🏗️ Build for Production

### Web
```bash
npx expo export:web
```

### Android APK
```bash
eas build --platform android
```

### iOS
```bash
eas build --platform ios
```

## � APK Download

Android APK generated using Expo EAS Build:

**Download Link:** [https://expo.dev/artifacts/eas/REPLACE_WITH_APK_LINK.apk](https://expo.dev/artifacts/eas/REPLACE_WITH_APK_LINK.apk)

> Replace the placeholder link with the actual APK download URL after building with `eas build --platform android`

## 🌐 Deployment

The backend service is deployed on an AWS EC2 instance.

**Backend Details**
- **Platform**: AWS EC2 (Ubuntu)
- **Node.js**: v20
- **Process Manager**: PM2
- **Database**: MySQL
- **API Base URL**: http://13.201.81.124:3000

**Health Check**
```
http://13.201.81.124:3000/health
```

To connect the app to the deployed backend, update `config.js`:
```javascript
export const API_URL = 'http://13.201.81.124:3000';
```

## �📄 License

This project is for educational/evaluation purposes.

## 👤 Author

Shanavas

---

**Note**: Ensure the backend server is running before starting the frontend application.
