import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
export const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.location;
  console.log(latitude);
  console.log(longitude);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
