import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navione from './navigators/Navione.js';
import Navimain from './navigators/Navimain.js';

export default function App() {
  return (
    <NavigationContainer>
        <Navimain></Navimain>
    </NavigationContainer>
  );
}