import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Text, Dimensions, StyleSheet, Image } from "react-native"
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icons from "./Icons"

const { width, height } = Dimensions.get('window');

const BurgerMenu = ({ onClose }) => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('SeasonalScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen);
        onClose();
    };    

    useFocusEffect(
        useCallback(() => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        }, [navigation])
    ); 

    return (
        <View style={styles.container}>

            <View style={styles.row}>
                <TouchableOpacity style={[styles.upperBtn, {backgroundColor: '#dabc67'}]} onPress={onClose}>
                    <Icons type={'close'} />
                </TouchableOpacity>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <TouchableOpacity style={styles.upperBtn} onPress={() => handleNavigate('SurpriseScreen')}>
                    <Icons type={'surprise'} />
                </TouchableOpacity>
            </View>

            <View style={{width: '100%', padding: 34}}>

                <Text style={styles.title}>Menu:</Text>

                <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('SeasonalScreen')}>
                    <Text style={[styles.btnText, activeButton === 'SeasonalScreen' && {color: '#dabc67'}]}>Seasonal Hippodrome Finder</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('AllScreen')}>
                    <Text style={[styles.btnText, activeButton === 'AllScreen' && {color: '#dabc67'}]}>All Hippodromes of Britain</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('FactsScreen')}>
                    <Text style={[styles.btnText, activeButton === 'FactsScreen' && {color: '#dabc67'}]}>Interesting Facts</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('MapScreen')}>
                    <Text style={[styles.btnText, activeButton === 'MapScreen' && {color: '#dabc67'}]}>Hippodromes Map</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('BlogScreen')}>
                    <Text style={[styles.btnText, activeButton === 'BlogScreen' && {color: '#dabc67'}]}>Blog</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => handleNavigate('SavedScreen')}>
                    <Text style={[styles.btnText, activeButton === 'SavedScreen' && {color: '#dabc67'}]}>Saved</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: width,
        height: height,
        backgroundColor: '#171717',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: height * 0.07,
        paddingHorizontal: 34,
        paddingBottom: 20,
        backgroundColor: '#171717',
        borderBottomColor: '#dabc67',
        borderBottomWidth: 1
    },

    upperBtn: {
        width: 48,
        height: 48,
        backgroundColor: '#000',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#dabc67',
        padding: 14
    },

    logo: {
        width: 86,
        height: 86,
        resizeMode: 'contain'
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        color: '#fff',
        marginBottom: 17
    },

    btn: {
        marginBottom: 13,
    },

    btnText: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 22,
        color: '#fff'
    },

});

export default BurgerMenu;