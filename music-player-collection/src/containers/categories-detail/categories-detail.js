import React, {useState, useEffect} from 'react';
import {getCategoryPlaylist} from '../../api';
import {CardItem} from '../../components';
import {Divider, Skeleton} from 'antd';
import queryString from 'query-string';
import {createParamRoute, navigationRoute} from '../../../../common/util';
import './categories-detail.scss';

export const CategoriesDetail = (props) => {
    // const {pubSub, pubSubKey} = {...props};
    const categoryInfo = queryString.parse(location.search);

    let [getApiState, changeGetApiState] = useState(false);
    let [categoriesPlayList, changeCategoriesPlayList] = useState([]);

    useEffect(() => {
        getCategoryPlaylist(categoryInfo.id)
            .then((respond) => {
                changeCategoriesPlayList(respond['playlists']['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeCategoriesPlayList]);

    const categoriesPlaylistItemClick = (categoriesItemInfo) => {
        let newRouteURL = createParamRoute(
            '/collection/playlist',
            {
                id: categoriesItemInfo.itemId,
                name: categoriesItemInfo.itemTitle,
                image: categoriesItemInfo.imageURL,
                artist: categoriesItemInfo.itemSubtitle
            });
        navigationRoute(newRouteURL);
    };

    return (
        <>
            {
                getApiState
                    ? <>
                        <div className={'categories-detail-container-title'}>{categoryInfo.title}</div>
                        <Divider style={{margin: '20 0'}}/>
                        <div className={'categories-detail-container-content'}>
                            {
                                categoriesPlayList.map((item) => {
                                    return (
                                        <CardItem
                                            key={item.id}
                                            itemId={item.id}
                                            itemTitle={item.name}
                                            itemHoverable={true}
                                            itemSubtitle={item.owner.display_name}
                                            imageURL={item.images[0].url}
                                            itemClickAction={categoriesPlaylistItemClick}
                                            itemStyle={{width: 180}}
                                            itemImageClass={'custom-card-categories-img-size'}
                                        >
                                        </CardItem>
                                    );
                                })
                            }
                        </div>
                    </>
                    : <Skeleton active={true}/>
            }
        </>
    );
};

