import React from 'react';
import { View, Text } from 'react-native';

const Loader = ({message = "Loading"}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{message}</Text>
        </View>
    );
};

export default Loader