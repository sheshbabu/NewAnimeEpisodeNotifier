// @flow

import React from 'react';
import { AsyncStorage, ToastAndroid, Switch, View, Text, StyleSheet } from 'react-native';
import PushNotification from 'react-native-push-notification';

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  text: {
      color: 'gray',
      fontSize: 12,
  }
});

export default class NotificationToggle extends React.Component {

    constructor () {
        super();
        this.state = {
            hasLoaded: false,
            isNotificationActive: false
        }
        this.toggleNotification = this.toggleNotification.bind(this);
    }

    async componentDidMount () {
        this.setState({
            hasLoaded: true,
            isNotificationActive: await this.isNotificationActive()
        });
    }

    async isNotificationActive () {
        const isActive = await AsyncStorage.getItem(String(this.props.anime.id));
        return isActive === 'true';
    }

    async toggleNotification () {
        if (await this.isNotificationActive()) {
            await AsyncStorage.removeItem(String(this.props.anime.id));
            ToastAndroid.show('Notification removed', ToastAndroid.SHORT);
            this.removeNotifications();
        } else {
            await AsyncStorage.setItem(String(this.props.anime.id), 'true');
            ToastAndroid.show('Notification added', ToastAndroid.SHORT);
            this.scheduleNotifications();
        }

        this.setState({
            isNotificationActive: await this.isNotificationActive()
        });
    }

    scheduleNotifications () {
        PushNotification.localNotificationSchedule({
            id: String(this.props.anime.id),
            message: `${this.props.anime.title_english} will be airing now!`,
            date: new Date(this.props.anime.airing.time),
            repeatType: 'week'
        });
    }

    removeNotifications () {
        PushNotification.cancelLocalNotifications({
            id: String(this.props.anime.id)
        });
    }

    render () {
        if (!this.state.hasLoaded) {
            return null
        }

        const switchText = this.state.isNotificationActive ? 'Notifications On' : 'Notifications Off';

        return (
            <View style={styles.container}>
                <Switch onValueChange={this.toggleNotification} value={this.state.isNotificationActive} />
                <Text style={styles.text}>{switchText}</Text>
            </View>
        );
    }

}
