import { Text, View, Button } from 'react-native';
import Test from "../screens/Test";

export default function Home({navigation}){
    return(
        <View >
            <Text>in Home</Text>
            <Button
                title="Go to Test"
                onPress={() => navigation.navigate('Test', {
                    str: 'this is a test str',
                    num: 0,
                })}
            />
        </View>

    )
}