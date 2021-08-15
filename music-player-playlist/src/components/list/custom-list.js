import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { CustomListItem } from './custom-list-item';
import './custom-list.scss';

export const CustomList = (props) => {
    const { listData, itemClickAction } = { ...props };

    return (
        <List
            dataSource={listData}
            renderItem={item => (
                <CustomListItem
                    // imageURL={item.album.images[2].url}
                    itemId={item.id}
                    itemName={item.name}
                    itemDescription={item.artists[0].name}
                    itemDuration={'00:30'}
                    itemSongURL={item.preview_url}
                    itemClickAction={itemClickAction}
                />
            )}
        />
    );
};

CustomList.propTypes = {
    listData: PropTypes.array.isRequired,
    itemClickAction: PropTypes.func.isRequired,
};

