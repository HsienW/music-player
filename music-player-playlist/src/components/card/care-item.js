import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import './card-item.scss';

const { Meta } = Card;

export const CardItem = (props) => {
    const { itemName, itemArtistName, itemHoverable, imageURL, itemStyle, itemClickAction } = {...props};

    const itemClick = () => {
        itemClickAction(props);
    };

    return (
        <Card
            className='custom-card-body'
            hoverable={itemHoverable}
            onClick={itemClick}
            cover={<img src={imageURL}/>}
            style={itemStyle}
        >
            <Meta
                title={itemName}
                description={itemArtistName}
            />
        </Card>
    );
};

CardItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemArtistName: PropTypes.string.isRequired,
    itemHoverable: PropTypes.bool.isRequired,
    imageURL: PropTypes.string.isRequired,
    itemClickAction: PropTypes.func.isRequired,
    itemStyle: PropTypes.object.isRequired,
};

