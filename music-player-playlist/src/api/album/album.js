import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

export const getAlbumSongs = (albumId) => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getAlbumTracks(albumId);
};
