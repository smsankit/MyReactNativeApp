const Images = {
    welcome: require('./welcome.png'),
    logo: require('./logo.webp'),
} as const;

export type ImageKey = keyof typeof Images;
export type ImageSource = typeof Images[ImageKey];
export default Images;