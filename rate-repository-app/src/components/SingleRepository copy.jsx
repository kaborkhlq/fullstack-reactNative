import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem'
import { useRepository } from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

});


export const SingleRepository = ({ repository}) => {
  const ItemSeparator = () => <View style={styles.separator} />;

  const repositoryNodes=[]
  if (repository) {
    repositoryNodes.push(repository) 
  }

  return (
    <View style={{ marginBottom: 100 }} >
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repo={item} github={true} />}
        // keyExtractor={item => item.id}
      />
    </View>
  );
};

const SingleRepositoryList = ({id}) => {
  const {repository}  = useRepository(id);
  return <SingleRepository repository={repository}/>;
};


export default SingleRepositoryList;