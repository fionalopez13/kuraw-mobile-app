import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
      },
    
      header: {
        backgroundColor: "black",
        marginTop: 50,
        padding: 15,
        flexDirection: "row", // Aligns logo, menu, and icon horizontally
        justifyContent: "space-between", // Spacing between logo, menu, and icon
        alignItems: "center", // Centers items vertically
      },
    
      logo: {
        width: 200,
        height: 200,
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 105,
        borderRadius: 30,
        resizeMode: "contain",
      },
    
      menuIcon: {
        padding: 10, // Add padding around the burger icon for easier tap
      },
    
      icon: {
        fontSize: 24,
        color: "white",
        marginLeft: 350,
      },
    
      heroSection: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
      },
    
      heroText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 5,
      },
    
      orderNowButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        marginBottom: 10,
      },
    
      orderNowText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },
    
      orderHistoryButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
      },
    
      orderHistoryText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },
    
      sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginVertical: 10,
      },
    
      Menu: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 10,
      },
    
      MenuImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: "#ddd",
      },

      carouselContainer: {
        paddingHorizontal: 10,
      },
      menuItem: {
        marginHorizontal: 10,
        alignItems: "center",
      },
      menuItemImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
        backgroundColor: "#ddd",
      },
      menuItemText: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold",
      },
      
      
});