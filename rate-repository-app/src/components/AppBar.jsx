import { Text, View, StyleSheet, Pressable, Alert, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import theme from '../theme';

const styles = StyleSheet.create({
    flexContainer: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 10,
        backgroundColor: '#24292e',
        color: 'grey',
        flexDirection: 'row',
        display: 'flex'
    }, appBarText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
        font: theme.fonts
    }, flexItemA: {
        flexGrow: 1,
        paddingRight: 15
    }, flexItemB: {
        flexGrow: 1,
        paddingRight: 15
    }
});

const AppBar = () => {
    return (
        // <Pressable onPress={() => Alert.alert('You pressed the text!')}>
        <Pressable>
            <View style={styles.flexContainer}>
                <ScrollView horizontal>
                    <View style={styles.flexItemA}>
                        <Link to="/">
                            <Text style={styles.appBarText}>Repositories</Text>
                        </Link>
                    </View>
                    <View style={styles.flexItemB}>
                        <Link to="/signin">
                            <Text style={styles.appBarText}>Sign-in</Text>
                        </Link>
                    </View>
                </ScrollView>
            </View>
        </Pressable>
        );
};

export default AppBar;