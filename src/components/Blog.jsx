import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Share, ScrollView, Animated, ImageBackground } from "react-native"
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import BurgerMenu from "./BurgerMenu";
import blog from "../constants/blog";
import Icons from "./Icons";

const { height, width } = Dimensions.get('window');

const Blog = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const translateX = useSharedValue(-width);
    const [read, setRead] = useState(null);

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

    const handleShare = async (item) => {
        try {
            const shareOptions = {
                title: item.post, 
                message: `${item.post}\n\n${item.description}\n\n${item.points.join('\n')}\n\nConclusion: ${item.conclusion}`,
            };
            await Share.share(shareOptions);
        } catch (error) {
            console.error('Error sharing the fact', error);
        }
    };    

    const toggleRead = (item) => {
        if(read === item) {
            setRead(null)
        } else {
            setRead(item)
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
                        <Text style={styles.title}>Interesting Facts:</Text>
                        <ScrollView style={{width: '100%'}}>
                            {
                                blog.map((item, index) => (
                                    <View key={index} style={styles.postContainer}>
                                        <Text style={styles.title}>{item.post}</Text>
                                        {
                                            read === item && (
                                                <>
                                                    <Text style={styles.desc}>{item.description}</Text>
                                                    {
                                                        item.points.map((point, index) => (
                                                            <Text key={index} style={styles.desc}>{point}</Text>
                                                        ))
                                                    }
                                                    <Text style={styles.desc}>{item.conclusion}</Text>
                                                </>
                                            )
                                        }
                                        <View  style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <TouchableOpacity style={styles.postBtn} onPress={() => toggleRead(item)}>
                                                <Text style={styles.btnText}>{read === item ? 'Close' : 'Read'}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.postBtn} onPress={() => handleShare(item)}>
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
        fontWeight: '500',
        fontSize: 18,
        color: '#fff',
        lineHeight: 22,
        marginBottom: 20
    },

    btnText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#000',
    },

    postContainer: {
        width: '100%',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#dabc67',   
        padding: 21,
        marginBottom: 20
    },

    desc: {
        fontWeight: '400',
        fontSize: 14,
        color: '#fff',
        lineHeight: 20,
        marginBottom: 10
    },

    postBtn: {
        width: '48%',
        height: 39,
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dabc67'
    },

})

export default Blog;