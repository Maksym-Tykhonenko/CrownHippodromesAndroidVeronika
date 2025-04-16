import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Share, ScrollView, Animated, ImageBackground } from "react-native"
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker,PROVIDER_GOOGLE } from "react-native-maps";
import BurgerMenu from "./BurgerMenu";
import Icons from "./Icons";

const { height, width } = Dimensions.get('window');

const Saved = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const translateX = useSharedValue(-width);
    const [savedFacts, setSavedFacts] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const [mapVisible, setMapVisible] = useState(false);
    const [selectedMap, setSelectedMap] = useState(null);

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
            const savedFacts = await AsyncStorage.getItem('savedFacts');

            if (savedFacts) {
                setSavedFacts(JSON.parse(savedFacts));
            }

            if (savedItems) {
                setSavedItems(JSON.parse(savedItems));
            }
        };
    
        loadData();
    }, []);

    const handleShare = async (fact) => {
        try {
            await Share.share({
                message: fact,
            });
        } catch (error) {
            console.error('Error sharing the fact', error);
        }
    };

    const handleSave = async (fact) => {
        const newSavedFacts = [...savedFacts];
        const factIndex = newSavedFacts.indexOf(fact);

        if (factIndex !== -1) {
            newSavedFacts.splice(factIndex, 1);
        } else {
            newSavedFacts.push(fact);
        }

        setSavedFacts(newSavedFacts);
        await AsyncStorage.setItem('savedFacts', JSON.stringify(newSavedFacts));
    };

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

                    <View style={{width: '100%', paddingHorizontal: 34}}>
                        <ScrollView style={{width: '100%'}}>
                            <Text style={styles.title}>Saved Facts:</Text>
                            {
                                savedFacts.length > 0 ? (
                                    <>
                                        {
                                            savedFacts.map((fact, index) => (
                                                <View key={index} style={styles.factContainer}>
                                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 14}}>
                                                        <View style={{width: 20, height: 20, marginRight: 15}}>
                                                            <Icons type={'tick'} />
                                                        </View>
                                                        <Text style={[styles.title, {marginBottom: 0}]}>Ascot Racecourse</Text>
                                                    </View>
                                                    <Text style={styles.fact}>{fact}</Text>
                                                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                        <TouchableOpacity style={[styles.factBtn, savedFacts.includes(fact) && {backgroundColor: '#313131'}]} onPress={() => handleSave(fact)}>
                                                            <View style={{width: 20, height: 20}}>
                                                                <Icons type={'save'} saved={savedFacts.includes(fact)} />
                                                            </View>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.factBtn} onPress={() => handleShare(fact)}>
                                                            <View style={{width: 20, height: 20}}>
                                                                <Icons type={'share'} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>    
                                            ))
                                        }
                                    </>
                                ) : (
                                    <Text style={[styles.fact, {textAlign: 'center'}]}>You haven't saved anything yet</Text>
                                )
                            }
                            <Text style={[styles.title, {marginTop: 30}]}>Saved Hippodromes:</Text>
                            {
                                savedItems.length > 0 ? (
                                    <>
                                        {
                                            savedItems.map((item, index) => (
                                                    <View key={index} style={styles.card}>
                                                        <Image source={item.image} style={styles.cardImg} />
                                                        <View style={{width: '100%', padding: 21, backgroundColor: '#171717'}}>
                                                            <Text style={styles.cardName}>{item.name}</Text>
                                                            <Text style={styles.fact}>{item.description}</Text>
                                                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                                <TouchableOpacity style={[styles.factBtn, {width: 180, padding: 8}]} onPress={() => toggleMap(item)}>
                                                                    <Text style={styles.cardBtnText}>{mapVisible && item === selectedMap ? 'Close' : 'Open'}</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity 
                                                                    style={[styles.cardBtn, savedItems.includes(item) && {backgroundColor: '#313131'}]} 
                                                                    onPress={() => handleSaveResult(item)}
                                                                    >
                                                                    <Icons type={'save'} saved={savedItems.includes(item)} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity style={styles.cardBtn} onPress={() => handleShareItem(item)}>
                                                                    <Icons type={'share'} />
                                                                </TouchableOpacity>
                                                            </View>
                                                    </View>
                                                        {/** */ }
                                                           { mapVisible && item === selectedMap && (
                                                    <MapView
                                                        provider={PROVIDER_GOOGLE}
                                                                    style={{ width: '100%', height: 188, borderTopColor: '#dabc67', borderTopWidth: 1 }}
                                                                    initialRegion={{
                                                                        latitude: item.coordinates.lat,
                                                                        longitude: item.coordinates.lon,
                                                                        latitudeDelta: 0.5,
                                                                        longitudeDelta: 0.5,
                                                                    }}
                                                                >
                                                                    <Marker
                                                                        coordinate={{
                                                                            latitude: item.coordinates.lat,
                                                                            longitude: item.coordinates.lon,
                                                                        }}
                                                                        title={item.name}
                                                                    />
                                                                </MapView>
                                                            )}
                                                       
                                                </View>        
                                            ))
                                        }
                                    </>
                                ) : (
                                    <Text style={[styles.fact, {textAlign: 'center'}]}>You haven't saved anything yet</Text>
                                )
                            }
                            <View style={{height: 350}} />
                        </ScrollView>
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
        justifyContent: 'space-between',
        marginBottom: 34,
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
        marginBottom: 20
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

export default Saved;