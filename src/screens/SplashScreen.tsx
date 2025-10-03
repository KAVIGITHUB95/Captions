import { Image, StatusBar, View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSequence, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStack } from "../../App";

import "../../global.css";
import { useTheme } from "../theme/ThemeProvider";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;


export default function SplashScreen() {

    const navigation = useNavigation<Props>();

    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.7);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 3000 });
        scale.value = withSequence(
            withSpring(1.1, { damping: 8 }),
            withSpring(1, { damping: 8 })
        );
        const timer = setTimeout(() => {
            navigation.replace("SignUpScreen");
        }, 3000);
        return () => {
            clearTimeout(timer);
        }
    }, [navigation, opacity, scale]);

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value, transform: [{ scale: scale.value }] };
    });
    const { applied } = useTheme();

    const logo = applied === "dark" ? require("../../assets/Captions.png") : require("../../assets/Captions.png");

    return (
        <LinearGradient
            colors={['#3b82f6', '#60a5fa', '#38bdf8', '#0ea5e9', '#1e3a8a']}
            locations={[0, 0.2, 0.6, 0.8, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="flex-1 items-center justify-center">
                <StatusBar hidden={true} />
                <Animated.View style={animatedStyle}>
                    <Image source={logo} style={{ height: 180, width: 220 }} />
                    <Text className="text-slate-600 font-extrabold text-lg mb-2 justify-center items-center p-2">Let the Conversation Begin!</Text>
                </Animated.View>
                <Animated.View className="absolute bottom-20 w-full" style={animatedStyle}>

                    <View className="justify-center items-center">
                        <Text className="text-slate-200 font-bold text-xs">
                            POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
                        </Text>
                        <Text className="text-slate-200 font-bold text-xs">
                            VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
                        </Text>
                    </View>
                </Animated.View>
            </SafeAreaView>
        </LinearGradient>
    );

}

const styles = StyleSheet.create({

    companyName: {
        color: "#475569",
        fontWeight: "bold",
        fontSize: 12,
    },
    appVersion: {

        color: "#475569",
        fontWeight: "bold",
        fontSize: 12,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'center',

        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }

});