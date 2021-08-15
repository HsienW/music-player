import React, {useState, useEffect} from 'react';
import {getAlbumSongs} from '../../api/album/album';
import {CardItem, CustomList} from '../../components';
import queryString from 'query-string';
import './album.scss';

const test = {
    'href': 'https://api.spotify.com/v1/albums/2TvfE8CY37OQIPVGcWYpEA/tracks?offset=0&limit=20',
    'items': [{
        'artists': [
            {
                'external_urls': {
                    'spotify': 'https://open.spotify.com/artist/2o5jDhtHVPhrJdv3cEQ99Z'
                },
                'href': 'https://api.spotify.com/v1/artists/2o5jDhtHVPhrJdv3cEQ99Z',
                'id': '2o5jDhtHVPhrJdv3cEQ99Z',
                'name': 'Tiësto',
                'type': 'artist',
                'uri': 'spotify:artist:2o5jDhtHVPhrJdv3cEQ99Z'
            },
            {
                'external_urls': {
                    'spotify': 'https://open.spotify.com/artist/790FomKkXshlbRYZFtlgla'
                },
                'href': 'https://api.spotify.com/v1/artists/790FomKkXshlbRYZFtlgla',
                'id': '790FomKkXshlbRYZFtlgla',
                'name': 'KAROL G',
                'type': 'artist',
                'uri': 'spotify:artist:790FomKkXshlbRYZFtlgla'
            }
        ],
        'available_markets': ['AD', 'AE', 'AG', 'AL', 'AM', 'AO', 'AR', 'AT', 'AU', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BN', 'BO', 'BR', 'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CH', 'CI', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES', 'FI', 'FJ', 'FM', 'FR', 'GA', 'GB', 'GD', 'GE', 'GH', 'GM', 'GN', 'GQ', 'GR', 'GT', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'MA', 'MC', 'MD', 'ME', 'MG', 'MH', 'MK', 'ML', 'MN', 'MO', 'MR', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NZ', 'OM', 'PA', 'PE', 'PG', 'PH', 'PK', 'PL', 'PS', 'PT', 'PW', 'PY', 'QA', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SI', 'SK', 'SL', 'SM', 'SN', 'SR', 'ST', 'SV', 'SZ', 'TD', 'TG', 'TH', 'TL', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VC', 'VN', 'VU', 'WS', 'XK', 'ZA', 'ZM', 'ZW'],
        'disc_number': 1,
        'duration_ms': 140500,
        'explicit': false,
        'external_urls': {
            'spotify': 'https://open.spotify.com/track/0bI7K9Becu2dtXK1Q3cZNB'
        },
        'href': 'https://api.spotify.com/v1/tracks/0bI7K9Becu2dtXK1Q3cZNB',
        'id': '0bI7K9Becu2dtXK1Q3cZNB',
        'is_local': false,
        'name': "Don't Be Shy",
        'preview_url': 'https://p.scdn.co/mp3-preview/54889f56ba255f24b2d7ecbca72fee9bff699332?cid=1c74ad8d2483424ca84efade725329c1',
        'track_number': 1,
        'type': 'track',
        'uri': 'spotify:track:0bI7K9Becu2dtXK1Q3cZNB'
    }


    ],
    'limit': 20,
    'next': null,
    'offset': 0,
    'previous': null,
    'total': 1
};

const cardItemClick = () => {
    console.log('xxxxxxxxxxx');
    return;
};

const albumSongItemClick = (songItemInfo) => {
    console.log('有喔有喔有喔有喔有喔');
    console.log(songItemInfo);
};

export const Album = () => {

    let [getApiState, changeGetApiState] = useState(false);
    let [albumSongInfo, changeSongInfo] = useState(null);
    let [albumSongList, changeListContent] = useState([]);

    useEffect(() => {
        const songInfo = queryString.parse(location.search);

        getAlbumSongs(songInfo.id)
            .then((respond) => {
                // console.log(respond);
                changeSongInfo(songInfo);
                changeListContent(respond['items']);
                changeGetApiState(true);
            })
            .catch((error) => {
                console.log('錯誤錯誤錯誤錯誤錯誤');
                console.log(error);
                changeGetApiState(false);
            });
    }, [changeSongInfo, changeListContent]);

    return (
        <div className={'album-container'}>
            {
                getApiState
                    ? <>
                        <CardItem
                            key={albumSongInfo.id}
                            itemId={albumSongInfo.id}
                            itemName={albumSongInfo.name}
                            itemHoverable={false}
                            itemArtistName={albumSongInfo.artist}
                            imageURL={albumSongInfo.image}
                            itemClickAction={cardItemClick}
                            itemStyle={{width: 300}}
                        />
                        <CustomList
                            listData={albumSongList}
                            itemClickAction={albumSongItemClick}
                        />
                    </>
                    : <div>Loading...</div>
            }
        </div>
    );
};
