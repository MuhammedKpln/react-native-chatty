import React, { useState } from 'react';
import { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import type { ILoadEarlierProps } from 'src/types/Chatty.types';

function _LoadEarlier(props: ILoadEarlierProps) {
  const { onLoadEarlier } = props;
  const [fetchingEarlier, setFetchingEarlier] = useState(false);

  const onPress = useCallback(() => {
    setFetchingEarlier(true);

    onLoadEarlier!().finally(() => setFetchingEarlier(false));
  }, [onLoadEarlier]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        props?.buttonContainerStyle
          ? props.buttonContainerStyle
          : {
              padding: 10,
              backgroundColor: !fetchingEarlier ? '#eb8334' : undefined,
              maxWidth: 100,
              margin: 10,
              borderRadius: 10,
              alignSelf: 'center',
            }
      }
    >
      <Text style={props?.labelStyle ? props.labelStyle : { color: '#fff' }}>
        {fetchingEarlier ? <ActivityIndicator /> : 'Load Earlier'}
      </Text>
    </TouchableOpacity>
  );
}

export const LoadEarlier = React.memo(_LoadEarlier);
