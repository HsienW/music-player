import React, {useState, useEffect} from 'react';
import {getPlaylistSongs} from '../../api';
import {CardItem, CustomList} from '../../components';
import {authLoginChecker, filteredPlaylistSongList} from '../../../../common/util';
import {decorator} from '../../../../common/decorator/decorator';
import {Skeleton} from 'antd';
import queryString from 'query-string';
import './playlist.scss';

export const PlaylistContainer = (props) => {
    const {observer, observerKey} = {...props};
    const listInfo = queryString.parse(location.search);

    let [getApiState, changeGetApiState] = useState(false);
    let [playlistInfo, changePlaylistInfo] = useState(null);
    let [playlistSongList, changePlaylistSongList] = useState([]);

    useEffect(() => {
        getPlaylistSongs(listInfo.id)
            .then((respond) => {
                changePlaylistInfo(listInfo);
                changePlaylistSongList(filteredPlaylistSongList(respond['items']));
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
        let clickSongsData = {
            songInfo: songItemInfo,
            albumInfo: playlistInfo,
            albumSongList: playlistSongList
        };
        observer.doPublish(observerKey.player.songPlay, clickSongsData);
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
                    : <Skeleton active={true}/>
            }
        </div>
    );
};

export const Playlist = decorator.before(PlaylistContainer, authLoginChecker);
