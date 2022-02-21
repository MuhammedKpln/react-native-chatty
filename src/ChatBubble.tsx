import dayjs from 'dayjs';
import React, { useContext, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { PropsContext } from './Chatty';
import { ReplyingTo } from './components/ReplyingTo';
import type { IChatBubble } from './types/Chatty.types';

function _ChatBubble(props: IChatBubble) {
  const { message, customContent } = props;
  const propsContext = useContext(PropsContext);

  const createdAt = useMemo(() => {
    return message && dayjs(message.createdAt).format('HH:mm');
  }, [message]);

  const bubbleBackgroundColor = useMemo<ViewStyle>(() => {
    if (propsContext.bubbleProps?.containerStyle) {
      if (message?.me) {
        return {
          ...propsContext.bubbleProps.containerStyle,
        };
      } else {
        return {
          ...propsContext.bubbleProps.containerStyle,
        };
      }
    }

    if (message?.me) {
      return {
        backgroundColor:
          propsContext?.bubbleProps?.selfBubbleColor ?? '#afddfa',
      };
    }

    return {
      backgroundColor: propsContext?.bubbleProps?.otherBubbleColor ?? '#c8faaf',
    };
  }, [
    message?.me,
    propsContext?.bubbleProps?.otherBubbleColor,
    propsContext?.bubbleProps?.selfBubbleColor,
    propsContext.bubbleProps?.containerStyle,
  ]);

  const bubbleAlignment = useMemo<ViewStyle>(() => {
    if (message?.me) {
      return {
        alignSelf: 'flex-end',
      };
    }

    return {
      alignSelf: 'flex-start',
    };
  }, [message?.me]);

  return (
    <View style={[styles.wrapper, bubbleAlignment]}>
      {propsContext.bubbleProps?.trailingAccessory && message?.me && (
        <View>{propsContext.bubbleProps.trailingAccessory}</View>
      )}

      <View
        style={[
          bubbleBackgroundColor,
          propsContext.bubbleProps?.containerStyle,
          styles.container,
          bubbleBackgroundColor,
          { padding: message?.repliedTo ? 5 : 15 },
        ]}
      >
        <>
          {customContent ? (
            customContent
          ) : (
            <>
              {message?.repliedTo && (
                <ReplyingTo
                  username={message?.repliedTo?.user.username}
                  text={message?.repliedTo.text}
                />
              )}

              <Text>{message?.text}</Text>
              <Text style={styles.date}>{createdAt}</Text>
            </>
          )}
        </>
      </View>

      {propsContext.bubbleProps?.trailingAccessory && !message?.me && (
        <View>{propsContext.bubbleProps.trailingAccessory}</View>
      )}
    </View>
  );
}

export const ChatBubble = React.memo(_ChatBubble);

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    margin: 10,
    maxWidth: 300,
    borderRadius: 10,
  },
  date: {
    color: '#a8a8a8',
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});
