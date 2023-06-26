import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem'
import { useRepository, useReviews } from '../hooks/useRepositories';
import theme from '../theme';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  item: {
    backgroundColor: 'white',
    font: theme.fonts,
    paddingRight: 60,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5,
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
  flexItemA: {
    flexGrow: 0.5,
    font: theme.fonts,
    margin: 10,
    marginTop: 5,

},
flexItemB: {
    flexGrow: 1,
    font: theme.fonts
},
rating: {
  color: theme.colors.primary,
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes.subheading,
  borderColor: theme.colors.primary,
  borderWidth: 1,
  borderRadius: 20,
  width: 40,
  height: 40,
  textAlign: 'center',
  textAlignVertical: 'center',

}
});

const ReviewItem = ({ review }) => {
  // Return a single review item
  return (
    <View>
      <View style={styles.item}>
        <View style={styles.flexContainerHorizontal}>
          <View style={styles.flexItemA}>
            <Text style={styles.rating}>{review.rating}</Text>
          </View>
          <View style={styles.flexItemB}>
            <View style={styles.flexContainerVertical}>
              <Text style={{fontWeight: theme.fontWeights.bold, marginBottom:0 }}>{review.user.username}</Text>
              <Text style={{color: theme.colors.textSecondary, marginBottom:4}}>{review.createdAt}</Text>
              <Text>{review.text}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
};

export const SingleRepository = ({ repository, reviews }) => {
  const ItemSeparator = () => <View style={styles.separator} />;

  const repositoryNodes = []
  if (repository) {
    repositoryNodes.push(repository)
  }

  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];


  const Header = () => {
    return (
      <FlatList
      style={{marginBottom: 10}}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item} github={true} />}
    // keyExtractor={item => item.id}
    />
    )
  }

  return (
    <View style={{ marginBottom: 50, marginTop: 0}} >
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id
      }
      ListHeaderComponent={() => <Header/>}
      />

    </View>
  );
};

const SingleRepositoryList = ({ id }) => {
  const { repository } = useRepository(id);
  const { reviews } = useReviews(id)
  console.log("Reviews from SingleRepository", reviews)
  return <SingleRepository repository={repository} reviews={reviews} />;
};


export default SingleRepositoryList;