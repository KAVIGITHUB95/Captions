import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View, Image, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";

type ContactProps = NativeStackNavigationProp<RootStack, "AvatarScreen">;


export default function ContactScreen() {

    const navigation = useNavigation<ContactProps>();


    
    const [countryCode, setCountryCode] = useState<CountryCode>("LK");
    
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);
    return (
    
    <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100 }>
            <View className="p-5 items-center">
                
                
                
                <View>
                    
                    <Image source={require("../../assets/logo.png")} className="h-40 w-36"/>
                </View>
                <View>
                    
                    <Text className="text-slate-600 font-bold">
                        
                        We use your contacts to help aaaaaaaayou find friends who are already on the app. Your contacts stay private.
                    </Text>
                </View>

                
                <View className="mt-5 w-full">

                    <Pressable className="bg-red-100 w-full justify-center items-center h-16">
                        
                        <Text className="font-bold text-lg">Select Country</Text>
                        <AntDesign name="caret-down" size={24} color="black" style={{ marginTop: 5 }} />
                    </Pressable>
                    <CountryPicker countryCode={countryCode} withFilter withFlag withCountryNameButton withCallingCode visible={show} onClose={() => { setShow(false); }} onSelect={(c) => { setCountryCode(c.cca2); setCountry(c); setShow(false); }} />
                
                </View>
                
                <View className="mt-2 bg-red-100 flex flex-row justify-center">
                    <TextInput inputMode="tel" className="h-16 font-bold text-lg border-y-4 border-y-green-600 w-[18%]" placeholder="+94" value={country ? `+${country.callingCode}` : ``}/>
                    <TextInput inputMode="tel" className="h-16 font-bold text-lg border-y-4 border-y-green-600 w-[80%] ml-2" placeholder="77 #### ###" />
                
                </View>
                <View className="mt-16 w-full">

                    <Pressable className="justify-center items-center bg-green-600 w-full h-14 rounded-full" onPress={() => {
                        navigation.navigate("AvatarScreen");
                    }}>
                        <Text className="text-xl font-bold text-slate-50">Next</Text>
                    
                    </Pressable>
                
                </View>
            </View>
        </KeyboardAvoidingView>
    
    
    </SafeAreaView>);
}