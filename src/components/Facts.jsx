import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Share, ScrollView, Animated, ImageBackground } from "react-native"
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import dailyFacts from "../constants/dailyFacts";
import BurgerMenu from "./BurgerMenu";
import Icons from "./Icons";

const { height, width } = Dimensions.get('window');

const Facts = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const translateX = useSharedValue(-width);
    const [savedFacts, setSavedFacts] = useState([]);

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
            const savedFacts = await AsyncStorage.getItem('savedFacts');

            if (savedFacts) {
                setSavedFacts(JSON.parse(savedFacts));
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
                        <Text style={styles.title}>Interesting Facts:</Text>
                        <ScrollView style={{width: '100%'}}>
                            {
                                dailyFacts.map((fact, index) => (
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
                            <View style={{height: 300}} />
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

})

export default Facts;