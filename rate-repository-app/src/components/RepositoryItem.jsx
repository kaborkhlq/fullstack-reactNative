import { View, StyleSheet, Image, Pressable, Alert } from 'react-native';
import Text from './Text'
import theme from '../theme';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10,
        paddingRight: 60,
        paddingTop: 6,
        font: theme.fonts
    },
    flexContainerHorizontal: {
        flexDirection: 'row',
        display: 'flex',
        font: theme.fonts
    },
    flexContainerVertical: {
        flexDirection: 'column',
        display: 'flex',
        padding: 3,
        font: theme.fonts
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        marginTop: 8
    },
    flexItemA: {
        flexGrow: 0.2,
        textAlign: 'left',
        font: theme.fonts
    },
    flexItemB: {
        flexGrow: 0.2,
        font: theme.fonts
    },
    Button: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 3,
        margin: 6,
        borderRadius: 5,
        paddingLeft: 10,
        height: 35,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: theme.fontSizes.subheading,
        font: theme.fonts
    },
});


const transferToUrl = (url) => {
    Linking.openURL(url);
}


const RepositoryItem = ({ repo, github }) => {
    const toThousands = x => {
        if (x < 1000) {
            return x
        }
        x = Math.round(x / 1000)
        return x + 'k'
    }

    const GithubButton = () => {
        if (github) {
            return (
                <View>
                    <Pressable onPress={() => transferToUrl(repo.url)}>
                        <Text style={styles.Button}>
                            Open in Github
                        </Text>
                    </Pressable>
                </View>
            )
        }
    }

    return (
        <View testID="repositoryItem" style={styles.item}>
            <View style={{ ...styles.flexContainerHorizontal, marginBottom: 10 }}>
                <Image
                    style={styles.image}
                    source={{ uri: repo.ownerAvatarUrl }}
                />
                <View style={styles.flexContainerVertical}>
                    <Text fontWeight="bold" fontSize="subheading">{repo.fullName}</Text>
                    <Text color="textSecondary" style={{}}>{repo.description}</Text>
                    <View style={styles.flexContainerHorizontal}>
                        <Text style={{ backgroundColor: theme.colors.secondary, color: 'white', padding: 3, flex: 0, borderRadius: 5, font: theme.fonts, marginTop: 2 }}>{repo.language}</Text>
                    </View>
                </View>
            </View>
            <View style={{ ...styles.flexContainerHorizontal, justifyContent: 'space-evenly' }}>
                <Text fontWeight="bold" style={styles.flexItemA}>{toThousands(repo.stargazersCount)}</Text>
                <Text fontWeight="bold" style={styles.flexItemA}>{toThousands(repo.forksCount)}</Text>
                <Text fontWeight="bold" style={styles.flexItemA}>{repo.reviewCount}</Text>
                <Text fontWeight="bold" style={styles.flexItemA}>{repo.ratingAverage}</Text>
            </View>
            <View style={{ ...styles.flexContainerHorizontal, justifyContent: 'space-evenly' }}>
                <Text style={styles.flexItemA}>Stars</Text>
                <Text style={styles.flexItemA}>Forks</Text>
                <Text style={styles.flexItemA}>Reviews</Text>
                <Text style={styles.flexItemA}>Rating</Text>
            </View>
            <View>
                <GithubButton />
            </View>
        </View>



    );
}

export default RepositoryItem;  