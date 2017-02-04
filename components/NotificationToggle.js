// @flow

import React from 'react';
import { AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements'

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
        } else {
            await AsyncStorage.setItem(String(this.props.anime.id), 'true');
        }

        this.setState({
            isNotificationActive: await this.isNotificationActive()
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
