import React, {useState, useEffect} from 'react';
import {getCategoryPlaylist} from '../../api';
import {CardItem} from '../../components';
import {Divider} from 'antd';
import queryString from 'query-string';
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
    };

    return (
        <>
            {
                getApiState
                    ? <>
                        <div className={'categories-container-title'}>{categoryInfo.title}</div>
                        <Divider style={{margin: '20 0'}}/>
                        <div className={'categories-container-content'}>
                            {
                                categoriesPlayList.map((item) => {
                                    return (
                                        <CardItem
                                            key={item.id}
                                            itemId={item.id}
                                            itemTitle={item.name}
                                            itemHoverable={true}
                                            itemSubtitle={''}
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
                    : <div>Loading...</div>
            }
        </>
    );
};

