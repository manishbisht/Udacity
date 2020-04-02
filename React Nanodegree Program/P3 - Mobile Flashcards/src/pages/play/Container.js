import React, {useEffect, useState, useCallback} from 'react'
import {View, Text, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import Loader from "../../components/Loader";
import {getDeck} from "../../utils/helper";
import {clearLocalNotification, setLocalNotification} from "../../utils/notifications";

const PlayContainer = ({navigation, route}) => {
    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [deckData, setDeckData] = useState(null);
    const {deckId = null} = route.params || {};
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

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

    const markCorrectAnswer = async () => {
        setCorrectAnswers(correctAnswers + 1);
        setCurrentQuestionId(currentQuestionId + 1);
        setShowAnswer(false);

        if (correctAnswers === deckData.questions.length) {
            await clearLocalNotification();
            await setLocalNotification();
        }
    };

    const markIncorrectAnswer = () => {
        setCurrentQuestionId(currentQuestionId + 1);
        setShowAnswer(false);
    };

    const renderQuestion = () => {
        return (
            <View>
                <Text style={{marginTop: 10, marginRight: 10, fontSize: 20, textAlign: 'right'}}>{`${currentQuestionId + 1} / ${deckData.questions.length}`}</Text>
                <View style={{alignItems: 'center'}}>
                    <Text style={{marginTop: 40, fontSize: 25}}>{deckData.questions[currentQuestionId].question}</Text>
                    <TouchableOpacity onPress={() => setShowAnswer(!showAnswer)}>
                        <View style={{margin: 20, padding: 10, width: 200, borderRadius: 5, borderWidth: 1}}>
                            <Text style={{textAlign: 'center', fontSize: 15}}>{showAnswer ? 'Hide ': 'Show '}Answer</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{margin: 20, fontSize: 25, minHeight: 100}}>{showAnswer && deckData.questions[currentQuestionId].answer}</Text>
                    <View>
                        <TouchableOpacity onPress={markCorrectAnswer}>
                            <View style={{backgroundColor: '#00C853',
                                borderColor: '#00C853',
                                margin: 10,
                                padding: 10,
                                width: 200,
                                borderRadius: 5,
                                borderWidth: 2}}>
                                <Text style={{textAlign: 'center', fontSize: 20}}>Correct</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={markIncorrectAnswer}>
                            <View style={{
                                backgroundColor: '#FF0000',
                                borderColor: '#FF0000',
                                margin: 10,
                                padding: 10,
                                width: 200,
                                borderRadius: 5,
                                borderWidth: 2
                            }}>
                                <Text style={{color: '#FFFFFF', textAlign: 'center', fontSize: 20}}>Incorrect</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    const restartGame = () => {
        setCurrentQuestionId(0);
        setShowAnswer(false);
        setCorrectAnswers(0);
    };

    const renderResultsPage = () => {
        return (
            <View style={{alignItems: 'center', marginTop: 50}}>
                <Text style={{fontSize: 25, textAlign: 'center'}}>{`You have answered ${correctAnswers} questions correctly !!`}</Text>
                <Text style={{marginTop: 20, fontSize: 40, textAlign: 'center'}}>{`${((correctAnswers / deckData.questions.length) * 100).toFixed(2)} %`}</Text>
                <View style={{marginTop: 20}}>
                    <TouchableOpacity onPress={restartGame}>
                        <View style={{margin: 10, padding: 10, width: 200, borderRadius: 5, borderWidth: 2}}>
                            <Text style={{textAlign: 'center', fontSize: 20}}>Restart Quiz</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('DeckDetails', {
                        deckId,
                    })}>
                        <View style={{margin: 10, padding: 10, width: 200, borderRadius: 5, borderWidth: 2}}>
                            <Text style={{textAlign: 'center', fontSize: 20}}>Back to Deck Details</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={{
                            backgroundColor: '#000000',
                            margin: 10,
                            padding: 10,
                            width: 200,
                            borderRadius: 5,
                            borderWidth: 2
                        }}>
                            <Text style={{color: '#FFFFFF', textAlign: 'center', fontSize: 20}}>Back to Deck List</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    if (!deckId || !deckData) {
        return <Loader message="Data not found for this deck"/>
    }

    if (isLoading) {
        return <Loader/>
    }

    if (!deckData.questions.length) {
        return <Loader message="No Cards Found !! Add few cards and then play the game"/>
    }

    return (
        <ScrollView style={{padding: 10}}>
            <SafeAreaView>
                {currentQuestionId < deckData.questions.length ? renderQuestion() : renderResultsPage()}
            </SafeAreaView>
        </ScrollView>
    )
};

export default PlayContainer