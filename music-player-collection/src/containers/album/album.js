import React, {useState, useEffect} from 'react';
import {getAlbumSongs} from '../../api';
import {CardItem, CustomList} from '../../components';
import {Skeleton} from 'antd';
import queryString from 'query-string';
import './album.scss';

export const Album = (props) => {
    const {pubSub, pubSubKey} = {...props};
    const songInfo = queryString.parse(location.search);

    let [getApiState, changeGetApiState] = useState(false);
    let [albumInfo, changeAlbumInfo] = useState(null);
    let [albumSongList, changeAlbumSongList] = useState([]);

    useEffect(() => {
        getAlbumSongs(songInfo.id)
            .then((respond) => {
                changeAlbumInfo(songInfo);
                changeAlbumSongList(respond['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeAlbumInfo, changeAlbumSongList]);

    const cardItemClick = () => {
        console.log('click');
    };

    const albumSongItemClick = (songItemInfo) => {
        console.log('是是是是是是是是是是是是是是是是是')
        console.log(albumInfo)
        console.log(albumSongList)
        let clickSongsData = {
            songInfo: songItemInfo,
            albumInfo: albumInfo,
            albumSongList: albumSongList
        };
        pubSub.doPublish(pubSubKey.common.playSong, clickSongsData);
    };

    return (
        <div className={'album-container'}>
            {
                getApiState
                    ? <>
                        <CardItem
                            key={albumInfo.id}
                            itemId={albumInfo.id}
                            itemTitle={albumInfo.name}
                            itemHoverable={false}
                            itemSubtitle={albumInfo.artist}
                            imageURL={albumInfo.image}
                            itemClickAction={cardItemClick}
                            itemStyle={{width: 300, height: 400}}
                            itemImageClass={'custom-card-album-img-size'}
                        />
                        <CustomList
                            listData={albumSongList}
                            listStyle={{width: '100%'}}
                            itemDescription={albumInfo.artist}
                            itemClickAction={albumSongItemClick}
                        />
                    </>
                    : <Skeleton active={true}/>
            }
        </div>
    );
};

