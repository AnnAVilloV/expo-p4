import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Main from "../screens/Main";



const Stack = createNativeStackNavigator();

export default function Navione(){
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Main"
                component={Main}
                options={{ title: 'Main title'}}
            />
        </Stack.Navigator>
    )
}