/* eslint-disable react-native/no-inline-styles */
import { Image, ImageBackground, Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Images, { ImageSource } from '../../assets/images/images';

export const SplashScreen = () => {
  const imageSource: ImageSource = Images.welcome;
  const bgImage = {
    uri: 'https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg',
  };

  return (
    <ImageBackground
      source={bgImage}
      style={styles.bgStyle}
      resizeMode="cover"
      imageStyle={{ opacity: 0.5 }} // Optional: Adjust the opacity of the
    >
      <View style={styles.container}>
        <Text style={styles.textStyle}>Welcome to eCart</Text>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      </View>
    </ImageBackground>
  );
};
