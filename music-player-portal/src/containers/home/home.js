import React, { useState, useEffect } from 'react';
import { getNewReleaseAlbum } from '../../api/home/new-release';
import { createParamRoute, navigationRoute } from '../../../../common/util/route';
import { CardItem } from '../../components';
import { Divider } from 'antd';
import './home.scss';

export const Home = () => {
    let [getApiState, changeGetApiState] = useState(false);
    let [newReleaseAlbumList, changeNewReleaseAlbumList] = useState([]);

    useEffect(() => {
        getNewReleaseAlbum()
            .then((respond) => {
                changeNewReleaseAlbumList(respond['albums']['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeNewReleaseAlbumList]);

    const homeAlbumItemClick = (albumItemInfo) => {
        let newRouteURL = createParamRoute(
            '/playlist/album',
            {
                id: albumItemInfo.itemId,
                name: albumItemInfo.itemTitle,
                image: albumItemInfo.imageURL,
                artist: albumItemInfo.itemSubtitle
            });
        navigationRoute(newRouteURL);
    };

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
                                            itemTitle={item.name}
                                            itemHoverable={true}
                                            itemSubtitle={item.artists[0].name}
                                            imageURL={item.images[0].url}
                                            itemClickAction={homeAlbumItemClick}
                                            itemStyle={{width: 180}}
                                            itemImageClass={'custom-card-home-img-size'}
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

