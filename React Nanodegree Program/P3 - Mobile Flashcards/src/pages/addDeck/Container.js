import React, {useState} from 'react'
import {SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity} from "react-native";
import {saveDeckTitle} from "../../utils/helper";
import Loader from "../../components/Loader";

const AddDeckContainer = ({setAppData, navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [deckName, setDeckName] = useState('');
    const [error, setError] = useState("");

    const createDeck = async () => {
        setIsLoading(true);
        if (deckName) {
            const data = await saveDeckTitle({
                title: deckName,
            });
            setAppData(data);
            navigation.navigate("Home");
        } else {
            setError("Deck name is required");
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loader/>
    }

    return (
        <ScrollView style={{padding: 10}}>
            <SafeAreaView>
                <View style={{margin: 10, marginTop: 50, alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 50}}>What is the title of your new deck ?</Text>
                    <TextInput
                        style={{marginTop: 50, padding: 6, borderColor: '#000000', borderBottomWidth: 1, width: '100%'}}
                        value={deckName}
                        placeholder="Enter Deck Name"
                        onChangeText={text => setDeckName(text)}/>
                    <View style={{marginTop: 15, minHeight: 30}}>
                        <Text style={{color: '#FF0000'}}>{error}</Text>
                    </View>
                    <TouchableOpacity onPress={createDeck}>
                        <View style={{
                            backgroundColor: '#000000',
                            margin: 10,
                            marginTop: 10,
                            padding: 10,
                            width: 200,
                            borderRadius: 5,
                            borderWidth: 2,
                        }}>
                            <Text style={{color: '#FFFFFF', textAlign: 'center', fontSize: 20}}>Create Deck</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
};

export default AddDeckContainer;