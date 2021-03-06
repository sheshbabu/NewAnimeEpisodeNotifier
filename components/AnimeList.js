// @flow

import React from 'react';
import { ScrollView, RefreshControl, AsyncStorage } from 'react-native';
import queryString from 'query-string';
import AnimeListItem from './AnimeListItem';
import LoadingIndicator from './LoadingIndicator';
import CONFIG from '../config';

export default class AnimeList extends React.Component {

    state: {
        list: any,
        isLoading: bool,
        isFetchingFromServer: bool,
    }

    fetchList: Function

    constructor () {
        super();
        this.state = {
            list: [],
            isLoading: true,
            isFetchingFromServer: false
        }
        this.fetchList = this.fetchList.bind(this);
    }

    componentDidMount () {
        this.loadList();
    }

    async loadList () {
        const cachedList = await AsyncStorage.getItem('cachedList');
        if (cachedList) {
            this.setState({
                list: JSON.parse(cachedList),
                isLoading: false
            });
        } else {
            this.fetchList();
        }
    }

    async fetchList () {
        this.setState({
            isLoading: true,
            isFetchingFromServer: true
        });

        const accessToken = await this.fetchAccessToken();
        const list = await this.fetchBrowse(accessToken.access_token);
        await AsyncStorage.setItem('cachedList', JSON.stringify(list));

        this.setState({
            list,
            isLoading: false,
            isFetchingFromServer: false
        });
    }

    async fetchBrowse (access_token: string) {
        const queryParams = {
            access_token,
            status: 'Currently Airing',
            type: 'TV',
            sort: 'popularity-desc',
            airing_data: 'true',
            full_page: 'true',
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

    getRefreshControl () {
        return (
            <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this.fetchList}
                colors={['#009688']}
                progressBackgroundColor="#fff"
            />
        );
    }

    render () {
        if (this.state.isLoading) {
            return <LoadingIndicator isFetchingFromServer={this.state.isFetchingFromServer}/>;
        }

        const list = this.state.list
            .filter(anime => anime.airing !== null)
            .map(anime => <AnimeListItem anime={anime} key={anime.id}/>);

        return (
            <ScrollView refreshControl={this.getRefreshControl()}>
                {list}
            </ScrollView>
        )
    }

}
