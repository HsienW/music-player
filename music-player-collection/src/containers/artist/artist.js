import React, {useState, useEffect} from 'react';
import {getArtistInfo, getArtistTopSong} from '../../api';
import {CardItem, CustomList} from '../../components';
import {Skeleton} from 'antd';
import queryString from 'query-string';
import './artist.scss';

export const Artist = (props) => {
    const {pubSub, pubSubKey} = {...props};
    const artistData = queryString.parse(location.search);

    let [getApiState, changeGetApiState] = useState(false);
    let [artistInfo, changeArtistInfo] = useState(null);
    let [artistInfoList, changeArtistInfoList] = useState([]);

    useEffect(() => {
        getArtistTopSong(artistData.id)
            .then((respond) => {
                // artistInfo(songInfo);
                console.log('bbbbbbbbbbbbbbbbbbb');
                console.log(respond);
                // changeArtistInfo(respond['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeArtistInfo, changeArtistInfoList]);

    // const cardItemClick = () => {
    //     console.log('click');
    // };
    //
    // const albumSongItemClick = (songItemInfo) => {
    //     let clickAlbumSongsData = {
    //         songInfo: songItemInfo,
    //         albumInfo: albumInfo,
    //         albumSongList: albumSongList
    //     };
    //     pubSub.doPublish(pubSubKey.common.playSong, clickAlbumSongsData);
    // };

    return (
        <div className={'artist-container'}>
            {
                getApiState
                    ? <></>
                    : <Skeleton active={true}/>
            }
        </div>
    );
};


