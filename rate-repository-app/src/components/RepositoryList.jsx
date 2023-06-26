import { FlatList, View, StyleSheet, Pressable, Alert, Link } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router-native";


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


export const RepositoryListContainer = ({ repositories }) => {
  const ItemSeparator = () => <View style={styles.separator} />;
  const navigate = useNavigate();
  
  const goToRepo = (id) => {
    const url = "/repo/"+id
    navigate(url);
  }

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
    
  return (
    <View style={{ marginBottom: 100 }} >
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(
          { item }) =>
          <Pressable onPress={() => goToRepo(item.id)}>
              <RepositoryItem repo={item} github={false}/>
          </Pressable>
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  return <RepositoryListContainer repositories={repositories} />;
};


export default RepositoryList;