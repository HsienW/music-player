import React from 'react';
import PropTypes from 'prop-types';
import {List, Avatar} from 'antd';
import './custom-list-item.scss';

export const CustomListItem = (props) => {
    const { itemId, itemName, imageURL, itemDescription, itemDuration, itemSongURL, itemClickAction } = {...props};

    const itemClick = () => {
        itemClickAction(props);
    };

    return (
        <div className={'custom-list-item'}>
            <List.Item
                key={itemId}
                onClick={itemClick}
            >
                <List.Item.Meta
                    // avatar={<Avatar src={imageURL}/>}
                    title={itemName}
                    description={itemDescription}
                />
                <div>{itemDuration}</div>
            </List.Item>
        </div>
    );
};

CustomListItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    // imageURL: PropTypes.string.isRequired,
    itemDescription: PropTypes.string.isRequired,
    itemDuration: PropTypes.string.isRequired,
    itemSongURL: PropTypes.string.isRequired,
    itemClickAction: PropTypes.func.isRequired,
};

