{/** */}
import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Share, Animated, ImageBackground } from "react-native"
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker,PROVIDER_GOOGLE } from "react-native-maps";
import seasons from "../constants/seasons";
import BurgerMenu from "./BurgerMenu";
import Icons from "./Icons";

const { height, width } = Dimensions.get('window');

const Map = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const translateX = useSharedValue(-width);
    const [savedItems, setSavedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    useEffect(() => {
        translateX.value = withSpring(isMenuOpen ? 0 : -width);
    }, [isMenuOpen]);

    const animatedMenuStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    useEffect(() => {
        const loadData = async () => {
            const savedItems = await AsyncStorage.getItem('savedHippodrome');
            if (savedItems) {
                setSavedItems(JSON.parse(savedItems));
            }
        };
    
        loadData();
    }, []);

    const handleShareItem = async (item) => {
        try {
            const shareOptions = {
                title: item.name, 
                message: `${item.name}\n\n${item.description}`,
            };
            await Share.share(shareOptions);
        } catch (error) {
            console.error("Error sharing the event:", error.message);
        }
    };

    const handleSaveResult = async (item) => {
        const newSavedItems = [...savedItems];
        const itemIndex = newSavedItems.indexOf(item);

        if (itemIndex !== -1) {
            newSavedItems.splice(itemIndex, 1);
        } else {
            newSavedItems.push(item);
        }

        setSavedItems(newSavedItems);
        await AsyncStorage.setItem('savedHippodrome', JSON.stringify(newSavedItems));
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
                <View style={styles.container}>

                    {isMenuOpen && (
                        <Animated.View style={[styles.menuContainer, animatedMenuStyle]}>
                            <BurgerMenu onClose={toggleMenu} />
                        </Animated.View>
                    )}

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.upperBtn} onPress={toggleMenu}>
                            <Icons type={'menu'} />
                        </TouchableOpacity>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                        <TouchableOpacity style={styles.upperBtn} onPress={() => navigation.navigate('SurpriseScreen')}>
                            <Icons type={'surprise'} />
                        </TouchableOpacity>
                    </View>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: 52.2371,
                            longitude: -0.3725,
                            latitudeDelta: 3,
                            longitudeDelta: 3,
                        }}
                    >
                        {seasons.map(season =>
                            season.items.map(item => (
                                <Marker
                                    key={item.name}
                                    coordinate={{
                                        latitude: item.coordinates.lat,
                                        longitude: item.coordinates.lon,
                                    }}
                                    onPress={() => setSelectedItem(item)}
                                />
                            ))
                        )}
                    </MapView>

                    {selectedItem && (
                        <View style={[styles.card, {bottom: height > 700 ? height * 0.15 : height * 0.07}]}>
                            <Image source={selectedItem.image} style={styles.cardImg} />
                            <View style={{width: '100%', padding: 21, backgroundColor: '#171717'}}>
                                <Text style={styles.cardName}>{selectedItem.name}</Text>
                                <Text style={styles.fact}>{selectedItem.description}</Text>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <TouchableOpacity style={[styles.factBtn, {width: 180, padding: 8}]} onPress={() => setSelectedItem(null)}>
                                        <Text style={styles.cardBtnText}>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.cardBtn, savedItems.includes(selectedItem) && {backgroundColor: '#313131'}]} 
                                        onPress={() => handleSaveResult(selectedItem)}
                                        >
                                        <Icons type={'save'} saved={savedItems.includes(selectedItem)} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cardBtn} onPress={() => handleShareItem(selectedItem)}>
                                        <Icons type={'share'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                </View>
            </ImageBackground>
        </GestureHandlerRootView>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
    },

    menuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        zIndex: 10,
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

    map: {
        width: '100%',
        flexGrow: 1,
    },

    card: {
        width: 325,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#dabc67',
        marginBottom: 20,
        overflow: 'hidden',
        position: 'absolute',
        alignSelf: 'center',
    },

    cardImg: {
        width: '100%',
        height: 188,
        resizeMode: 'cover',
    },

    cardName: {
        fontWeight: '400',
        fontSize: 16,
        color: '#fff',
        lineHeight: 22,
        marginBottom: 10
    },

    cardBtn: {
        width: 36,
        height: 36,
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#dabc67'
    },

    cardBtnText: {
        fontWeight: '700',
        fontSize: 14,
        color: '#000',
        lineHeight: 22,
    },

    fact: {
        fontWeight: '400',
        fontSize: 14,
        color: '#fff',
        lineHeight: 20,
        marginBottom: 10
    },

    factBtn: {
        width: '48%',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dabc67'
    },

})

export default Map;