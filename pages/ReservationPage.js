import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const UserPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.5 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Editable Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{
            uri: profileImage || "https://randomuser.me/api/portraits/lego/5.jpg",
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton} onPress={handleImagePick}>
          <Text style={styles.editButtonText}>Edit Profile Image</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>Email: john.doe@example.com</Text>
        <Text style={styles.userInfoText}>Phone: +1234567890</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.actionButtonText}>Order History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("ReservationHistory")}
        >
          <Text style={styles.actionButtonText}>Reservation History</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          Alert.alert("Logged Out", "You have successfully logged out!");
          navigation.navigate("LandingPage");
        }}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
  },

  navbar: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space out back arrow and title
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "115%", // Full width
    position: "absolute",
    top: 40, // Lower it slightly
    zIndex: 1, // Ensure it appears above other content
  },

  navbarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImageContainer: {
    alignItems: "center",
    marginTop: 120, // Adjusted to account for the navbar
    marginBottom: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "black",
  },

  editButton: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },

  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  userInfoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 30,
  },

  userInfoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },

  buttonSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  actionButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: "80%",
    alignItems: "center",
  },

  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#FF3131",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 220,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },

  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserPage;
