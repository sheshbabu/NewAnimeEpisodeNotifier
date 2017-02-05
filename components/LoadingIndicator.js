// @flow

import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  text: {
      marginTop: 10
  },
  subText: {
      marginTop: 10,
      fontSize: 12
  }
});

export default function LoadingIndicator ({ isFetchingFromServer }) {
    const loadingMessage = isFetchingFromServer ? 'Fetching data from server...' : 'Loading data from cache...';
    const pullToRefreshMessage = isFetchingFromServer ? '' : '(You can "Pull to Refresh" to fetch new data from server)'
    return (
        <View style={styles.container}>
            <ActivityIndicator color='#009688' size='large'/>
            <Text style={styles.text}>{loadingMessage}</Text>
            <Text style={styles.subText}>{pullToRefreshMessage}</Text>
        </View>
    );
}
