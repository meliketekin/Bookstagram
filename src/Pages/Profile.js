import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import I18n from '../utils/Languages//lang';
import Image from 'react-native-image-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import Flag from 'react-native-flags';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');

function Profile(props) {
  const dispatch = useDispatch();
  const data = [
    {id: 0, lang: 'tr', country: 'Turkish'},
    {id: 1, lang: 'us', country: 'English'},
    {id: 2, lang: 'de', country: 'Deutschland'},
    {id: 3, lang: 'fr', country: 'French'},
  ];
  const authuser = useSelector(store => store.user);

  const [user,setUser] = React.useState(authuser);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState(I18n.locale);

  React.useEffect(() => {
      setUser(authuser)
  },[authuser])

  const signOut = () => {
    auth()
      .signOut()
  };

  const Localize = () => {
    return (
      <Modal
        deviceHeight={height}
        deviceWidth={width}
        swipeThreshold={10}
        onBackButtonPress={() => setModalVisible(false)}
        useNativeDriver={true}
        propagateSwipe={true}
        animationIn={'slideInUp'}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={'down'}
        style={{justifyContent: 'flex-end'}}
        isVisible={isModalVisible}>
        <View
          style={{
            width: width,
            marginLeft: -20,
            marginBottom: -20,
            backgroundColor: 'white',
            borderRadius: 20,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            padding: 30,

            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,

            shadowRadius: 4,
          }}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{marginVertical: -20, marginBottom: 0}}>
            <Icon name="drag-horizontal-variant" size={35} color="grey" />
          </TouchableOpacity>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch({
                        type: 'SET_LANGUAGE',
                        payload: {lang: selectedLang},
                      });

                      setSelectedLang(item);
                      setModalVisible(false);
                    }}
                    style={styles.menuRow}>
                    <Flag code={item.lang.toUpperCase()} size={32} />
                    <Text style={styles.text}>{item.country}</Text>
                  </TouchableOpacity>
                  <Svg
                    style={{backgroundColor: '#B3B3B3'}}
                    height="1"
                    width={width}></Svg>
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </Modal>
    );
  };
  const CustomLinearGradient = props => {
    return (
      <LinearGradient gradientUnits="objectBoundingBox" {...props}>
        <Stop offset={0} stopColor="#FF6EA1" />
        <Stop offset={1} stopColor="#FF91B8" />
      </LinearGradient>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {isModalVisible && <Localize />}

      <View style={styles.svgCurve}>
        <View
          style={{
            flex: 1,
            height: 180,
          }}>
          <Svg
            id="wave"
            style={{transform: [{rotate: '90deg'}]}}
            viewBox="0 0 1440 480"
            version="1.1"
            style={{
              position: 'absolute',
              top: -25,
              transform: [{rotate: '180deg'}],
            }}
            xmlns="http://www.w3.org/2000/svg">
            <Defs>
              <CustomLinearGradient
                id="sw-gradient-0"
                x1="50"
                x2="10"
                y1="25"
                y2="25"
              />
            </Defs>
            <Path
              style={{transform: [{rotate: '90deg'}], opacity: 1}}
              fill="url(#sw-gradient-0)"
              d="M0,336L80,304C160,272,320,208,480,176C640,144,800,144,960,176C1120,208,1280,272,1440,288C1600,304,1760,272,1920,272C2080,272,2240,304,2400,288C2560,272,2720,208,2880,224C3040,240,3200,336,3360,352C3520,368,3680,304,3840,304C4000,304,4160,368,4320,384C4480,400,4640,368,4800,360C4960,352,5120,368,5280,368C5440,368,5600,352,5760,312C5920,272,6080,208,6240,192C6400,176,6560,208,6720,224C6880,240,7040,240,7200,216C7360,192,7520,144,7680,144C7840,144,8000,192,8160,224C8320,256,8480,272,8640,280C8800,288,8960,288,9120,264C9280,240,9440,192,9600,200C9760,208,9920,272,10080,248C10240,224,10400,112,10560,96C10720,80,10880,160,11040,168C11200,176,11360,112,11440,80L11520,48L11520,480L11440,480C11360,480,11200,480,11040,480C10880,480,10720,480,10560,480C10400,480,10240,480,10080,480C9920,480,9760,480,9600,480C9440,480,9280,480,9120,480C8960,480,8800,480,8640,480C8480,480,8320,480,8160,480C8000,480,7840,480,7680,480C7520,480,7360,480,7200,480C7040,480,6880,480,6720,480C6560,480,6400,480,6240,480C6080,480,5920,480,5760,480C5600,480,5440,480,5280,480C5120,480,4960,480,4800,480C4640,480,4480,480,4320,480C4160,480,4000,480,3840,480C3680,480,3520,480,3360,480C3200,480,3040,480,2880,480C2720,480,2560,480,2400,480C2240,480,2080,480,1920,480C1760,480,1600,480,1440,480C1280,480,1120,480,960,480C800,480,640,480,480,480C320,480,160,480,80,480L0,480Z"></Path>
            <Defs>
              <CustomLinearGradient
                id="sw-gradient-1"
                x1="25"
                x2="41"
                y1="10"
                y2="10"
              />
            </Defs>
            <Path
              style={{opacity: 0.9}}
              fill="url(#sw-gradient-1)"
              d="M0,384L80,376C160,368,320,352,480,304C640,256,800,176,960,192C1120,208,1280,320,1440,304C1600,288,1760,144,1920,128C2080,112,2240,224,2400,240C2560,256,2720,176,2880,176C3040,176,3200,256,3360,248C3520,240,3680,144,3840,128C4000,112,4160,176,4320,192C4480,208,4640,176,4800,192C4960,208,5120,272,5280,304C5440,336,5600,336,5760,288C5920,240,6080,144,6240,152C6400,160,6560,272,6720,304C6880,336,7040,288,7200,224C7360,160,7520,80,7680,104C7840,128,8000,256,8160,280C8320,304,8480,224,8640,224C8800,224,8960,304,9120,312C9280,320,9440,256,9600,256C9760,256,9920,320,10080,304C10240,288,10400,192,10560,176C10720,160,10880,224,11040,280C11200,336,11360,384,11440,408L11520,432L11520,480L11440,480C11360,480,11200,480,11040,480C10880,480,10720,480,10560,480C10400,480,10240,480,10080,480C9920,480,9760,480,9600,480C9440,480,9280,480,9120,480C8960,480,8800,480,8640,480C8480,480,8320,480,8160,480C8000,480,7840,480,7680,480C7520,480,7360,480,7200,480C7040,480,6880,480,6720,480C6560,480,6400,480,6240,480C6080,480,5920,480,5760,480C5600,480,5440,480,5280,480C5120,480,4960,480,4800,480C4640,480,4480,480,4320,480C4160,480,4000,480,3840,480C3680,480,3520,480,3360,480C3200,480,3040,480,2880,480C2720,480,2560,480,2400,480C2240,480,2080,480,1920,480C1760,480,1600,480,1440,480C1280,480,1120,480,960,480C800,480,640,480,480,480C320,480,160,480,80,480L0,480Z"></Path>
          </Svg>
          <View style={{flexDirection: 'row', margin: 10, marginBottom: 0}}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color="white"
                style={{marginLeft: 5, marginRight: 5, marginTop: 5}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 7,
              }}>
              {I18n.t('Hello', {locale: selectedLang.lang})}{' '}
              {user ? user.name + ' ' + user.lastName : 'user cant found'}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.profileStatusContainer}>
              <Text style={styles.profileStatusNumber}>
                {user ? user.books.length : '1000'}
              </Text>
              <Text style={styles.profileStatusText}>
                {I18n.t('Books', {locale: selectedLang.lang})}
              </Text>
            </View>

            <TouchableOpacity style={styles.profileStatusContainer}>
              <Text style={styles.profileStatusNumber}>
                {user ? user.fallowers.length : '1000'}
              </Text>
              <Text style={styles.profileStatusText}>
                {I18n.t('Followers', {locale: selectedLang.lang})}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileStatusContainer}>
              <Text style={styles.profileStatusNumber}>
                {user ? user.fallowing.length : '1001'}
              </Text>
              <Text style={styles.profileStatusText}>
                {I18n.t('Following', {locale: selectedLang.lang})}
              </Text>
            </TouchableOpacity>
            <Image
              style={{
                height: 90,
                width: 90,
                resizeMode: 'contain',
                borderRadius: 50,
                overflow: 'hidden',
                elavation: 5,
                marginTop: 0,
                marginLeft: 57,
              }}
              source={{
                uri: user
                  ? user.imageUrl
                  : 'https://scontent.ftzx1-1.fna.fbcdn.net/v/t1.30497-1/c59.0.200.200a/p200x200/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_ohc=CxmGyQqlfmQAX-g1lo4&_nc_ht=scontent.ftzx1-1.fna&edm=AHgPADgEAAAA&oh=4403c3ccd0fc5eed2b87a0f3cfbe5198&oe=616AB239',
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          width: '85%',
          height: '30%',
          alignSelf: 'center',
          marginTop: 180,
          shadowColor: '#CBCBCB',
          borderRadius: 2,
          elevation: 80,
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('EditProfile', {user: user})}
          style={{
            width: width * 0.85,
            height: 30,
            marginBottom: 25,
            backgroundColor: '#FF6EA1',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 12,
            }}>
            {I18n.t('EditProfile', {locale: selectedLang.lang})}
          </Text>
        </TouchableOpacity>
        <Text style={{color: '#C4C4C4', fontWeight: 'bold', padding: 5}}>
          {I18n.t('Account', {locale: selectedLang.lang})}
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Store')}
            style={styles.menuRow}>
            <Ionicons name="cart" size={25} color="#FF6EA1" />
            <Text style={styles.text}>
              {I18n.t('MyCart', {locale: selectedLang.lang})}
            </Text>
          </TouchableOpacity>
          <Svg height="2" width={width}></Svg>
          <TouchableOpacity style={styles.menuRow}>
            <Ionicons name="card" size={25} color="#FF6EA1" />
            <Text style={styles.text}>
              {I18n.t('Purchases', {locale: selectedLang.lang})}
            </Text>
          </TouchableOpacity>
          <Svg height="2" width={width}></Svg>
          <TouchableOpacity style={styles.menuRow}>
            <Ionicons name="person" size={25} color="#FF6EA1" />
            <Text style={styles.text}>
              {I18n.t('Account', {locale: selectedLang.lang})}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '85%',
          height: '30%',
          alignSelf: 'center',
          shadowColor: '#CBCBCB',
          borderRadius: 2,
          marginTop: 35,

          elevation: 80,
        }}>
        <Text style={{color: '#C4C4C4', fontWeight: 'bold', padding: 5}}>
          {I18n.t('Settings', {locale: selectedLang.lang})}
        </Text>
        <View>
          <TouchableOpacity style={styles.menuRow}>
            <Ionicons name="ellipse" size={25} color="black" />
            <Text style={styles.text}>
              {I18n.t('Theme', {locale: selectedLang.lang})}
            </Text>
          </TouchableOpacity>
          <Svg height="2" width={width}></Svg>
          <TouchableOpacity style={styles.menuRow}>
            <Ionicons name="notifications" size={25} color="#FF6EA1" />
            <Text style={styles.text}>
              {I18n.t('Notifications', {locale: selectedLang.lang})}
            </Text>
          </TouchableOpacity>
          <Svg height="2" width={width}></Svg>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.menuRow}>
            <Ionicons name="earth" size={25} color="#FF6EA1" />
            <Text style={styles.text}>
              {I18n.t('Languages', {locale: selectedLang.lang})}
            </Text>
          </TouchableOpacity>
          <Svg height="2" width={width}></Svg>

          <TouchableOpacity onPress={() => signOut()} style={styles.menuRow}>
            <Ionicons name="exit" size={25} color="#FF6EA1" />
            <Text style={styles.text}>
              {I18n.t('SignOut', {locale: selectedLang.lang})}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: '#FBFAFA'},
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 25,
  },
  menuRow: {flexDirection: 'row', backgroundColor: 'white', padding: 10},
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  profileStatusNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#818182',
    textAlign: 'center',
  },
  profileStatusContainer: {
    margin: 20,
    marginTop: 60,
    marginRight: 0,
    marginLeft: 40,
  },
  profileStatusText: {
    fontSize: 8,
    color: '#8E8E8F',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default Profile;
