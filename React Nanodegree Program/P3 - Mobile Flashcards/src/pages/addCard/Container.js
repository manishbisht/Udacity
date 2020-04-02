import React , { useState} from 'react'
import {SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import Loader from "../../components/Loader";
import {addCardToDeck} from "../../utils/helper";

const AddCardContainer = ({route, setAppData, navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState("");
    const {deckId = null} = route.params || {};

    const createCard = async () => {
        setIsLoading(true);
        if (question && answer) {
            const data = await addCardToDeck({
                deckId,
                card: {
                    question,
                    answer
                }
            });
            setAppData(data);
            navigation.navigate('DeckDetails', { deckId })
        } else {
            setError("Question and Answer is required");
            setIsLoading(false);
        }
    };

    if (!deckId) {
        return <Loader/>
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <ScrollView style={{padding: 10}}>
            <SafeAreaView>
                <View style={{margin: 10, marginTop: 50, alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 50}}>What are the card details ?</Text>
                    <TextInput
                        style={{marginTop: 50, padding: 6, borderColor: '#000000', borderBottomWidth: 1, width: '100%'}}
                        value={question}
                        placeholder="Enter Question"
                        onChangeText={text => setQuestion(text)}/>
                    <TextInput
                        style={{marginTop: 50, padding: 6, borderColor: '#000000', borderBottomWidth: 1, width: '100%'}}
                        value={answer}
                        placeholder="Enter Answer"
                        onChangeText={text => setAnswer(text)}/>
                    <View style={{marginTop: 15, minHeight: 30}}>
                        <Text style={{color: '#FF0000'}}>{error}</Text>
                    </View>
                    <TouchableOpacity onPress={createCard}>
                        <View style={{
                            backgroundColor: '#000000',
                            margin: 10,
                            marginTop: 10,
                            padding: 10,
                            width: 200,
                            borderRadius: 5,
                            borderWidth: 2,
                        }}>
                            <Text style={{color: '#FFFFFF', textAlign: 'center', fontSize: 20}}>Create Card</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
};

export default AddCardContainer