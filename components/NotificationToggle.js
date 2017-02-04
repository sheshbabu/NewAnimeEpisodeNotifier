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
    }

    async componentDidMount () {
        const value = await AsyncStorage.getItem(String(this.props.anime.id));
        this.setState({
            hasLoaded: true,
            isNotificationActive: value === 'true'
        });
    }

    render () {
        if (!this.state.hasLoaded) {
            return null
        }

        if (this.state.isNotificationActive) {
            return (
                <Icon
                    name='notifications-active'
                    color='#8BC34A'
                />
            )
        } else {
            return (
                <Icon
                    name='notifications'
                    color='#757575'
                />
            )
        }

    }

}
