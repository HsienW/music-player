import React, {useState, useEffect} from 'react';
import {getAllCategories} from '../../api';
import {CardItem} from '../../components';
import {Divider} from 'antd';
import {createParamRoute, navigationRoute} from '../../../../common/util';
import './all-categories.scss';

export const AllCategories = (props) => {
    // const {pubSub, pubSubKey} = {...props};
    let [getApiState, changeGetApiState] = useState(false);
    let [allCategoriesList, changeAllCategoriesList] = useState([]);

    useEffect(() => {
        // const songInfo = queryString.parse(location.search);

        getAllCategories()
            .then((respond) => {
                changeAllCategoriesList(respond['categories']['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeAllCategoriesList]);

    const categoriesItemClick = (categoriesItemInfo) => {
        let newRouteURL = createParamRoute(
            '/playlist/categories-detail',
            {
                id: categoriesItemInfo.itemId,
                title: categoriesItemInfo.itemTitle
            });
        navigationRoute(newRouteURL);

        // getCategoryPlaylists('happier_than_ever')
        //     .then((respond) => {
        //         console.log('vvvvvvvvvvvvvvvvvvvvvv');
        //         console.log(respond);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        //
        // getPlaylistSongs('37i9dQZF1DX0689YIyRQqT')
        //     .then((respond) => {
        //         console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        //         console.log(respond);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    return (
        <>
            {
                getApiState
                    ? <>
                        <div className={'all-categories-container-title'}>All Categories</div>
                        <Divider style={{margin: '20 0'}}/>
                        <div className={'all-categories-container-content'}>
                            {
                                allCategoriesList.map((item) => {
                                    return (
                                        <CardItem
                                            key={item.id}
                                            itemId={item.id}
                                            itemTitle={item.name}
                                            itemHoverable={true}
                                            itemSubtitle={''}
                                            imageURL={item.icons[0].url}
                                            itemClickAction={categoriesItemClick}
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

