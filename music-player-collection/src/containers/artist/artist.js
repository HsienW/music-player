import React, {useState, useEffect} from 'react';
import {getArtistInfo, getArtistTopSong, getArtistAlbums} from '../../api';
import {CircularCardItem, CustomList} from '../../components';
import {Skeleton, Divider} from 'antd';
import queryString from 'query-string';
import './artist.scss';
import PropTypes from "prop-types";

export const Artist = (props) => {
    const {pubSub, pubSubKey} = {...props};
    const artistData = queryString.parse(location.search);

    let [getArtistInfoApiState, changeGetArtistInfoApiState] = useState(false);
    let [getArtistTopSongApiState, changeGetArtistTopSongApiState] = useState(false);
    let [getArtistAlbumsApiState, changeGetArtistAlbumsApiState] = useState(false);
    let [artistInfo, changeArtistInfo] = useState(null);
    let [artistTopSongList, changeArtistTopSongList] = useState([]);
    let [artistAlbumsList, changeArtistAlbumsList] = useState([]);

    useEffect(() => {
        getArtistInfo(artistData.id)
            .then((respond) => {
                changeArtistInfo(respond);
                changeGetArtistInfoApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetArtistInfoApiState(false);
            });

        getArtistTopSong(artistData.id)
            .then((respond) => {
                changeArtistTopSongList(respond['tracks']);
                changeGetArtistTopSongApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetArtistTopSongApiState(false);
            });

        getArtistAlbums(artistData.id)
            .then((respond) => {
                changeArtistAlbumsList(respond['items']);
                changeGetArtistAlbumsApiState(true);
            })
            .catch((error) => {
                console.log(error);
                changeGetArtistAlbumsApiState(false);
            });
    }, [changeArtistInfo, changeArtistTopSongList, changeArtistAlbumsList]);

    const circularCardItemClick = () => {
        console.log('click');
    };

    const topSongItemClick = (songItemInfo) => {
        console.log('點了點了點了點了點了點了');
        console.log(songItemInfo);
        let clickSongsData = {
            songInfo: songItemInfo,
            albumInfo: songItemInfo.itemData.album,
            albumSongList: artistTopSongList
        };
        pubSub.doPublish(pubSubKey.common.playSong, clickSongsData);
    };
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
                getArtistInfoApiState
                    ? <CircularCardItem
                        itemId={artistInfo.id}
                        itemTitle={artistInfo.name}
                        itemSubtitle={`followers ${artistInfo.followers.total}`}
                        imageURL={artistInfo.images[0].url}
                        itemClickAction={circularCardItemClick}
                        itemStyle={{width: 300, height: 300}}
                    />
                    : <Skeleton active={true}/>
            }
            {
                getArtistTopSongApiState
                    ?
                    <>
                        <div className={'home-container-title'}>Top Songs</div>
                        <Divider style={{margin: '20 0'}}/>
                        <CustomList
                            listData={artistTopSongList}
                            listStyle={{width: '100%'}}
                            itemDescription={artistInfo.name}
                            itemClickAction={topSongItemClick}
                        />
                    </>
                    : <Skeleton active={true}/>
            }
        </div>
    );
};



