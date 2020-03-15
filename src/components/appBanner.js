import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, View, Dimensions } from 'react-native';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';


const images = [
    "http://visitou.ir/images/banner.png",
    "http://visitou.ir/images/banner2.png",
    "http://visitou.ir/images/banner3.png"
];

export default class AppBanner extends React.Component {
    renderPage(image, index) {
        console.log(images,'lalalala');
        return (
            <View key={index}>
                <Image

                    style={{ width: BannerWidth, height: 2*BannerWidth/3 }} source={{ uri: image ,   cache: 'force-cache',}} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    autoplay={true}
                    autoplayTimeout={5000}
                    loop={true}
                    index={0}
                    pageSize={BannerWidth}
                    showsPageIndicator={true}
                >
                    {images.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});