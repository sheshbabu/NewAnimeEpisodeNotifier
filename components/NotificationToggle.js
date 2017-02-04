// @flow

import React from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import PushNotification from 'react-native-push-notification';

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
        return await AsyncStorage.getItem(String(this.props.anime.id));
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

        if (this.state.isNotificationActive) {
            return <Icon name='notifications-active' color='#8BC34A' onPress={this.toggleNotification}/>
        } else {
            return <Icon name='notifications' color='#757575' onPress={this.toggleNotification}/>
        }
    }

}
