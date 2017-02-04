// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
      borderColor: '#eee',
      borderBottomWidth: 1,
      height: 70,
      padding: 10,
      marginBottom: 5
  },
  text: {
      color: 'black',
      fontSize: 14
  }
});

export default function AnimeListItem ({name}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
        </View>
    );
}
