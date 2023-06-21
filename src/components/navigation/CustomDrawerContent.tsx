import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '../../infrastructure/Redux/Hooks';
import tw from 'twrnc';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RouteNames} from './RouteNames';
import {setCurrentTab} from '../../infrastructure/Redux/Slices/UserSlice';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../resources/constants/Colors';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {t} = useTranslation();
  const {isInBookTab, user} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <View style={tw`flex-row  justify-between mr-4 mt-5`}>
        <TouchableOpacity
          style={tw`pb-4`}
          onPress={() =>
            props.navigation.navigate(RouteNames.profileStack, {
              screen: RouteNames.profileMain,
            })
          }>
          <FastImage
            style={tw`w-12 h-12 rounded-full mt-5 mx-4 mb-2`}
            source={{
              uri: user?.imageUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={tw`text-base font-semibold mx-4`}>
            {user?.name + ' ' + user?.lastName}
          </Text>
          <Text style={tw`text-xs mx-4`}>{t('drawer.view-profile')}</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`bg-gray-200 h-px m-4`}></View>
      <TouchableOpacity
        style={tw` bg-[${Colors.lightPurple}] rounded-md p-2 mx-4 flex-row items-center`}
        onPress={() => {
          props.navigation.closeDrawer();
          dispatch(setCurrentTab(!isInBookTab));
          props.navigation.navigate(
            isInBookTab ? RouteNames.landing : RouteNames.discoverBook,
          );
        }}>
        <Ionicons
          name={isInBookTab ? 'book-outline' : 'people-outline'}
          color="white"
          size={30}
          style={tw`mx-4`}
        />
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={tw`text-center text-white font-bold`}>
          {!isInBookTab ? 'Go to Books' : 'Go to Social Media'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw` bg-[${Colors.lightPurple}] rounded-md p-2 mx-4 flex-row items-center mt-3`}
        onPress={() => {
          props.navigation.closeDrawer();
          dispatch(setCurrentTab(!isInBookTab));
          props.navigation.navigate(
            isInBookTab ? RouteNames.landing : RouteNames.store,
          );
        }}>
        <Ionicons
          name={isInBookTab ? 'storefront-outline' : 'storefront-outline'}
          color="white"
          size={30}
          style={tw`mx-4`}
        />
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={tw`text-center text-white font-bold`}>
          {!isInBookTab ? 'Go to Store' : 'Go to Social Media'}
        </Text>
      </TouchableOpacity>
      <View style={tw`bg-gray-200 h-px w-full m-4`}></View>


      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Settings"
        labelStyle={tw`ml-[-15]`}
        icon={({color, size}) => (
          <Ionicons name="settings-outline" color={color} size={size} />
        )}
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate(RouteNames.profileSettings);
        }}
      />
      <DrawerItem
        label="Theme"
        icon={({color, size}) => (
          <Ionicons name="color-palette-outline" color={color} size={size} />
        )}
        labelStyle={tw`ml-[-15]`}
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate(RouteNames.login);
        }}
      />
      <DrawerItem
        label="Logout"
        labelStyle={tw`ml-[-15]`}
        icon={({color, size}) => (
          <Ionicons name="log-out-outline" color={color} size={size} />
        )}
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate(RouteNames.login);
        }}
      />
    </DrawerContentScrollView>
  );
};
