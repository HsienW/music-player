import React, {useState, useEffect} from 'react';
import {getAlbumSongs} from '../../api/album/album';
import {CardItem, CustomList} from '../../components';
import queryString from 'query-string';
import './album.scss';

export const Album = (props) => {
    const {pubSub, pubSubKey} = {...props};

    let [getApiState, changeGetApiState] = useState(false);
    let [albumInfo, changeAlbumInfo] = useState(null);
    let [albumSongList, changeAlbumSongList] = useState([]);

    useEffect(() => {
        const songInfo = queryString.parse(location.search);

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
        let clickAlbumSongsData = {
            songInfo: songItemInfo,
            albumInfo: albumInfo,
            albumSongList: albumSongList
        };
        pubSub.doPublish(pubSubKey.common.playSong, clickAlbumSongsData);
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
                            itemClickAction={albumSongItemClick}
                            listStyle={{width: '100%'}}
                        />
                    </>
                    : <div>Loading...</div>
            }
        </div>
    );
}
;
