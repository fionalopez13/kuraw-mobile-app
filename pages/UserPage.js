import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for back arrow

const UserPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation(); // Hook to navigate between screens

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Profile</Text>

      {/* Editable Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: profileImage || 'https://randomuser.me/api/portraits/men/50.jpg' }}
          style={styles.profileImage}
        />

        {/* Custom Edit Image Button */}
        <TouchableOpacity style={styles.editButton} onPress={handleImagePick}>
          <Text style={styles.editButtonText}>Edit Image</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>Email: john.doe@example.com</Text>
        <Text style={styles.userInfoText}>Phone: +1234567890</Text>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button
          title="Log Out"
          onPress={() => navigation.navigate('Home')} // Correctly navigate to Home
          color="black"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 62, // Adjust the position
    left: 20, // Adjust the position
    padding: 10,
    zIndex: 1, // Ensure the back button is above other components
  },

  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 160,
    marginTop: 40,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'black',
  },

  editButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -220,
  },

  userInfoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 30,
    width: '100%',
    alignItems: 'flex-start',
  },

  userInfoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },

  logoutButtonContainer: {
    width: '100%',
    height: 60,
    borderRadius: 30,
  },
});

export default UserPage;
