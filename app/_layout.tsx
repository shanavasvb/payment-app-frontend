import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerStyle: {
            backgroundColor: '#fff',
          },
          drawerActiveTintColor: '#007AFF',
          drawerInactiveTintColor: '#666',
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Payment Collection',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="payment-history"
          options={{
            drawerLabel: 'Payment History',
            title: 'Payment History',
            drawerIcon: ({ color, size }: { color: string; size: number }) => (
              <Ionicons name="receipt" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
      <StatusBar style="light" />
    </>
  );
}
