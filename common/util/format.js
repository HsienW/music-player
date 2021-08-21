const formatAlbumSongList = function (data) {
    return data.albumSongList.map((item) => {
        return {
            ...item,
            artist: data.albumInfo.artist,
            album: data.albumInfo.name,
            url: item.preview_url,
            cover_art_url: data.albumInfo.image
        };
    });
}

const getSongInPlayListIndex = function (songId) {
    return (item) => item.id  === songId;
}

export {
    formatAlbumSongList,
    getSongInPlayListIndex
}
