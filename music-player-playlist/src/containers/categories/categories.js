import React, {useState, useEffect} from 'react';
import {getAllCategories} from '../../api/categories/categories';
import {CardItem} from '../../components';
import {Divider} from 'antd';
// import queryString from 'query-string';
import './categories.scss';

export const Categories = (props) => {
    // const {pubSub, pubSubKey} = {...props};

    let [getApiState, changeGetApiState] = useState(false);
    let [categoriesList, changeCategoriesList] = useState([]);

    useEffect(() => {
        // const songInfo = queryString.parse(location.search);

        getAllCategories()
            .then((respond) => {
                changeCategoriesList(respond['categories']['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeCategoriesList]);

    const categoriesItemClick = () => {
        // let newRouteURL = createParamRoute(
        //     '/playlist/album',
        //     {
        //         id: albumItemInfo.itemId,
        //         name: albumItemInfo.itemName,
        //         image: albumItemInfo.imageURL,
        //         artist: albumItemInfo.itemArtist
        //     });
        // navigationRoute(newRouteURL);
    };

    return (
        <>
            {
                getApiState
                    ? <>
                        <div className={'categories-container-title'}>Play Categories</div>
                        <Divider style={{margin: '20 0'}}/>
                        <div className={'categories-container-content'}>
                            {
                                categoriesList.map((item) => {
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

