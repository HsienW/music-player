import React, { useState, useEffect } from 'react';
import { getAlbumSongs } from '../../api/album/album';
// import { CardItem } from '../../components';
import './album.scss';

const test = {
    'href': 'https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?offset=0&limit=2',
    'items': [ {
        'artists': [ {
            'external_urls': {
                'spotify': 'https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q'
            },
            'href': 'https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q',
            'id': '08td7MxkoHQkXnWAYD8d6Q',
            'name': 'Tania Bowra',
            'type': 'artist',
            'uri': 'spotify:artist:08td7MxkoHQkXnWAYD8d6Q'
        } ],
        'available_markets': [ 'AD', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'RO', 'SE', 'SG', 'SI', 'SK', 'SV', 'TR', 'TW', 'US', 'UY' ],
        'disc_number': 1,
        'duration_ms': 276773,
        'explicit': false,
        'external_urls': {
            'spotify': 'https://open.spotify.com/track/2TpxZ7JUBn3uw46aR7qd6V'
        },
        'href': 'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V',
        'id': '2TpxZ7JUBn3uw46aR7qd6V',
        'name': 'All I Want',
        'preview_url': 'https://p.scdn.co/mp3-preview/6d00206e32194d15df329d4770e4fa1f2ced3f57',
        'track_number': 1,
        'type': 'track',
        'uri': 'spotify:track:2TpxZ7JUBn3uw46aR7qd6V'
    }, {
        'artists': [ {
            'external_urls': {
                'spotify': 'https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q'
            },
            'href': 'https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q',
            'id': '08td7MxkoHQkXnWAYD8d6Q',
            'name': 'Tania Bowra',
            'type': 'artist',
            'uri': 'spotify:artist:08td7MxkoHQkXnWAYD8d6Q'
        } ],
        'available_markets': [ 'AD', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'RO', 'SE', 'SG', 'SI', 'SK', 'SV', 'TR', 'TW', 'US', 'UY' ],
        'disc_number': 1,
        'duration_ms': 247680,
        'explicit': false,
        'external_urls': {
            'spotify': 'https://open.spotify.com/track/4PjcfyZZVE10TFd9EKA72r'
        },
        'href': 'https://api.spotify.com/v1/tracks/4PjcfyZZVE10TFd9EKA72r',
        'id': '4PjcfyZZVE10TFd9EKA72r',
        'name': 'Someday',
        'preview_url': 'https://p.scdn.co/mp3-preview/2b15de922bf4f4b8cfe09c8448079b8ff7a45a5f',
        'track_number': 2,
        'type': 'track',
        'uri': 'spotify:track:4PjcfyZZVE10TFd9EKA72r'
    } ],
    'limit': 2,
    'next': 'https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks?offset=2&limit=2',
    'offset': 0,
    'previous': null,
    'total': 11
};

export const Album = () => {

    let [getApiState, changeGetApiState] = useState(false);
    let [albumSongList, changeListContent] = useState([]);

    useEffect(() => {
        getAlbumSongs('2TvfE8CY37OQIPVGcWYpEA')
            .then((respond) => {
                // console.log(respond);
                changeListContent(test['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log('錯誤錯誤錯誤錯誤錯誤');
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeListContent]);

    return (
        <div className={'album-container'}>
            {
                getApiState
                    ? <>album info</>
                    : <div>Loading...</div>
            }
        </div>
    );
};
