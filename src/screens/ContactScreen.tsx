import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Image, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";

import { useUserRegistration } from "../components/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { validateCountryCode, validatePhoneNo } from "../../util/Validation";
import { LinearGradient } from "expo-linear-gradient";

type ContactProps = NativeStackNavigationProp<RootStack, "AvatarScreen">;

export default function ContactScreen() {
    const navigation = useNavigation<ContactProps>();
    const [countryCode, setCountryCode] = useState<CountryCode>("LK");

    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const { userData, setUserData } = useUserRegistration();

    const [callingCode, setCallingCode] = useState("+94");
    const [phoneNo, setPhoneNo] = useState("");

    return (
        <LinearGradient
            colors={['#3b82f6', '#60a5fa', '#38bdf8', '#0ea5e9', '#1e3a8a']}
            locations={[0, 0.2, 0.6, 0.8, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView className="flex-1 bg-white items-center">
                <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}>

                    <View className="p-5 items-center">
                        <View>
                            <Image source={require("../../assets/Captions.png")} className="h-40 w-36" />
                        </View>
                        <View>
                            <Text className="text-slate-600 font-bold">
                                We use your contacts to help you find friends who are already on the app. Your contacts stay private.
                            </Text>
                        </View>

                        <View className="mt-5 w-full">
                            <View className="border-b-2 border-b-green-600 justify-center items-center flex-row h-14 mb-3">
                                <CountryPicker
                                    countryCode={countryCode}
                                    withFilter
                                    withFlag
                                    withCountryNameButton
                                    withCallingCode
                                    visible={show}
                                    onClose={() => {
                                        setShow(false);
                                    }}
                                    onSelect={(c) => {
                                        setCountryCode(c.cca2);
                                        setCountry(c);
                                        setShow(false);
                                        setUserData((previous) => ({
                                            ...previous,
                                            countryCode: "+" + String(c.callingCode),
                                        }));
                                    }}
                                />
                                <AntDesign
                                    name="caret-down"
                                    size={24}
                                    color="black"
                                    style={{ marginTop: 5 }}
                                />

                            </View>
                        </View>

                        <View className="mt-2 bg-red-100 flex flex-row justify-center">
                            <TextInput
                                inputMode="tel"
                                className="h-16 font-bold text-lg border-y-4 border-y-green-600 w-[18%]"
                                placeholder="+94"
                                value={country ? `+${country.callingCode}` : callingCode}
                                onChangeText={(text) => {
                                    setCallingCode(text);
                                }}
                            />
                            <TextInput
                                inputMode="tel"
                                className="h-16 font-bold text-lg border-y-4 border-y-green-600 w-[80%] ml-2"
                                placeholder="77 #### ###"
                                onChangeText={(text) => {
                                    setPhoneNo(text);
                                }}
                            />
                        </View>
                        <View className="mt-16 w-full">
                            <Pressable className="justify-center items-center bg-green-600 w-full h-14 rounded-full"
                                onPress={() => {
                                    const validCountryCode = validateCountryCode(callingCode);
                                    const validPhoneNo = validatePhoneNo(phoneNo);

                                    if (validCountryCode) {
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: "Warning",
                                            textBody: validCountryCode,
                                        });
                                    } else if (validPhoneNo) {
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: "Warning",
                                            textBody: validPhoneNo,
                                        });
                                    } else {
                                        setUserData((previous) => ({ ...previous, countryCode: country ? `+${country.callingCode}` : callingCode, contactNo: phoneNo, }));
                                        navigation.navigate("AvatarScreen");
                                    }
                                }}>
                                <Text className="text-xl font-bold text-slate-50">Next</Text>
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </LinearGradient>
    );
}