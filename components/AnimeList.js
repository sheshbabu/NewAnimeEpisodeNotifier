// @flow

import React from 'react';
import { ScrollView } from 'react-native';
import AnimeListItem from './AnimeListItem';
import MOCK_DATA from '../MockData';

export default function AnimeList () {
    const list = MOCK_DATA.map((name, index) => <AnimeListItem name={name} key={index}/>)
    return <ScrollView>{list}</ScrollView>
}