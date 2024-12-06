import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for the burger menu
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../styles/global"; // Import external styles

// Dummy data for the menu (split into drinks and food)
const drinks = [
  { id: "1", name: "Café Americano", image: require("../assets/menu/icedamericano.jpg") },
  { id: "2", name: "Spanish Latte", image: require("../assets/menu/icedspanishlatte.jpg") },
  { id: "3", name: "Caramel Macchiato", image: require("../assets/menu/icedcaramelm.jpg") },
  { id: "4", name: "Dirty Matcha", image: require("../assets/menu/iceddirtymatcha.jpg") },
  { id: "5", name: "Chocolate Milktea", image: require("../assets/menu/chocomt.jpg") },
  { id: "6", name: "Matcha Milktea", image: require("../assets/menu/matchamt.jpg") },
  { id: "7", name: "Wintermelon Milktea", image: require("../assets/menu/wintermelonmt.jpg") },
  { id: "8", name: "Dark Chocoloate Latte", image: require("../assets/menu/darkchoco.jpg") },
  { id: "9", name: "Strawberry Latte", image: require("../assets/menu/strawberrylatte.jpg") },
  { id: "10", name: "Matcha Creamy Latte", image: require("../assets/menu/matchalatte.jpg") },
  { id: "11", name: "Mocha Latte", image: require("../assets/menu/mochalatte.jpg") },
  { id: "12", name: "Green Apple-Lemon", image: require("../assets/menu/greenapple.jpg") },
  { id: "13", name: "Raspberry-Sour Candy", image: require("../assets/menu/raspberry.jpg") },
  { id: "14", name: "Mixed Berries", image: require("../assets/menu/mixedberries.jpg") },

];

const food = [
  { id: "15", name: "Banana Cream", image: require("../assets/menu/bananacream.jpg") },
  { id: "16", name: "Beef Nachos", image: require("../assets/menu/nachos.jpg") },
  { id: "17", name: "Toasted Garlic Bread", image: require("../assets/menu/garlicbread.jpg") },
  { id: "18", name: "Pizza", image: require("../assets/menu/pizza.jpg") },
  { id: "19", name: "Chocolate-Coffee Pudding", image: require("../assets/menu/chocolatecoffeepudding.jpg") },
  { id: "20", name: "Clubhouse Sandwich", image: require("../assets/menu/clubhouse.jpg") },
  { id: "21", name: "Hershey's Chocolate", image: require("../assets/menu/chocolatewaffle.jpg") },
  { id: "22", name: "Hershey's Caramel", image: require("../assets/menu/caramelwaffle.jpg") },
  { id: "23", name: "Hershey's Strawberry", image: require("../assets/menu/strawberrywaffle.jpg") },
  { id: "24", name: "Ku-Ramen", image: require("../assets/menu/ramen.jpg") },
];

export default function HomePage() {
  const navigation = useNavigation(); // Hook for navigation

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
          <TouchableOpacity 
            style={globalStyles.icon} 
            onPress={() => navigation.navigate('User')}  // Navigate to UserPage
          >
            <Icon name="user" size={30} color="white" />
          </TouchableOpacity>
      </View>

      <View>
        <Image
          source={require("../assets/kuraw_logo.jpg")}
          style={globalStyles.logo}
        />
      </View>

      <View style={globalStyles.heroSection}>
        <TouchableOpacity
          style={globalStyles.orderNowButton}
          onPress={() => navigation.navigate("Order")} // Navigate to Register
        >
          <Text style={globalStyles.orderNowText}>Order Now</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={globalStyles.orderHistoryButton}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={globalStyles.orderHistoryText}>Order History</Text>

        </TouchableOpacity>
      </View>
      <Text style={globalStyles.sectionTitle}>Drinks</Text>
      <FlatList
        data={drinks}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.carouselContainer}
        renderItem={({ item }) => (
          <View style={globalStyles.menuItem}>
            <Image
              source={item.image}
              style={globalStyles.menuItemImage}
            />
            <Text style={globalStyles.menuItemText}>{item.name}</Text>
          </View>
        )}
      />

      <Text style={globalStyles.sectionTitle}>Food</Text>
      <FlatList
        data={food}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={globalStyles.carouselContainer}
        renderItem={({ item }) => (
          <View style={globalStyles.menuItem}>
            <Image
              source={item.image}
              style={globalStyles.menuItemImage}
            />
            <Text style={globalStyles.menuItemText}>{item.name}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}
