import React, {useEffect, useState, useCallback} from 'react'
import {View, Text, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import Loader from "../../components/Loader";
import {getDeck} from "../../utils/helper";

const DeckDetailsContainer = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [deckData, setDeckData] = useState(null);
    const {deckId = null} = route.params || {};

    const fetchData = useCallback(async () => {
        if (deckId) {
            setIsLoading(true);
            const data = await getDeck({deckId});
            setDeckData(data);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData()
    }, []);

    if (!deckId || !deckData) {
        return <Loader message="Data not found for this deck"/>
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <ScrollView style={{padding: 10}}>
            <SafeAreaView>
                <View style={{alignItems: 'center', marginTop: 50}}>
                    <Text style={{fontSize: 30}}>{deckData.title}</Text>
                    <Text style={{fontSize: 20, marginTop: 10}}>{`${deckData.questions.length} Cards`}</Text>
                    <View style={{marginTop: 50}}>
                        <TouchableOpacity onPress={() => navigation.navigate('AddNewCard', {deckId: deckId})}>
                            <View style={{margin: 10, padding: 10, width: 200, borderRadius: 5, borderWidth: 2}}>
                                <Text style={{textAlign: 'center', fontSize: 20}}>Add Card</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('StartQuiz', {deckId: deckId})}>
                            <View style={{
                                backgroundColor: '#000000',
                                margin: 10,
                                padding: 10,
                                width: 200,
                                borderRadius: 5,
                                borderWidth: 2
                            }}>
                                <Text style={{color: '#FFFFFF', textAlign: 'center', fontSize: 20}}>Start Quiz</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
};

export default DeckDetailsContainer