// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import MapView, { Marker } from 'react-native-maps';
// import { getLocationByProjectId, ProjectLocation } from '../../../lib/api';

// export default function ProjectMapScreen() {
//   const { id } = useLocalSearchParams();
//   const [locations, setLocations] = useState<ProjectLocation[]>([]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const locationsData = await getLocationByProjectId(Number(id));
//         setLocations(locationsData);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };

//     fetchLocations();
//   }, [id]);

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map}>
//         {locations.map((location) => {
//           const [longitude, latitude] = JSON.parse(location.location_position).coordinates;
//           return (
//             <Marker
//               key={location.id}
//               coordinate={{ latitude, longitude }}
//               title={location.location_name}
//               description={location.location_content}
//             />
//           );
//         })}
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });
