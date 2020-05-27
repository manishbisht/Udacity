import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';

const HomeContainer = ({appData = null, navigation}) => {
    const renderCards = () => {
        return Object.keys(appData).map((deckId) => {
            return (
                <TouchableOpacity key={deckId} onPress={() => navigation.navigate('DeckDetails', {
                    deckId,
                })}>
                    <View style={{
                        margin: 10,
                        padding: 20,
                        borderWidth: 2,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 20}}>{appData[deckId].title}</Text>
                        <Text
                            style={{fontSize: 15, marginTop: 10}}>{`${appData[deckId].questions.length} Cards`}</Text>
                    </View>
                </TouchableOpacity>
            )
        })

    };

    return (
        <ScrollView style={{padding: 10}}>
            <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate('AddNewDeck')}>
                <View style={{
                    margin: 10,
                    padding: 20,
                    borderWidth: 2,
                    borderRadius: 10,
                    backgroundColor: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Add New Deck</Text>
                </View>
            </TouchableOpacity>
            {appData && renderCards()}
            </SafeAreaView>
        </ScrollView>
    );
};

export default HomeContainer