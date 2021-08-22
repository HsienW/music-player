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
            '/collection/categories-detail',
            {
                id: categoriesItemInfo.itemId,
                title: categoriesItemInfo.itemTitle
            });
        navigationRoute(newRouteURL);
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

