// @flow

import React from 'react';
import { View } from 'react-native';
import AppHeader from './AppHeader';
import AnimeList from './AnimeList';

export default function App () {
    return (
        <View>
            <AppHeader/>
            <AnimeList/>
        </View>
    );
}