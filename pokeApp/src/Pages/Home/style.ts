import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  
  inputs: {
    paddingTop: 50,
    alignItems: "center",
    width: "100%",
  },
  
  card: {
    width: "90%",
    height: "45%",
    borderRadius: 8,
    borderColor: "#e6103490",
    borderWidth: 1.5,
    marginTop: 15,
    marginBottom: 20,
    
  },
  
  image: {
    width: 'auto',
    height: 280,
    resizeMode: "contain",
  },
  
  text:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#fff'
  }
});
