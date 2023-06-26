import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem'
// import { useRepository, useRepositoriesThroughGraphQl  } from '../hooks/useRepositories';
import useRepositories from '../hooks/useRepositories';



const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

});


export const SingleRepository = ({ repository}) => {
  const ItemSeparator = () => <View style={styles.separator} />;



  // const repositoryNodes = repository
  //   ? repository.edges.map(edge => edge.node)
  //   : [];
  
  const repositoryNodes = []
  repositoryNodes.push(repository)

  return (
    <View style={{ marginBottom: 100 }} >
      <Text>Hello from SingleRepository</Text>
      {/* <Text>{id}</Text> */}
      <FlatList
        data={repositoryNodes}
        // data={repository}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repo={item} github={true} />}
        // keyExtractor={item => item.id}
      />
    </View>
  );
};

const SingleRepositoryList = ({id}) => {
  console.log("Id From SingleRepositoryList:", id)
  // const { repository } = useRepository({repositoryId: id});
  const { repositories } = useRepositories();
  console.log("From SingleRepositoryList:", repositories)
  return <SingleRepository repository={repositories}/>;
};


export default SingleRepositoryList;