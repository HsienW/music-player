import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const getFeaturedAlbum = () => {
    spotify.setAccessToken(JSON.parse(sessionStorage.getItem('user-token')));
    return spotify.getFeaturedPlaylists();
};

export {
    getFeaturedAlbum,
}



