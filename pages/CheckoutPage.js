
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // For navigation
import { useCart } from './CartContext'; // Import the cart context

const CheckoutPage = () => {
  const { cart, completeOrder } = useCart();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState('Delivery'); // Default to 'Delivery'
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();

  // Payment methods for both Delivery and Pick Up
  const paymentMethodsForDelivery = [
    { id: 1, name: 'GCash' },
    { id: 2, name: 'Credit/Debit Card' },
    { id: 3, name: 'Maya' },
    { id: 4, name: 'Cash on Delivery' },
  ];

  const paymentMethodsForPickUp = [
    { id: 1, name: 'GCash' },
    { id: 2, name: 'Credit/Debit Card' },
    { id: 3, name: 'Maya' },
    { id: 5, name: 'Cash' },  // Replace "Cash on Delivery" with "Cash"
  ];

  // Select payment methods based on the order type
  const paymentMethods = orderType === 'Delivery' ? paymentMethodsForDelivery : paymentMethodsForPickUp;

  const deliveryFee = 50; // Fixed delivery fee
  
  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Ensure totalPrice is a valid number
  const grandTotal = orderType === 'Delivery' ? totalPrice + deliveryFee : totalPrice;

  // Ensure grandTotal is a valid number
  const safeTotalPrice = isNaN(totalPrice) ? 0 : totalPrice;
  const safeGrandTotal = isNaN(grandTotal) ? 0 : grandTotal;

  const handlePlaceOrder = () => {
    if (orderType === 'Delivery' && !deliveryAddress.trim()) {
      Alert.alert('Error', 'Please enter a delivery address.');
      return;
    }

    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }

    // Complete order and update order history
    completeOrder({
      deliveryAddress,
      paymentMethod: selectedPayment,
      orderType,
      notes, // Pass notes as part of the order data
      cart, // Include cart items in the order
    });

    Alert.alert('Order Placed', 'Your order has been placed successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('History') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Order Type Selection */}
      <View style={styles.orderTypeSection}>
        <Text style={styles.sectionHeader}>Order Type</Text>
        <View style={styles.orderTypeOptions}>
          <TouchableOpacity
            style={[
              styles.orderTypeButton,
              orderType === 'Delivery' && styles.selectedOrderTypeButton,
            ]}
            onPress={() => setOrderType('Delivery')}
          >
            <Text
              style={[
                styles.orderTypeText,
                orderType === 'Delivery' && styles.selectedOrderTypeText,
              ]}
            >
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.orderTypeButton,
              orderType === 'Pick Up' && styles.selectedOrderTypeButton,
            ]}
            onPress={() => setOrderType('Pick Up')}
          >
            <Text
              style={[
                styles.orderTypeText,
                orderType === 'Pick Up' && styles.selectedOrderTypeText,
              ]}
            >
              Pick Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delivery Address */}
      {orderType === 'Delivery' && (
        <View style={styles.deliverySection}>
          <Text style={styles.sectionHeader}>Delivery Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your delivery address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
          />
        </View>
      )}

      {/* Order Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Order Summary</Text>
        {cart.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                ₱{(item.price || 0).toFixed(2)} x {item.quantity || 1}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Total Price */}
      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>₱{safeTotalPrice.toFixed(2)}</Text>
      </View>

      {/* Delivery Fee */}
      {orderType === 'Delivery' && (
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Delivery Fee:</Text>
          <Text style={styles.totalAmount}>₱{deliveryFee.toFixed(2)}</Text>
        </View>
      )}

      {/* Grand Total */}
      <View style={styles.grandTotalSection}>
        <Text style={styles.grandTotalText}>Grand Total:</Text>
        <Text style={styles.grandTotalAmount}>₱{safeGrandTotal.toFixed(2)}</Text>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.paymentOption}
            onPress={() => setSelectedPayment(method.id)}
          >
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  selectedPayment === method.id && styles.radioButtonSelected,
                ]}
              />
            </View>
            <Text style={styles.paymentText}>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notes Section */}
      <View style={styles.notesSection}>
        <Text style={styles.sectionHeader}>Notes (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter any special instructions"
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handlePlaceOrder}>
        <Text style={styles.checkoutText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 140,
    color: 'black',
  },
  orderTypeSection: {
    marginTop: 10,
  },
  orderTypeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,  // Reduced margin between buttons
  },
  orderTypeButton: {
    padding: 8,  // Reduced padding to minimize button size
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  selectedOrderTypeButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  orderTypeText: {
    fontSize: 16,
    color: 'black',
  },
  selectedOrderTypeText: {
    color: 'white',
  },
  deliverySection: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  section: {
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 2,
  },
  grandTotalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  grandTotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  grandTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  radioButtonContainer: {
    marginRight: 10,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'black',
  },
  radioButtonSelected: {
    backgroundColor: 'black',
  },
  paymentText: {
    fontSize: 16,
    color: 'black',
  },
  notesSection: {
    marginTop: 20,
  },
  checkoutButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutPage;