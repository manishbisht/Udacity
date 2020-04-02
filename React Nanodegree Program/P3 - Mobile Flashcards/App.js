import React, {useEffect, useCallback, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {getDecks} from "./src/utils/helper";
import HomeContainer from "./src/pages/home/Container";
import Loader from "./src/components/Loader";
import DeckDetailsContainer from "./src/pages/deckDetails/Container";
import AddDeckContainer from "./src/pages/addDeck/Container";
import AddCardContainer from "./src/pages/addCard/Container";
import PlayContainer from "./src/pages/play/Container";
import {setLocalNotification} from "./src/utils/notifications";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [appData, setAppData] = useState(null);

    const setUpApp = useCallback(async () => {
        setIsLoading(true);
        await setLocalNotification();
        const data = await getDecks();
        setAppData(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setUpApp()
    }, []);

    if (isLoading) {
        return <Loader/>
    }

    const HomeContainerComponent = props => <HomeContainer appData={appData} {...props} />;
    const AddDeckContainerComponent = props => <AddDeckContainer setAppData={setAppData} {...props} />;
    const DeckDetailsContainerComponent = props => <DeckDetailsContainer {...props} />;
    const AddNewCardContainerComponent = props => <AddCardContainer setAppData={setAppData} {...props} />;
    const PlayContainerComponent = props => <PlayContainer {...props} />;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" options={{ title: 'Mobile Flashcards' }} component={HomeContainerComponent}/>
                <Stack.Screen name="AddNewDeck" options={{ title: 'Add New Deck' }} component={AddDeckContainerComponent}/>
                <Stack.Screen name="DeckDetails" options={{ title: 'Deck Details' }} component={DeckDetailsContainerComponent}/>
                <Stack.Screen name="AddNewCard" options={{ title: 'Add New Card' }} component={AddNewCardContainerComponent}/>
                <Stack.Screen name="StartQuiz" options={{ title: 'Play Game' }} component={PlayContainerComponent}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;