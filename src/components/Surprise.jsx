import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Share, ScrollView, Animated, ImageBackground } from "react-native"
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import seasons from "../constants/seasons";
import BurgerMenu from "./BurgerMenu";
import Icons from "./Icons";

const { height, width } = Dimensions.get('window');

const Surprise = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const translateX = useSharedValue(-width);
    const [savedItems, setSavedItems] = useState([]);
    const [surprisePressed, setSurprisePressed] = useState(false);
    const [result, setResult] = useState(null);
    const [mapVisible, setMapVisible] = useState(false);
    const [selectedMap, setSelectedMap] = useState(null);
    const [visible, setVisible] = useState(false);
    const fadeAnim = new Animated.Value(1);

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
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);    

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

    const toggleMap = (item) => {
        if(mapVisible) {
            setMapVisible(false)
            setSelectedMap(null);
        } else {
            setSelectedMap(item)
            setMapVisible(true)
        }
    };

    const toggleSurprise = () => {
        if (surprisePressed) {
            setSurprisePressed(false);
            setResult(null);
            setVisible(false);
        } else {
            setSurprisePressed(true);
            setVisible(true);
    
            setTimeout(() => {
                const randomSeasonIndex = Math.floor(Math.random() * seasons.length);
                const randomSeason = seasons[randomSeasonIndex];
                const randomItemIndex = Math.floor(Math.random() * randomSeason.items.length);
                const randomItem = randomSeason.items[randomItemIndex];
                
                setResult(randomItem);
                setVisible(false);
            }, 2000);
        }
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
                    </View>

                    <View style={styles.imageContainer}>
                        <Image source={require('../assets/explain/1.png')} style={styles.image} />
                        <LinearGradient
                            colors={['transparent', '#000']}
                            style={styles.overlay}
                        />
                    </View>

                    <View style={{width: '100%', flexGrow: 1, paddingHorizontal: 34}}>
                        {visible ? (
                            <Animated.View style={{ opacity: fadeAnim, width: '100%', flexGrow: 1, alignItems: 'center' }}>
                                <Text style={[styles.fact, {marginVertical: 34}]}>please wait...</Text>
                            </Animated.View>
                            ) : (
                                <View style={[styles.resultContainer, {bottom: height > 700 ? '-80%' : height * -0.5}]}>
                                    <Text style={[
                                        styles.title, 
                                        { 
                                            fontSize: 24, 
                                            lineHeight: 26, 
                                            fontWeight: '800', 
                                            textAlign: 'center', 
                                            marginBottom: 15, 
                                            textShadowColor: 'black',
                                            textShadowOffset: { width: 1, height: 1 },
                                            textShadowRadius: 5,
                                        }
                                    ]}>
                                        {result ? 'Result:' : 'Surprise me:'}
                                    </Text>
                                    {!result && <Text style={[styles.fact, {textAlign: 'center', marginBottom: 30}]}>Tap below to get the random location</Text>}
                                    <ScrollView style={{width: '100%'}}>
                                        {result && (
                                            <View style={styles.card}>
                                                <Image source={result.image} style={styles.cardImg} />
                                                <View style={{width: '100%', padding: 21, backgroundColor: '#171717'}}>
                                                    <Text style={styles.cardName}>{result.name}</Text>
                                                    <Text style={styles.fact}>{result.description}</Text>
                                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                        <TouchableOpacity style={[styles.factBtn, {width: 180, padding: 8}]} onPress={() => toggleMap(result)}>
                                                            <Text style={styles.cardBtnText}>{mapVisible && result === selectedMap ? 'Close' : 'Open'}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity 
                                                            style={[styles.cardBtn, savedItems.includes(result) && {backgroundColor: '#313131'}]} 
                                                            onPress={() => handleSaveResult(result)}
                                                        >
                                                            <Icons type={'save'} saved={savedItems.includes(result)} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.cardBtn} onPress={() => handleShareItem(result)}>
                                                            <Icons type={'share'} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>     
                                                {/** */}
                                                {mapVisible && result === selectedMap && (
                                                    <MapView
                                                        provider={PROVIDER_GOOGLE}
                                                        style={{ width: '100%', height: 188, borderTopColor: '#dabc67', borderTopWidth: 1 }}
                                                        initialRegion={{
                                                            latitude: result.coordinates.lat,
                                                            longitude: result.coordinates.lon,
                                                            latitudeDelta: 0.5,
                                                            longitudeDelta: 0.5,
                                                        }}
                                                    >
                                                        <Marker
                                                            coordinate={{
                                                                latitude: result.coordinates.lat,
                                                                longitude: result.coordinates.lon,
                                                            }}
                                                            title={result.name}
                                                        />
                                                    </MapView>
                                                )}
                                            </View>        
                                        )}
                                        <TouchableOpacity style={[styles.factBtn, {width: '100%', padding: 15}]} onPress={toggleSurprise}>
                                            <Text style={[styles.cardBtnText, {fontSize: 16}]}>{result ? 'Search Again' : 'Surprise me'}</Text>
                                        </TouchableOpacity>
                                        <View style={{height: 350}} />
                                    </ScrollView>
                                </View>
                            )}
                    </View>

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
        padding: 14,
        marginRight: 76
    },

    logo: {
        width: 86,
        height: 86,
        resizeMode: 'contain',
        alignSelf: 'center'
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

    resultContainer: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center'
    },

    title: {
        fontWeight: '400',
        fontSize: 18,
        color: '#fff',
        lineHeight: 22,
        marginBottom: 20
    },

    btnText: {
        fontWeight: '600',
        fontSize: 17,
        color: '#fff',
        lineHeight: 22,
        zIndex: 10,
        marginBottom: 12
    },

    factContainer: {
        width: '100%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#dabc67',   
        padding: 21,
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

    card: {
        width: '100%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#dabc67',
        marginBottom: 20,
        overflow: 'hidden'
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
    }

})

export default Surprise;