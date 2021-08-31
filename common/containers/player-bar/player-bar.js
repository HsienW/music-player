import amplitude from 'amplitudejs';
import {playerBarStyle} from './player-bar-style';
import {observer, observerKey} from '../../observer';
import {formatPlaySongAlbumList, getSongInPlayListIndex} from '../../util';

class PlayerBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.amplitude = amplitude;
        this.playList = [{'url': ''}];
        this.domStyling();
        this.domRender();
        this.domEventInit();
        this.playerConfig();
        observer.doSubscribe(observerKey.common.playSong, this.playSong.bind(this));
    }

    domStyling() {
        let style = document.createElement('style');
        style.textContent = playerBarStyle;
        this.shadow.appendChild(style);
    }

    domRender() {
        this.playerBarBody = document.createElement('div');
        this.detailArea = document.createElement('div');
        this.detailSongImage = document.createElement('img');
        this.detailSongName = document.createElement('div');
        this.detailArtistName = document.createElement('div');

        this.controlArea = document.createElement('div');
        this.controlAreaButtons = document.createElement('div');
        // this.controlFakeAddPlay = document.createElement('img');
        this.controlRepeat = document.createElement('img');
        this.controlShuffle = document.createElement('img');
        this.controlPrev = document.createElement('img');
        this.controlPlay = document.createElement('img');
        this.controlPause = document.createElement('img');
        this.controlNext = document.createElement('img');

        this.progressArea = document.createElement('div');
        this.progressBar = document.createElement('input');
        this.progressPlayedSeconds = document.createElement('div');
        this.progressSongSeconds = document.createElement('div');

        this.volumeArea = document.createElement('div');
        this.volumeButton = document.createElement('img');
        this.volumeRangeBar = document.createElement('input');

        this.playerBarBody.className = 'player-bar';
        this.detailArea.className = 'detail-area';
        this.detailSongImage.className = 'song-image hidden';
        this.detailSongName.className = 'song-name';
        this.detailArtistName.className = 'song-artist';

        this.controlArea.className = 'controls-area';
        this.controlAreaButtons.className = 'buttons';
        // this.controlFakeAddPlay.className = 'icon repeat';
        this.controlRepeat.className = 'icon repeat';
        this.controlShuffle.className = 'icon shuffle';
        this.controlPrev.className = 'icon prev';
        this.controlPlay.className = 'icon play';
        this.controlPause.className = 'icon pause hidden';
        this.controlNext.className = 'icon next';

        this.progressArea.className = 'progress-area';
        this.progressBar.className = 'progress-bar';
        this.progressPlayedSeconds.className = 'progress-second';
        this.progressSongSeconds.className = 'progress-second';

        this.volumeArea.className = 'volume-area';
        this.volumeButton.className = 'icon volume-button';
        this.volumeRangeBar.className = 'volume-range-bar';

        this.detailSongImage.setAttribute('src', '');

        this.progressBar.setAttribute('amplitude-main-song-played-progress', 'true');
        this.progressBar.setAttribute('type', 'range');
        this.progressBar.setAttribute('min', '0');
        this.progressBar.setAttribute('max', '100');
        this.progressBar.setAttribute('step', '1');
        this.progressBar.setAttribute('value', '0');

        this.volumeButton.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/volume.svg');
        this.volumeRangeBar.setAttribute('type', 'range');
        this.volumeRangeBar.setAttribute('min', '0');
        this.volumeRangeBar.setAttribute('max', '100');
        this.volumeRangeBar.setAttribute('step', '1');
        this.volumeRangeBar.setAttribute('value', '50');

        // this.controlFakeAddPlay.setAttribute('src', '');
        this.controlRepeat.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/repeat.svg');
        this.controlPrev.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/prev.svg');
        this.controlPlay.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/play.svg');
        this.controlPlay.setAttribute('id', 'play-pause');
        this.controlPause.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/pause.svg');
        this.controlNext.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/next.svg');
        this.controlShuffle.setAttribute('src', 'https://music-player-demo-assets.s3.amazonaws.com/icon/shuffle.svg');

        this.detailSongName.textContent = '';
        this.detailArtistName.textContent = '';

        this.progressPlayedSeconds.textContent = '00:00';
        this.progressSongSeconds.textContent = '00:00';

        this.shadow.appendChild(this.playerBarBody);
        this.playerBarBody.appendChild(this.detailArea);
        this.detailArea.appendChild(this.detailSongImage);
        this.detailArea.appendChild(this.detailSongName);
        this.detailArea.appendChild(this.detailArtistName);

        this.playerBarBody.appendChild(this.controlArea);
        this.controlArea.appendChild(this.controlAreaButtons);
        // this.controlAreaButtons.appendChild(this.controlFakeAddPlay);
        this.controlAreaButtons.appendChild(this.controlRepeat);
        this.controlAreaButtons.appendChild(this.controlPrev);
        this.controlAreaButtons.appendChild(this.controlPlay);
        this.controlAreaButtons.appendChild(this.controlPause);
        this.controlAreaButtons.appendChild(this.controlNext);
        this.controlAreaButtons.appendChild(this.controlShuffle);

        this.controlArea.appendChild(this.progressArea);
        this.progressArea.appendChild(this.progressPlayedSeconds);
        this.progressArea.appendChild(this.progressBar);
        this.progressArea.appendChild(this.progressSongSeconds);

        this.playerBarBody.appendChild(this.volumeArea);
        this.volumeArea.appendChild(this.volumeButton);
        this.volumeArea.appendChild(this.volumeRangeBar);
    }

    playerConfig() {
        this.amplitude.init({
            songs: this.playList,
            callbacks: {
                timeupdate: () => {
                    const initTime = 0;
                    const songTime = this.amplitude.getSongDuration();
                    const playedTime = this.amplitude.getSongPlayedSeconds();
                    this.updateProgressBarTime(playedTime, songTime);
                    this.updateInputBarDisplay(this.progressBar, initTime, songTime, playedTime);
                },
                prev: () => {
                    console.log("上一首");
                    // 上一首等於重新播放, 切換顯示暫停按鈕
                    this.updateDomDisplayStyle(this.controlPlay, this.controlPause, 'hidden');
                },
                play: () => {
                    console.log("播放");
                    // 播放後切換顯示歌曲資訊
                    const songMetaData = this.amplitude.getActiveSongMetadata();
                    this.updateDomImgDisplay(this.detailSongImage, songMetaData.cover_art_url);
                    this.updateDomTextContent(this.detailSongName, songMetaData.name);
                    this.updateDomTextContent(this.detailArtistName, songMetaData.artist);
                    // 播放後切換顯示暫停按鈕
                    this.updateDomDisplayStyle(this.controlPlay, this.controlPause, 'hidden');
                },
                pause: () => {
                    console.log("暫停");
                    // 暫停後切換顯示播放按鈕
                    this.updateDomDisplayStyle(this.controlPause, this.controlPlay, 'hidden');
                },
                stop: () => {
                    console.log("停止");
                    this.updateDomDisplayStyle(this.controlPause, this.controlPlay, 'hidden');
                },
                next: () => {
                    console.log("下一首");
                    // 下一首等於重新播放, 切換顯示暫停按鈕
                    this.updateDomDisplayStyle(this.controlPlay, this.controlPause, 'hidden');
                }
            }
        });
    }

    domEventInit() {
        this.controlRepeat.addEventListener('click', () => {
            console.log("單曲循環");
            // 開啟單曲循環
            this.amplitude.setRepeatSong();
            this.updateDomActiveStyle(this.controlRepeat, 'icon-active', 'icon-active');
            // 開啟單曲循環後, 先停止隨機播放 & 消除 icon 激活
            this.amplitude.setShuffle(false);
            this.controlShuffle.classList.remove('icon-active');
        }, false);

        this.controlPrev.addEventListener('click', () => {
            this.amplitude.prev();
        }, false);

        this.controlPlay.addEventListener('click', () => {
            this.amplitude.play();
        }, false);

        this.controlPause.addEventListener('click', () => {
            this.amplitude.pause();
        }, false);

        this.controlNext.addEventListener('click', () => {
            this.amplitude.next();

            // 下一首到最底, 跳回第一首
            let currentSongIndex = this.amplitude.getActiveIndex();
            if (currentSongIndex === 0) {
                this.amplitude.skipTo(0, 0);
            }

            this.amplitude.play();
        }, false);

        this.controlShuffle.addEventListener('click', () => {
            console.log("隨機播放");
            // 開啟隨機播放
            this.amplitude.setShuffle(true);
            this.updateDomActiveStyle(this.controlShuffle, 'icon-active', 'icon-active');
            // 開啟隨機播放後, 停止單曲循環 & 消除 icon 激活
            this.amplitude.setRepeatSong(null);
            this.controlRepeat.classList.remove('icon-active');
        }, false);

        this.progressBar.addEventListener('input', (event) => {
            const {target} = event;
            const playedPercentage = (target.value / target.max) * 100;
            this.amplitude.setSongPlayedPercentage(playedPercentage)
            this.updateInputBarDisplay(this.progressBar, target.min, target.max, target.value);
        }, false);

        this.volumeRangeBar.addEventListener('input', (event) => {
            const {target} = event;
            this.amplitude.setVolume(event.target.value);
            this.updateInputBarDisplay(this.volumeRangeBar, target.min, target.max, target.value);
        }, false);
    }

    updateDomDisplayStyle(addStyleTarget, removeStyleTarget, styleName) {
        addStyleTarget.classList.add(styleName);
        removeStyleTarget.classList.remove(styleName);
    }

    updateDomActiveStyle(target, condition, styleName) {
        if (!target.classList.contains(condition)) {
            target.classList.add(styleName);
        } else {
            target.classList.remove(styleName);
        }
    }

    updateDomTextContent(target, value) {
        target.textContent = value;
    }

    updateDomImgDisplay(target, value) {
        target.classList.remove('hidden');
        target.setAttribute('src', value);
    }

    updateInputBarDisplay(target, min, max, value) {
        target.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%'
    }

    updateProgressBarTime(playedTime, totalTime) {
        this.progressPlayedSeconds.textContent = new Date(playedTime * 1000).toISOString().substr(14, 5);
        this.progressSongSeconds.textContent = new Date(totalTime * 1000).toISOString().substr(14, 5);
    }

    updatePlayList(playList) {
        this.playList.length = 0;
        this.playList.push(...playList);
    }

    playSong() {
        let clickPlaySongAlbumInfo = Array.prototype.slice.call(arguments)[0][0];
        let currentPlaySongAlbumList = formatPlaySongAlbumList(clickPlaySongAlbumInfo);
        let currentSongInListIndex = currentPlaySongAlbumList.findIndex(getSongInPlayListIndex(clickPlaySongAlbumInfo.songInfo.itemId));

        this.amplitude.stop();
        this.amplitude.pause();
        this.updatePlayList(currentPlaySongAlbumList);
        this.playerConfig();

        this.amplitude.playSongAtIndex(currentSongInListIndex);
    }
}

customElements.define('player-bar-container', PlayerBar);

export {
    PlayerBar
}
