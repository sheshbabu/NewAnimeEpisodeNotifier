// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
      borderColor: '#eee',
      borderBottomWidth: 1,
      height: 70,
      padding: 10,
      marginBottom: 5
  },
  episodeTitle: {
      color: 'black',
      fontSize: 14
  },
  airingText: {
      color: 'gray',
      fontSize: 12
  }
});

export default function AnimeListItem ({anime}) {
    return (
        <View style={styles.container}>
            <Text style={styles.episodeTitle}>{anime.title_english}</Text>
            <Text style={styles.airingText}>{getNextAiringTime(anime.airing.time)}</Text>
        </View>
    );
}

function getNextAiringTime (time) {
    return `Next episode ${moment(time).fromNow()} (${moment(time).format('ddd')})`
}
