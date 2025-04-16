import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import explain from "../constants/explain";

const { height } = Dimensions.get('window');

const Explain = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if(index === 6) {
            navigation.navigate('SeasonalScreen')
        } else {
            setIndex((prevIndex) => (prevIndex + 1) % 7);
        }
    };

    const currentItem = explain[index];

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={styles.imageContainer}>
                    <Image source={currentItem.image} style={styles.image} />
                    <LinearGradient
                        colors={['transparent', '#000']}
                        style={styles.overlay}
                    />
                </View>

                <View style={{width: '100%', paddingHorizontal: 31, flexGrow: 1}}>

                    <Text style={styles.title}>{currentItem.title}</Text>
                    <Text style={styles.text}>{currentItem.text}</Text>

                    <TouchableOpacity style={styles.btn} onPress={handleNext}>
                        <Text style={styles.btnText}>{index === 0 ? 'Get started' : index === 6 ? 'Start Exploring' : 'Next'}</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    imageContainer: {
        width: '100%',
        height: height * 0.4,
        position: 'relative',
        marginBottom: height * 0.03
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },

    title: {
        fontWeight: '600',
        fontSize: 22,
        color: '#fff',
        lineHeight: 24,
        marginBottom: height * 0.024
    },

    text: {
        fontWeight: '400',
        fontSize: 14,
        color: '#fff',
        lineHeight: 22,
    },

    btn: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#dabc67',
        position: 'absolute',
        bottom: 70,
        alignSelf: 'center'
    },

    btnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
        lineHeight: 22
    }

})

export default Explain;