import {
    Dimensions,
    PixelRatio,
    Platform,
    StatusBar,
} from 'react-native';

const ration = PixelRatio.get();

// ----------------
// public methods
// ----------------

function isTablet() {
    const dimensions = Dimensions.get('window');
    const w = dimensions.width;
    const h = dimensions.height;
    let checkBy = w;

    if (w > h) {
        checkBy = h;
    }
    return checkBy > 750;
}

function isIos() {
    return Platform.OS === 'ios';
}

function isAndroid() {
    return Platform.OS === 'android';
}

function size(value) {
    const result = Number(value);
    return isTablet() ? result * 1.1 : result;
}

function fontSize(value) {
    const result = Number(value);
    return isTablet() ? result * 1.15 : result;
}

function pixelRatio() {
    return ration;
}

function dimensions() {
    return Dimensions.get('window');
}

function staticDimensions() {
    let size = Dimensions.get('window');
    const w = size.width;
    const h = size.height;

    if (w > h) {
        size = {
            ...size,
            width: h,
            height: w,
        };
    }

    return size;
}

function statusBarHeight() {
    return StatusBar.currentHeight;
}

function platformVersion() {
    return Platform.Version;
}

// ---------
// interface
// ---------

export {
    isTablet,
    isIos,
    isAndroid,
    size,
    fontSize,
    pixelRatio,
    dimensions,
    staticDimensions,
    statusBarHeight,
    platformVersion,
};
