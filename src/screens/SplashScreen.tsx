import { Image, StatusBar, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStack } from "../../App";

import "../../global.css";
import { useTheme } from "../theme/ThemeProvider";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;


export default function SplashScreen() {

    const navigation = useNavigation<Props>();

    const opacity = useSharedValue(0);

    useEffect(() => {

        opacity.value = withTiming(1, { duration: 3000 });
        const timer = setTimeout(() => {

            navigation.replace("SignUpScreen");

        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [navigation, opacity]);

    const animatedStyle = useAnimatedStyle(() => {

        return { opacity: opacity.value };
    });
    const {applied} = useTheme();
    
    const logo = applied === "dark" ? require("../../assets/logo-dark.png") : require("../../assets/logo.png");

    return (

    <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
            <StatusBar hidden={true} />
            <Animated.View style={animatedStyle}>

                <Image source={logo} style={{ height: 180, width: 220 }} />
            </Animated.View>


            <Animated.View className="absolute bottom-10" style={animatedStyle}>

                <View className="justify-center items-center">
                    <Text className="text-slate-600 font-bold text-xs">
                        POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
                    </Text>
                    <Text className="text-slate-600 font-bold text-xs">
                        VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
                    </Text>
                </View>
            </Animated.View>

        </SafeAreaView>
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