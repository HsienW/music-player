const subAppInfo = [
    {
        name: 'music-player-portal',
        displayName: 'Portal',
        entry: process.env.REACT_APP_PORTAL_ENV,
        activeRule: '/portal',
        container: '#portal-root',
    },
    {
        name: 'music-player-search',
        displayName: 'Search',
        entry: process.env.REACT_APP_SEARCH_ENV,
        activeRule: '/search',
        container: '#search-root',
    },
    {
        name: 'music-player-playlist',
        displayName: 'Playlist',
        entry: process.env.REACT_APP_PLAYLIST_ENV,
        activeRule: '/playlist',
        container: '#playlist-root',
    }
];

export {
    subAppInfo
};

