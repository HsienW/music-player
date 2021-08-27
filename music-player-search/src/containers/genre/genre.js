import React, {useState, useCallback} from 'react';
import {getSearch} from '../../api';
import {createParamRoute, navigationRoute} from '../../../../common/util';
import {CardItem} from '../../components';
import {Divider, Skeleton, Input, Tabs} from 'antd';
import './genre.scss';

const {Search} = Input;
const {TabPane} = Tabs;

export const Genre = () => {
    let [getSearchApiState, changeSearchApiState] = useState(false);
    let [searchResultAlbumsState, changeSearchResultAlbumsState] = useState(false);
    let [searchResultArtistsState, changeSearchResultArtistsState] = useState(false);
    let [searchResultSongsState, changeSearchResultSongsState] = useState(false);
    let [searchData, changeSearchData] = useState([]);
    let [searchResultAlbums, changeSearchResultAlbums] = useState([]);
    let [searchResultArtists, changeSearchResultArtists] = useState([]);
    let [searchResultSongs, changeSearchResultSongs] = useState([]);

    const onSearch = useCallback(async (key) => {
        getSearch(key)
            .then((respond) => {
                changeSearchResultAlbums(respond['albums']['items']);
                changeSearchResultArtists(respond['artists']['items']);
                changeSearchResultSongs(respond['tracks']['items']);
                changeSearchApiState(true);
                changeSearchResultAlbumsState(true);
                changeSearchResultArtistsState(true);
                changeSearchResultSongsState(true);
            })
            .catch((error) => {
                console.log(error);
                changeSearchApiState(false);
                changeSearchResultAlbumsState(false);
                changeSearchResultArtistsState(false);
                changeSearchResultSongsState(false);
            });

    }, [changeSearchResultAlbums, changeSearchResultArtists, changeSearchResultSongs]);

    const callback = (key) => {
        console.log(key);
    };

    const albumItemClick = (albumItemInfo) => {
        let newRouteURL = createParamRoute(
            '/collection/album',
            {
                id: albumItemInfo.itemId,
                name: albumItemInfo.itemTitle,
                image: albumItemInfo.imageURL,
                artist: albumItemInfo.itemSubtitle
            });
        navigationRoute(newRouteURL);
    };

    const artistItemClick = (artistItemInfo) => {
        let newRouteURL = createParamRoute(
            '/collection/artist',
            {
                id: artistItemInfo.itemId,
                name: artistItemInfo.itemTitle,
                image: artistItemInfo.imageURL,
                artist: artistItemInfo.itemSubtitle
            });
        navigationRoute(newRouteURL);
    };

    return (
        <>
            <div className={'search-container-title'}>
                <Search
                    placeholder="Search for what you want..."
                    onSearch={onSearch}
                    style={{width: '40%', minWidth: '200px'}}
                />
            </div>
            <Divider style={{margin: '20 0'}}/>
            {
                getSearchApiState
                    ? <Tabs defaultActiveKey="albums" onChange={callback}>
                        <TabPane tab="Albums" key="search-albums" className={'search-container-content'}>
                            {
                                searchResultAlbumsState
                                    ? searchResultAlbums.map((item) => {
                                        return (
                                            <CardItem
                                                key={item.id}
                                                itemId={item.id}
                                                itemTitle={item.name}
                                                itemHoverable={true}
                                                itemSubtitle={item.artists[0].name}
                                                imageURL={item.images[0].url}
                                                itemClickAction={albumItemClick}
                                                itemStyle={{width: 180}}
                                                itemImageClass={'custom-card-home-img-size'}
                                            >
                                            </CardItem>
                                        );
                                    })
                                    : <Skeleton active={true}/>
                            }
                        </TabPane>
                        <TabPane tab="Artists" key="search-artists" className={'search-container-content'}>
                            {
                                searchResultArtistsState
                                    ? searchResultArtists.map((item) => {
                                        return (
                                            <CardItem
                                                key={item.id}
                                                itemId={item.id}
                                                itemTitle={item.name}
                                                itemHoverable={true}
                                                itemSubtitle={item.name}
                                                imageURL={item.images[0].url}
                                                itemClickAction={artistItemClick}
                                                itemStyle={{width: 180}}
                                                itemImageClass={'custom-card-home-img-size'}
                                            >
                                            </CardItem>
                                        );
                                    })
                                    : <Skeleton active={true}/>
                            }
                        </TabPane>
                        <TabPane tab="Songs" key="search-songs" className={'search-container-content'}>
                            {
                                searchResultSongsState
                                    ? searchResultSongs.map((item) => {
                                        return (
                                            <CardItem
                                                key={item.id}
                                                itemId={item.id}
                                                itemTitle={item.name}
                                                itemHoverable={true}
                                                itemSubtitle={item.artists[0].name}
                                                imageURL={item.album.images[0].url}
                                                itemClickAction={artistItemClick}
                                                itemStyle={{width: 180}}
                                                itemImageClass={'custom-card-home-img-size'}
                                            >
                                            </CardItem>
                                        );
                                    })
                                    : <Skeleton active={true}/>
                            }
                        </TabPane>
                    </Tabs>
                    : null
            }
        </>
    );
};
