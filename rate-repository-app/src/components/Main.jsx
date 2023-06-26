import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepositoryList from './SingleRepository';
import SignIn from './SignIn';
import AppBar from './AppBar';
import { Route, Routes, useMatch } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});


const Main = () => {
  
  const match = useMatch('/repo/:id')
  const id = match ? match.params.id : null

  return (
    <View style={styles.container}>
      <AppBar></AppBar>
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repo/:id" element={<SingleRepositoryList id={id} />} />
      </Routes>
    </View>
  );
};

export default Main;