import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import MapMarker from '../images/map-marker.png'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api'

interface Orphanage {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation()
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])
  useFocusEffect(() => {
    api.get('orphanages').then(response => setOrphanages(response.data))
  })

  function handleNavigateToOrphanageDetails (id: string) {
    navigation.navigate('OrphanageDetails', { id })
  }
  function handleNavigateToCreateOrphanage () {
    navigation.navigate('SelectMapPosition')
  }
  return (

    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -8.2746276,
          longitude: -35.9261013,
          longitudeDelta: 0.008,
          latitudeDelta: 0.008
        }}
      >
        {orphanages.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={MapMarker}
            coordinate={{
            latitude: orphanage.latitude,
            longitude: orphanage.longitude
            }}
            calloutAnchor={{
              x: 2.7,
              y: 0.8
            }}
        >
          <Callout
            tooltip
            onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
            <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>{orphanage.name}</Text>

            </View>
          </Callout>
        </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0080A5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3, // sombra para android


  },
  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito_700Bold'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});
