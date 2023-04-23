import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home";
import Test from "../screens/Test";


const Stack = createNativeStackNavigator();

export default function Navione(){
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: 'Home title'}}
            />
            <Stack.Screen 
                name="Test" 
                component={Test} 
            />
        </Stack.Navigator>
    )
}