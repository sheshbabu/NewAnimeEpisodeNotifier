// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'darkslateblue',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
  },
  text: {
      color: 'white',
      fontWeight: '400',
      fontSize: 16
  }
});

export default function AppHeader () {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Anime List</Text>
        </View>
    );
}