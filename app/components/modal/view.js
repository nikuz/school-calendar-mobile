// @flow

import React from 'react';
import {
    View,
    TouchableOpacity,
    BackHandler,
    Animated,
    Easing,
    Image,
} from 'react-native';
import { deviceUtils } from '../../utils';
import styles from './styles';

import closeIcon from '../../../assets/images/close-dark.png';

const ANIMATION_DURATION = 400;
const CONTENT_MARGIN_TOP = 25;

type Overlay = {
    id: number,
    content: React.Children,
    direction: string,
    showCloseIcon: boolean,
    contentTransparentBg: boolean,
    shouldOpen: boolean,
    callback?: () => void,
    animOpacity: number,
    animPosition: number,
};

type Props = {
    closeCallback?: () => void,
    close: () => void,
};

type State = {
    overlays: Overlay[],
    contentHeight: number,
};

class Modal extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        const height = this.getHeight();

        this.state = {
            overlays: [],
            contentHeight: height - (CONTENT_MARGIN_TOP * 2),
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.closeHandler);
    }

    componentWillReceiveProps(nextProps) {
        const curOverlaysCount = this.state.overlays.length;
        const nextOverlaysCount = nextProps.overlays.length;
        if (nextOverlaysCount > curOverlaysCount) {
            const overlays = this.state.overlays.slice(0);
            const newOverlay = nextProps.overlays[nextOverlaysCount - 1];
            overlays.push({
                id: overlays.length,
                content: newOverlay.content,
                direction: newOverlay.direction,
                showCloseIcon: newOverlay.showCloseIcon,
                contentTransparentBg: newOverlay.contentTransparentBg,
                shouldOpen: true,
                callback: newOverlay.callback || function() {},
                animOpacity: new Animated.Value(0),
                animPosition: new Animated.Value(-this.getHeight()),
            });
            this.setState({ overlays });
        } else if (nextOverlaysCount < curOverlaysCount) {
            let overlays = this.state.overlays.slice(0);
            const handler = (overlay) => ({
                ...overlay,
                shouldClose: true,
            });
            let overlay;
            if (nextOverlaysCount === 0) {
                overlays = overlays.map(handler);
                overlay = overlays[0];
            } else {
                overlay = handler(overlays[overlays.length - 1]);
                overlays[overlays.length - 1] = overlay;
            }
            if (nextProps.closeCallback) {
                overlay.callback = nextProps.closeCallback;
            }
            this.setState({ overlays });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.overlays !== nextState.overlays
            || this.state.contentHeight !== nextState.contentHeight;
    }

    componentDidUpdate() {
        this.checks();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.closeHandler);
    }

    getHeight() {
        return deviceUtils.dimensions().height;
    }

    open = (overlay) => {
        Animated.parallel([
            Animated.timing(overlay.animOpacity, {
                toValue: 1,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(overlay.animPosition, {
                toValue: CONTENT_MARGIN_TOP,
                duration: ANIMATION_DURATION,
                easing: Easing.elastic(0.9),
            }),
        ]).start(() => {
            const overlayState = this.state.overlays.find(item => item.id === overlay.id);
            overlayState.isOpen = true;
        });
    };

    close = (overlay) => {
        Animated.parallel([
            Animated.timing(overlay.animOpacity, {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }),
            Animated.timing(overlay.animPosition, {
                toValue: -this.getHeight(),
                duration: ANIMATION_DURATION,
            }),
        ]).start(() => {
            const callback = overlay.callback;
            const overlays = this.state.overlays.slice(0);
            overlays.splice(overlays.findIndex(item => item.id === overlay.id), 1);
            this.setState({ overlays });
            callback();
        });
        return true;
    };

    closeHandler = () => {
        this.props.close();
        return true;
    };

    checks = () => {
        const overlays = this.state.overlays.slice(0).reverse();
        overlays.forEach(overlay => {
            if (overlay.shouldOpen && !overlay.isOpen) {
                this.open(overlay);
            } else if (overlay.shouldClose && overlay.isOpen) {
                if (overlay.id === overlays.length - 1) {
                    this.close(overlay);
                } else {
                    setTimeout(() => {
                        this.close(overlay);
                    }, 100);
                }
            }
        });
    };

    containerOnLayout = () => {
        this.setState({
            contentHeight: this.getHeight() - (CONTENT_MARGIN_TOP * 2),
        });
    };

    render() {
        const state = this.state;

        if (state.overlays.length) {
            return (
                <View style={ styles.container } onLayout={ this.containerOnLayout }>
                    { state.overlays.map(overlay => {
                        const contentAdditionalStyles = {
                            maxHeight: state.contentHeight,
                        };
                        if (overlay.direction === 'top') {
                            contentAdditionalStyles.top = overlay.animPosition;
                        } else {
                            contentAdditionalStyles.bottom = overlay.animPosition;
                        }
                        if (overlay.contentTransparentBg) {
                            contentAdditionalStyles.backgroundColor = 'transparent';
                        }
                        return (
                            <View style={ styles.itemWrap } key={ overlay.id }>
                                <Animated.View style={ [styles.touch_area, { opacity: overlay.animOpacity }] }>
                                    <TouchableOpacity
                                        style={ styles.touch_area }
                                        onPress={ this.closeHandler }
                                        activeOpacity={ 1 }
                                    />
                                </Animated.View>
                                <Animated.ScrollView
                                    style={ [
                                        styles.content,
                                        contentAdditionalStyles,
                                    ] }
                                >
                                    { overlay.content }
                                    { overlay.showCloseIcon && (
                                        <TouchableOpacity
                                            style={ styles.close }
                                            onPress={ this.closeHandler }
                                        >
                                            <Image
                                                style={ styles.close_icon }
                                                source={ closeIcon }
                                            />
                                        </TouchableOpacity>
                                    ) }
                                </Animated.ScrollView>
                            </View>
                        );
                    }) }
                </View>
            );
        }

        return null;
    }
}

export default Modal;
