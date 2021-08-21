const playerBarStyle = `
    .hidden {
        display: none;
    }
        
    .player-bar {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        outline: 1px solid #d9d9d9;
    }
        
    .detail-area {
        width: 20%;
        height: 100%;
        min-width: 300px;
        padding: 0 10px;
        display: grid;
        grid-template-columns: 64px auto;
        grid-template-rows: 20px 20px 20px 20px 20px;
        grid-template-areas:
            'image song-name'
            'image song-name'
            'image song-artist'
            'image song-artist'
            'image song-artist'
    }
        
    .detail-area>.song-image {
        grid-area: image;
        grid-row-start: 2;
        width: 64px;
        height: 64px;
    }
        
    .detail-area>.song-name {
        grid-area: song-name;
        grid-row-start: 3;
        width: calc(100% - 64px);
        font-size: 18px;
        font-weight: 700;
        padding: 0 10px;
        color: #1890ff;
    }
        
    .detail-area>.song-artist {
        grid-area: song-artist;
        grid-row-start: 4;
        width: calc(100% - 64px);
        font-size: 14px;
        padding: 0 10px;
        color: #595959;
    }
        
    .detail-area>div {
        overflow : hidden;
        text-overflow : ellipsis;
        white-space : nowrap;
    }
        
    .controls-area {
        width: 30%;
        height: 100%;
        min-width: 400px;
        padding: 0 10px;
    }
        
    .controls-area>.buttons {
        width: 100%;
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        
    .icon {
        width: 16px;
        height: 16px;
        cursor: pointer;
        padding: 0 6px;
        filter: invert(33%) sepia(3%) saturate(0%) hue-rotate(339deg) brightness(93%) contrast(79%);
    }
        
    .controls-area>.buttons>.icon:hover {
        color: #f33336;
    }
        
        // .controls-area>.buttons>.repeat {
        //     width: 16px;
        //     height: 16px;
        // }
        
    .controls-area>.buttons>.icon.play,
    .controls-area>.buttons>.icon.pause {
         width: 32px;
         height: 32px;
         filter: invert(41%) sepia(93%) saturate(2568%) hue-rotate(194deg) brightness(104%) contrast(101%);
    }
        
    .controls-area>.buttons>.icon-active {
         filter: invert(41%) sepia(93%) saturate(2568%) hue-rotate(194deg) brightness(104%) contrast(101%);
    }
        
    .progress-area {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        
    .progress-area>.progress-bar {
        cursor: pointer;
        height: 4px;
        width: 100%;
    }
        
    .progress-area>input[type="range"] {
        -webkit-appearance: none;
        background: #bfbfbf;
        border-radius: 4px;
        background-image: linear-gradient(#595959, #595959);
        background-size: 0% 100%;
        background-repeat: no-repeat;
    }
        
    .progress-area>input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 0px;
        width: 0px;
        cursor: pointer;
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12);
        transition: background 0.1s ease-in-out;
    }
        
    .progress-area>input[type=range]::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }
    
    .progress-area>input[type=range]::-moz-range-thumb {
         -webkit-appearance: none;
        height: 0px;
        width: 0px;
        cursor: pointer;
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12);
        transition: background 0.1s ease-in-out;
    }
        
    .progress-area>.progress-second {
        width: 40px;
        color: #595959;
        font-size: 12px;
        text-align: center;
        font-weight: 600;
    }
        
    .volume-area {
        width: 20%;
        height: 100%;
        min-width: 300px;
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
        
    .volume-area>.volume-range-bar {
        height: 4px;
        width: 30%;
        border: 0;
    }
        
    .volume-area>.volume-button {
            cursor: default;
    }
        
    .volume-area>input[type="range"] {
        -webkit-appearance: none;
        background: #bfbfbf;
        border-radius: 5px;
        background-image: linear-gradient(#1890ff, #1890ff);
        background-size: 50% 100%;
        background-repeat: no-repeat;
    }
        
    .volume-area>input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 14px;
        width: 14px;
        border-radius: 50%;
        background: #1890ff;
        cursor: pointer;
        box-shadow: 0 0 2px 0 #555;
        transition: background .3s ease-in-out;
    }
        
    .volume-area>input[type=range]::-webkit-slider-runnable-track  {
            -webkit-appearance: none;
            box-shadow: none;
            border: none;
            background: transparent;
        }
    }
`
export {
    playerBarStyle
}
