import React, { useState, useEffect } from 'react';
import { getNewReleaseAlbum } from '../../api/home/new-release';
import { createParamRoute, navigationRoute } from '../../../../common/util/route';
import { CardItem } from '../../components';
import { Divider } from 'antd';
import './home.scss';

const test = {
    'albums': {
        'href': 'https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20',
        'items': [
            {
                'album_type': 'single',
                'artists': [
                    {
                        'external_urls': {
                            'spotify': 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ'
                        },
                        'href': 'https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ',
                        'id': '1Xyo4u8uXC1ZmMpatF05PJ',
                        'name': 'The Weeknd',
                        'type': 'artist',
                        'uri': 'spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ'
                    }
                ],
                'available_markets': [],
                'external_urls': {
                    'spotify': 'https://open.spotify.com/album/6DmXKM13nNgIIby2FdK0f8'
                },
                'href': 'https://api.spotify.com/v1/albums/6DmXKM13nNgIIby2FdK0f8',
                'id': '6DmXKM13nNgIIby2FdK0f8',
                'images': [
                    {
                        'height': 640,
                        'url': 'https://i.scdn.co/image/ab67616d0000b2733c041e53cb5c38b6de03e758',
                        'width': 640
                    },
                    {
                        'height': 300,
                        'url': 'https://i.scdn.co/image/ab67616d00001e023c041e53cb5c38b6de03e758',
                        'width': 300
                    },
                    {
                        'height': 64,
                        'url': 'https://i.scdn.co/image/ab67616d000048513c041e53cb5c38b6de03e758',
                        'width': 64
                    }
                ],
                'name': 'Take My Breath',
                'release_date': '2021-08-06',
                'release_date_precision': 'day',
                'total_tracks': 1,
                'type': 'album',
                'uri': 'spotify:album:6DmXKM13nNgIIby2FdK0f8'
            }
        ]
    }
};

const homeAlbumItemClick = (albumItemInfo) => {
    let newRouteURL = createParamRoute(
        '/playlist/album',
        {
            id: albumItemInfo.itemId,
            name: albumItemInfo.itemName,
            image: albumItemInfo.imageURL,
            artist: albumItemInfo.itemArtist
        });
    navigationRoute(newRouteURL);
};

export const Home = () => {
    let [getApiState, changeGetApiState] = useState(false);
    let [newReleaseAlbumList, changeListContent] = useState([]);

    useEffect(() => {
        getNewReleaseAlbum()
            .then((respond) => {
                // console.log(respond);
                changeListContent(respond['albums']['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log('錯誤錯誤錯誤錯誤錯誤');
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeListContent]);

    return (
        <>
            {
                getApiState
                    ? <>
                        <div className={'home-container-title'}>New Release</div>
                        <Divider style={{margin: '20 0'}}/>
                        <div className={'home-container-content'}>
                            {
                                newReleaseAlbumList.map((item) => {
                                    return (
                                        <CardItem
                                            key={item.id}
                                            itemId={item.id}
                                            itemName={item.name}
                                            itemHoverable={true}
                                            itemArtist={item.artists[0].name}
                                            imageURL={item.images[0].url}
                                            itemClickAction={homeAlbumItemClick}
                                            itemStyle={{width: 180}}
                                        >
                                        </CardItem>
                                    );
                                })
                            }
                        </div>
                    </>
                    : <div>Loading...</div>
            }
        </>
    );
};

