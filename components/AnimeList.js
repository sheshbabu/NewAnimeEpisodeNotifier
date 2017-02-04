// @flow

import React from 'react';
import { ScrollView, Text } from 'react-native';
import queryString from 'query-string';
import AnimeListItem from './AnimeListItem';
import CONFIG from '../config';

export default class AnimeList extends React.Component {

    constructor () {
        super();
        this.state = {
            list: []
        }
    }

    async componentDidMount () {
        const list = await this.fetchList();
        this.setState({ list });
    }

    async fetchList () {
        const accessToken = await this.fetchAccessToken()
        const browse = await this.fetchBrowse(accessToken);

        return browse;
    }

    async fetchBrowse ({ access_token }) {
        const queryParams = { 
            access_token,
            year: '2017',
            season: 'winter',
            status: 'currently airing',
            type: 'TV',
            sort: 'popularity-desc'
        }
        const url = 'https://anilist.co/api/browse/anime';
        const response = await fetch(url + '?' + queryString.stringify(queryParams))
        return await response.json();
    }

    async fetchAccessToken () {
        const queryParams = {
            grant_type: 'client_credentials',
            client_id: CONFIG.ANILIST_CLIENT_ID,
            client_secret: CONFIG.ANILIST_CLIENT_SECRET
        }
        const url = 'https://anilist.co/api/auth/access_token';
        const response = await fetch(url + '?' + queryString.stringify(queryParams), { method: 'POST' })
        return await response.json();
    }

    render () {
        if (this.state.list.length === 0) {
            return <Text>Loading...</Text>
        }

        const list = this.state.list.map((anime, index) => {
            return <AnimeListItem name={anime.title_english} key={index}/>
        })
        return <ScrollView>{list}</ScrollView>
    }

}
