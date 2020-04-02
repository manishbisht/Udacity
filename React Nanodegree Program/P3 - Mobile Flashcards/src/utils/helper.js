import {AsyncStorage} from 'react-native';

const initialData = {
    'loxhs1bqm25b708cmbf3g': {
        id: 'loxhs1bqm25b708cmbf3g',
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    'vthrdm985a262al8qx3do': {
        id: 'vthrdm985a262al8qx3do',
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const saveDeckTitle = async ({title}) => {
    try {
        if (title) {
            const newDeck = {
                id: generateUID(),
                title,
                questions: []
            };
            let allDecks = await getDecks();
            allDecks = {
                ...allDecks,
                [newDeck.id]: newDeck,
            };
            await AsyncStorage.setItem('data', JSON.stringify(allDecks));
            return allDecks
        } else {
            console.log("Title should not be blank")
        }
    } catch (error) {
        console.log(error)
    }
};

export const setupInitialData = async () => {
    try {
        await AsyncStorage.setItem('data', JSON.stringify(initialData));
        return initialData;
    } catch (error) {
        console.log(error)
    }
};

export const getDecks = async () => {
    try {
        const data = await AsyncStorage.getItem('data');
        if (data) {
            return JSON.parse(data)
        } else {
            const addedData = await setupInitialData();
            return addedData
        }
    } catch (error) {
        console.log(error)
    }
};

export const getDeck = async ({deckId}) => {
    try {
        const data = await getDecks();
        if (deckId && data[deckId]) {
            return data[deckId]
        } else {
            console.log("Data not found for given id")
        }
    } catch (error) {
        console.log(error)
    }
};

export const addCardToDeck = async ({deckId, card}) => {
    try {
        if (deckId && card && card.question && card.answer) {
            let allDecks = await getDecks();
            if (allDecks[deckId] && allDecks[deckId].questions) {
                allDecks[deckId].questions.push(card);
                await AsyncStorage.setItem('data', JSON.stringify(allDecks));
                return allDecks
            } else {
                console.log("Deck Id is invalid")
            }
        } else {
            console.log("Deck Id and Card Details should not be blank")
        }
    } catch (error) {
        console.log(error)
    }
};