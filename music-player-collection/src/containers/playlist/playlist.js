import React, {useState, useEffect} from 'react';
import {getPlaylistSongs} from '../../api';
import {CardItem, CustomList} from '../../components';
import {formatPlaylistSongList} from '../../../../common/util';
import queryString from 'query-string';
import './playlist.scss';

export const Playlist = (props) => {
    const {pubSub, pubSubKey} = {...props};
    const listInfo = queryString.parse(location.search);

    let [getApiState, changeGetApiState] = useState(false);
    let [playlistInfo, changePlaylistInfo] = useState(null);
    let [playlistSongList, changePlaylistSongList] = useState([]);

    useEffect(() => {
        getPlaylistSongs(listInfo.id)
            .then((respond) => {
                changePlaylistInfo(listInfo);
                changePlaylistSongList(formatPlaylistSongList(respond['items']));
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetApiState(false);
            });
    }, [changePlaylistInfo, changePlaylistSongList]);

    const cardItemClick = () => {
        console.log('click');
    };

    const playlistItemClick = (songItemInfo) => {
        let clickAlbumSongsData = {
            songInfo: songItemInfo,
            albumInfo: playlistInfo,
            albumSongList: playlistSongList
        };
        pubSub.doPublish(pubSubKey.common.playSong, clickAlbumSongsData);
    };

    return (
        <div className={'playlist-container'}>
            {
                getApiState
                    ? <>
                        <CardItem
                            key={playlistInfo.id}
                            itemId={playlistInfo.id}
                            itemTitle={playlistInfo.name}
                            itemHoverable={false}
                            itemSubtitle={playlistInfo.artist}
                            imageURL={playlistInfo.image}
                            itemClickAction={cardItemClick}
                            itemStyle={{width: 300, height: 400}}
                            itemImageClass={'custom-card-playlist-img-size'}
                        />
                        <CustomList
                            listData={playlistSongList}
                            listStyle={{width: '100%'}}
                            itemDescription={playlistInfo.artist}
                            itemClickAction={playlistItemClick}
                        />
                    </>
                    : <div>Loading...</div>
            }
        </div>
    );
};

