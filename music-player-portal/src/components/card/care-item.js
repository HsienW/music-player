import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import './card-item.scss';

const {Meta} = Card;

const handleClick = () => {
    console.log('handleClick');
};

export const CardItem = (props) => {
    const {itemName, imageURL} = {...props};
    return (
        <Card
            className='custom-card-body'
            hoverable
            onClick={handleClick}
            cover={<img src={imageURL}/>}
            style={{
                width: 180,
                // margin: '10px',
            }}
        >
            <Meta
                title={itemName}
            />
        </Card>
    );
};

CardItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
};

