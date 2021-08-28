const filteredEmptyImage = function (data) {
    let newData = [];
    data.forEach((item) => {
        if (item.images === null
            || item.images === undefined
            || item.images.length === 0
            || item.images[0].url === null
            || item.images[0].url === undefined
        ) {
            return;
        }
        newData.push(item);
    });
    return newData;
}

const filteredSongEmptyImage = function (data) {
    let newData = [];
    data.forEach((item) => {
        if (item.album.images === null
            || item.album.images === undefined
            || item.album.images.length === 0
            || item.album.images[0].url === null
        ) {
            return;
        }
        newData.push(item);
    });
    return newData;
}

const filteredEmptySong = function (data) {
    let newData = [];
    data.forEach((item) => {
        if (item.preview_url === null || item.preview_url === undefined) {
            return;
        }
        newData.push(item);
    });
    return newData;
}

const filteredPlaylistSongList = function (data) {
    let newData = [];
    data.forEach((item) => {
        if (item.track === null
            || item.track === undefined
            || item.track.length === 0
            || item.track.preview_url === null
            || item.track.preview_url === undefined
        ) {
            return;
        }
        newData.push({...item.track});
    });
    return newData;
}

const formatPlaySongAlbumList = function (data) {
    return data.albumSongList.map((item) => {
        return {
            ...item,
            artist: data.albumInfo.artist ? data.albumInfo.artist : data.albumInfo.artists[0].name,
            album: data.albumInfo.name,
            url: item.preview_url,
            cover_art_url: data.albumInfo.image ? data.albumInfo.image : data.albumInfo.images[0].url
        };
    });
}

const formatArtistSongList = function (data) {
    return data.map((item) => {
        return {
            ...item,
            artist: item.artists[0].name,
            album: item.album.name,
            url: item.preview_url,
            cover_art_url: item.album.images[0].url
        };
    });
}

const getSongInPlayListIndex = function (songId) {
    return (item) => item.id === songId;
}

export {
    formatPlaySongAlbumList,
    filteredEmptyImage,
    filteredEmptySong,
    filteredPlaylistSongList,
    filteredSongEmptyImage,
    getSongInPlayListIndex,
    formatArtistSongList
}
