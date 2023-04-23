
import { Text, View, Button } from 'react-native';


export default function Test({route, navigation}){
    const {str,num} = route.params;
    return(
        <View >
            <Text>in test!</Text>
            <Text>Passed str: {JSON.stringify(str)}</Text>
            <Text>Passed num: {JSON.stringify(num)}</Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Go to Test... again"
                onPress={() => navigation.push('Test', {
                    str: 'we go here again',
                })}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button
                title="Update param"
                onPress={() =>
                navigation.setParams({
                    num: Math.floor(Math.random() * 100),
                })
                }
            />
        </View>

    )


}