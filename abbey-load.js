/*
 * abbeyload.js
 * A music asset loader by Stuart Memo 
 */

(function (window, undefined) {
    var filesLoaded = 0,
        numberOfFiles = 0,
        context = new webkitAudioContext(),
        buffers = [];

    var AbbeyLoad = function (files, callback) {
        this.files = files || {}; 
        filesLoaded = 0;
        numberOfFiles = 0;
        loadFiles(this.files, callback);
    };

    var loadFile = function (fileKey, file, returnObj, callback) {
        var request = new XMLHttpRequest();

        request.open('GET', file[fileKey], true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            filesLoaded++;
            context.decodeAudioData(request.response, function (decodedBuffer) {
                returnObj[fileKey] = decodedBuffer;

                if (filesLoaded === numberOfFiles) {
                    callback(returnObj);
                }
            });
        };

        request.send();
    };

    var loadFiles = function (files, callback) {
        var returnObj = {};

        files.forEach(function (file, index) {
            for (var key in file) {
                if (file.hasOwnProperty(key)) {
                    numberOfFiles++;
                    loadFile(key, file, returnObj, callback);
                }
            }

        });
    };

    window.AbbeyLoad = AbbeyLoad;
})(window);
