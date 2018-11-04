import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { View, Text, Keyboard, Animated, Platform, StyleSheet  } from 'react-native';
import styles from './styles';

const ANIMATION_DURATION = 250;


class Logo extends Component {
  static propTypes = {
    tintColor: PropTypes.string,
  };

  constructor(props) {
    super(props)

    this.state = {
      containerImageWidth: new Animated.Value(styles.$largeContainerSize),
      imageWidth: new Animated.Value(styles.$largeImageSize),
    };
  }

  componentDidMount() {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did'
    this.KeyboardShowListener = Keyboard.addListener(`keyboard${name}Show`, this.keyboardShow)
    this.KeyboardHideListener = Keyboard.addListener(`keyboard${name}Hide`, this.keyboardHide)
  }

  componentWillUnmount() {
    this.KeyboardHideListener.remove()
    this.KeyboardShowListener.remove()
  }

  keyboardShow = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start();
  }

  keyboardHide = () => {
    Animated.parallel([
      Animated.timing(this.state.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION
      }),
      Animated.timing(this.state.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION
      })
    ]).start();
  }

  render() {
    const containerImageStyle = [
      styles.containerImage,
      {width: this.state.containerImageWidth, height: this.state.containerImageWidth}
    ]
    const imageStyle = [
      styles.logo,
      {width: this.state.imageWidth},
      {tintColor: this.props.tintColor},
    ]

    return (
      <View style={styles.container}>
        <Animated.View style={containerImageStyle}>
          <Animated.Image
            resizeMode="contain"
            style={[StyleSheet.absoluteFill, containerImageStyle]}
            source={require('./images/background.png')}
          />
            <Animated.Image 
              resizeMode="contain"
              style={imageStyle} 
              source={require('./images/logo.png')}
            />
        </Animated.View>
        <Text style={styles.text}> Currency Converter </Text>
      </View>
    );
  }
} 


export default Logo;