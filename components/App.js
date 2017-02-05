// @flow

import React from 'react';
import { View } from 'react-native';
import AnimeList from './AnimeList';

export default function App () {
    return (
        <View style={{ flex: 1 }}>
            <AnimeList/>
        </View>
    );
}
