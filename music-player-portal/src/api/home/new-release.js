import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

export const getNewReleaseAlbum = () => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getNewReleases();
};
