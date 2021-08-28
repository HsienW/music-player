/** Chain of Responsibility Pattern **/

import {filteredEmptyImage, filteredEmptySong} from './format';

const FormatChecker = function (currentJudgeHandler) {
    this.currentCheckHandler = currentJudgeHandler;
    this.nextCheckHandler = null;
}

FormatChecker.prototype.setNextCheckHandler = function (nextHandler) {
    this.nextCheckHandler = nextHandler;
    return nextHandler;
}

FormatChecker.prototype.passCheck = function (...args) {
    // ...args 把傳進來的所有參數變成一個陣列, 之後都交由 currentCheckerHandler 也就是當前的職責方法執行
    const result = this.currentCheckHandler(...args);

    // 若 result 回傳的結果是 next 的話, 去判斷有沒有指定 nextJudgeHandler
    // 有的話就執行, 沒有的話直接回傳 result
    if (result === 'next') {
        return this.nextCheckHandler && this.nextCheckHandler.passCheck(...args);
    }
    return result;
}

// 檢查播放音樂是否有缺少重要 info
const filteredSongEmptyFormatChecker = function (songData) {
    const checkEmptyImageRule = new FormatChecker(filteredEmptyImage);
    const checkEmptySongRule = new FormatChecker(filteredEmptySong);

    checkEmptyImageRule.setNextCheckHandler(checkEmptySongRule);

    return checkEmptyImageRule.passCheck(songData);
};

export {
    filteredSongEmptyFormatChecker,
}
