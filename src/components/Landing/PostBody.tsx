import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import ImageModal from 'react-native-image-modal';
import isEqual from 'react-fast-compare';
import tw from 'twrnc';
const {width} = Dimensions.get('window');
interface IPostBodyProps {
  readonly post?: string;
  readonly postImg?: string;
}
export const PostBody: React.FunctionComponent<IPostBodyProps> = React.memo(
  props => {
    return (
      <View style={tw`flex-1`}>
        <View>
          {Boolean(props.post) && (
            <Text style={tw`ml-2 mb-2 p-2 text-gray-800`}>
              {props.post?.trim()}
            </Text>
          )}
        </View>
        {Boolean(props.postImg) && (
          <View style={tw`flex-1`}>
            <ImageModal
              style={tw`h-96 w-[${width * 0.96}px] mx-auto`}
              source={{
                uri: props.postImg,
              }}
            />
          </View>
        )}
      </View>
    );
  },
  isEqual,
);
