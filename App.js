import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from "./pages/CartContext";

import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from './pages/OrderPage';
import HistoryPage from './pages/HistoryPage';
import UserPage from './pages/UserPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LandingPage from './pages/LandingPage';



const Stack = createStackNavigator();


const App = () => {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={RegisterPage} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{headerShown: false}}/>
        <Stack.Screen name="Order" component={OrderPage} options={{headerShown: false}}/>
        <Stack.Screen name="Cart" component={CartPage} options={{headerShown: false}}/>
        <Stack.Screen name="History" component={HistoryPage} options={{headerShown: false}}/> 
        <Stack.Screen name="User" component={UserPage} options={{headerShown: false}}/>  
        <Stack.Screen name="Checkout" component={CheckoutPage} options={{headerShown: false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
};

export default App;