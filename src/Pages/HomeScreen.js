import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
  Alert,
  View,
  Dimensions,
} from 'react-native';
import PostCard from '../components/Post';
import Image from 'react-native-image-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const {width} = Dimensions.get('window');

function HomeScreen(props) {
  const [posts, setPosts] = React.useState([]);
  const [deleted, setDeleted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getPosts();
  }, [props]);

  React.useEffect(async () => {
    getPosts();
    setDeleted(false);
  }, [deleted]);

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post Deleted !',
          'Your Post Has Been Deleted Successfully',
        );
        setDeleted(true);
      })
      .catch(err => {
        console.log('ERROR1:', err);
      });
  };

  const deletePost = postId => {
    console.log('Current Post Id:', postId);
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('data:', documentSnapshot.data());
          const {postImg} = documentSnapshot.data();
          if (postImg != null) {
            console.log('postimg null değil linki bu :', postImg);
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);
            console.log('imageRef:', imageRef);
            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted`);
                deleteFirestoreData(postId);
                setDeleted(true);
              })
              .catch(err => {
                console.log('Error while  deleting the image... ', err);
              });
          } else {
            console.log('else girmiş');
            deleteFirestoreData(postId);
          }
        }

        console.log('post deleted!');
      })
      .catch(err => {
        console.log('ERROR2:', err);
      });
  };

  const handleDelete = postId => {
    Alert.alert('Delete Post', 'Are You Sure ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Confirm', onPress: () => deletePost(postId)},
    ]);
  };
  const toProfile = userId => {
    if (auth().currentUser.uid === userId) {
      props.navigation.navigate('Profile');
    } else {
      props.navigation.navigate('OtherProfile', {selectedUserId: userId});
    }
  };

  const getPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {likes, comments, post, postImg, postTime, userId} =
              doc.data();
            list.push({
              id: doc.id,
              userId,

              postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
          setPosts(list);

          if (loading) {
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error.msg);
    }
  };

  const renderItem = ({item}) => {
    return (
      <PostCard
        toProfile={userId => toProfile(userId)}
        onDelete={handleDelete}
        item={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 5,
              }}>
              <View
                style={{
                  height: 60,
                  width: 60,

                  borderRadius: 50,
                }}
              />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 15, borderRadius: 4}}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderRadius: 4,
                width: 300,
                height: 20,
              }}
            />
            <View
              style={{
                marginTop: 6,
                width: 250,
                height: 20,
                borderRadius: 4,
              }}
            />
            <View
              style={{
                marginTop: 6,
                width: 350,
                height: 200,
                marginTop: 10,
                borderRadius: 4,
              }}
            />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 5,
              }}>
              <View
                style={{
                  height: 60,
                  width: 60,

                  borderRadius: 50,
                }}
              />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 15, borderRadius: 4}}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderRadius: 4,
                width: 300,
                height: 20,
              }}
            />
            <View
              style={{
                marginTop: 6,
                width: 250,
                height: 20,
                borderRadius: 4,
              }}
            />
            <View
              style={{
                marginTop: 6,
                width: 350,
                height: 200,
                marginTop: 10,
                borderRadius: 4,
              }}
            />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 5,
              }}>
              <View
                style={{
                  height: 60,
                  width: 60,

                  borderRadius: 50,
                }}
              />
              <View style={{marginLeft: 20}}>
                <View
                  style={{
                    width: 120,
                    height: 20,
                    borderRadius: 4,
                    marginTop: 20,
                  }}
                />
                <View
                  style={{marginTop: 6, width: 80, height: 15, borderRadius: 4}}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderRadius: 4,
                width: 300,
                height: 20,
              }}
            />
            <View
              style={{
                marginTop: 6,
                width: 250,
                height: 20,
                borderRadius: 4,
              }}
            />
            <View
              style={{
                marginTop: 6,
                width: 350,
                height: 200,
                marginTop: 10,
                borderRadius: 4,
              }}
            />
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {flex: 1},

  lottieContainer: {
    flex: 2,
    width: '85%',
    height: '30%',
    alignSelf: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {flex: 1, margin: 10},
  button: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    width: 290,
    height: 38,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    paddingLeft: 12,
    borderRadius: 10,

    width: 290,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
