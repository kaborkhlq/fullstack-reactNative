import { Text, View, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-native";
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries'
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useContext } from 'react';

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

    const apolloClient = useApolloClient();
    const authStorage = useContext(AuthStorageContext);

    const logout = () => {
        try {
            authStorage.removeAccessToken()
            apolloClient.resetStore();
        } catch (e) {
            console.log(e)
        }
    }


    const User = (props) => {
        if (props.user===undefined || props.user.me===null) {
            return (
                <View style={styles.flexItemB}>
                    <Link to="/signin">
                        <Text style={styles.appBarText}>Sign in</Text>
                    </Link>
                </View>
            )   
        }
        return (
            <View style={styles.flexItemB}>
                <Pressable onPress={logout}>
                    <Text style={{...styles.appBarText, color: theme.colors.error}}>Sign out</Text>
                </Pressable>
            </View>
        )
    }
    const token = authStorage.getAccessToken()
    const { loading, error, data } = useQuery(ME, { Headers: { Authentication: token } });
    // const { loading, error, data } = useQuery(ME, { Headers: { Authentication: 'Bearer eeeeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYmU0Mjk4NC0wNTFiLTRhMDEtYjQ1ZC1iOGQyOWMzMjIwMGMiLCJpYXQiOjE2ODc2OTQ1MDEsImV4cCI6MjI5MjQ5NDUwMSwic3ViIjoiYWNjZXNzVG9rZW4ifQ.dM4D-Fpn4ZSCEGnW6t3fYW656FZ4plt16vh9VS-MQIM' } });
    const response = loading ? undefined : data

    return (
        <Pressable>
            <View style={styles.flexContainer}>
                <ScrollView horizontal>
                    <View style={styles.flexItemA}>
                        <Link to="/">
                            <Text style={styles.appBarText}>Repositories</Text>
                        </Link>
                    </View>
                    <View>
                        <User user={response} />
                    </View>
                </ScrollView>
            </View>
        </Pressable>
    );
};

export default AppBar;