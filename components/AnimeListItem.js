// @flow

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
      borderColor: '#eee',
      borderBottomWidth: 1,
      padding: 10,
      flexDirection: 'row'
  },
  animeCover: {
      resizeMode: 'contain',
      height: 100,
      flex: 1
  },
  content: {
      flex: 3,
      justifyContent: 'space-between',
      alignItems: 'flex-start'
  },
  textContent: {
  },
  icon: {
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
            <Image style={styles.animeCover} source={{uri: anime.image_url_lge}}/>
            <View style={styles.content}>
                <View style={styles.textContent}>
                    <Text style={styles.episodeTitle}>{anime.title_english}</Text>
                    <Text style={styles.airingText}>{getNextAiringTime(anime.airing.time)}</Text>
                </View>
                <Icon name='notifications-active' style={styles.icon} color='#8BC34A'/>
            </View>
        </View>
    );
}

function getNextAiringTime (time) {
    return `Next episode ${moment(time).fromNow()} (${moment(time).format('ddd')})`
}
