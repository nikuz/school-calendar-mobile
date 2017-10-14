// @flow

import React from 'react';
import {
    ScrollView,
    Keyboard,
    Animated,
} from 'react-native';
import { deviceUtils } from '../../utils';

const KEYBOARD_SHOW_DURATION = 150;

type Props = {
    onScroll?: () => void,
    additionalMarginBottom?: number,
    onLayout?: () => void,
    children: React.Children,
};

type State = {
    curScroll: number,
    prevScroll: number,
    marginBottomAnimate: number,
    targetEl: ReactComponent,
};

class KeyboardAwareScrollView extends React.Component<Props, State> {
    static defaultProps = {
        additionalMarginBottom: 0,
    };

    state = {
        curScroll: 0,
        prevScroll: 0,
        marginBottomAnimate: 0,
        targetEl: null,
    };

    listeners = [];
    componentDidMount() {
        if (deviceUtils.isAndroid()) {
            this.listeners.push(
                Keyboard.addListener('keyboardDidShow', this.keyboardWillShow),
                Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
            );
        } else {
            this.listeners.push(
                Keyboard.addListener('keyboardWillShow', this.keyboardWillShow),
                Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
            );
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const state = this.state;

        return state.curScroll === nextState.curScroll
            && state.prevScroll === nextState.prevScroll
            && state.targetEl === nextState.targetEl;
    }

    componentWillUnmount() {
        this.listeners.forEach((listener) => {
            listener.remove();
        });
    }

    keyboardWillShow = (event) => {
        const state = this.state;
        const keyboardHeight = event.endCoordinates.height;

        if (keyboardHeight > 0 && state.marginBottom !== keyboardHeight) {
            state.marginBottomAnimate.stopAnimation();
            Animated.timing(state.marginBottomAnimate, {
                toValue: keyboardHeight,
                duration: event.duration || KEYBOARD_SHOW_DURATION,
            }).start(() => {
                const curScroll = state.curScroll;
                this.setState({
                    prevScroll: curScroll,
                });
                if (!this.state.targetEl) {
                    return;
                }
                const scrollView = this.scrollEll.getScrollResponder();
                this.state.targetEl.measure((ox, oy, width, height, px, py) => {
                    const deviceHeight = deviceUtils.dimensions().height;
                    const additionalSpace = 1;
                    const statusBarHeight = 20;
                    const scrollBlockHeight = (
                        deviceHeight - keyboardHeight - statusBarHeight - additionalSpace
                    );

                    let positionTo;

                    if (py >= scrollBlockHeight || state.curScroll > py) {
                        positionTo = curScroll + (py - scrollBlockHeight) + height;
                    }
                    if (positionTo !== undefined) {
                        scrollView.scrollTo({
                            x: 0,
                            y: positionTo,
                            animated: true,
                        });
                    }
                });
            });
        }
    };

    keyboardWillHide = (event) => {
        const state = this.state;

        state.marginBottomAnimate.stopAnimation();
        Animated.timing(state.marginBottomAnimate, {
            toValue: this.props.additionalMarginBottom || 0,
            duration: (event && event.duration) || KEYBOARD_SHOW_DURATION,
        }).start(() => {
            this.setState({
                targetEl: null,
            });
            this.scrollEll.getScrollResponder().scrollTo({
                x: 0,
                y: this.state.prevScroll,
                animated: true,
            });
        });
    };

    scrollHandler = (event) => {
        const e = event.nativeEvent;
        this.setState({
            curScroll: e.contentOffset.y,
        });
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    };

    scrollToElement = (node) => {
        this.setState({
            targetEl: node,
        });
    };

    scrollToTop = () => {
        this.scrollEll.getScrollResponder().scrollTo({
            x: 0,
            y: 0,
            animated: true,
        });
    };

    render() {
        const animatedStyle = {
            flex: 1,
            marginBottom: this.state.marginBottomAnimate,
        };

        return (
            <Animated.View style={ animatedStyle }>
                <ScrollView
                    ref={ el => this.scrollEll = el }
                    showsVerticalScrollIndicator={ false }
                    showsHorizontalScrollIndicator={ false }
                    keyboardDismissMode='none'
                    onScroll={ this.scrollHandler }
                    scrollEventThrottle={ 20 }
                    onLayout={ this.props.onLayout }
                >
                    { this.props.children }
                </ScrollView>
            </Animated.View>
        );
    }
}

export default KeyboardAwareScrollView;
