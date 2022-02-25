import dayjs from 'dayjs';
import React, { useCallback, useContext, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PropsContext } from './Chatty';
import { ReplyingTo } from './components/ReplyingTo';
import { IChatBubble, IMessage, MessageStatus } from './types/Chatty.types';
import { ChatEmitter } from './utils/eventEmitter';
import {
  ALL_PATERNS_SHAPES,
  HASHTAG_PATTERN_SHAPE,
  LoadAllPaternShapes,
  loadParsedText,
  MENTION_PATTERN_SHAPE,
  URL_PATTERN_SHAPE,
} from './utils/patterns';
import { ContextMenuWrapper } from './wrappers/ContextMenuWrapper';

const ParsedText = loadParsedText();

function _ChatBubble(props: IChatBubble) {
  const { message, customContent } = props;
  const propsContext = useContext(PropsContext);
  const createdAt = useMemo(() => {
    return message && dayjs(message.createdAt).format('HH:mm');
  }, [message]);

  const avatarSize = useMemo(() => {
    return {
      width: propsContext.bubbleProps?.showAvatars?.width || 40,
      height: propsContext.bubbleProps?.showAvatars?.width || 40,
      borderRadius: propsContext.bubbleProps?.showAvatars?.width || 40,
    };
  }, [propsContext.bubbleProps?.showAvatars?.width]);

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

  const onPressPattern = useCallback(
    (pattern: string, index: number) => {
      if (!message) return;
      ChatEmitter?.emit('patternPressed', pattern, index, message);
    },
    [message]
  );

  const messagePatterns = useMemo(() => {
    const patterns: any[] = [];

    if (!propsContext?.enablePatterns) return;
    if (!ParsedText) return;

    LoadAllPaternShapes(onPressPattern);

    if (propsContext.patternProps?.customPatterns) {
      patterns.push(...propsContext.patternProps.customPatterns);
    }

    if (propsContext?.patternProps?.allowPatterns) {
      propsContext.patternProps.allowPatterns.forEach((pattern) => {
        switch (pattern) {
          case 'hashtag':
            patterns.push(HASHTAG_PATTERN_SHAPE);
            break;
          case 'mention':
            patterns.push(MENTION_PATTERN_SHAPE);
            break;
          case 'url':
            patterns.push(URL_PATTERN_SHAPE);
            break;
        }
      });
    } else {
      ALL_PATERNS_SHAPES.forEach((pattern) => patterns.push(pattern));
    }

    return patterns;
  }, [
    onPressPattern,
    propsContext?.enablePatterns,
    propsContext?.patternProps?.allowPatterns,
    propsContext?.patternProps?.customPatterns,
  ]);

  const renderTicks = useCallback(() => {
    if (message?.status) {
      switch (message.status) {
        case MessageStatus.Sending:
          return (
            propsContext.bubbleProps?.tickProps?.sendingElement ?? (
              <Text>🔄</Text>
            )
          );

        case MessageStatus.Sent:
          return (
            propsContext.bubbleProps?.tickProps?.sentElement ?? <Text>✔</Text>
          );

        case MessageStatus.Delivered:
          return (
            propsContext.bubbleProps?.tickProps?.deliveredElement ?? (
              <Text>☑</Text>
            )
          );

        case MessageStatus.Read:
          return (
            propsContext.bubbleProps?.tickProps?.readElement ?? <Text>✅</Text>
          );
      }
    }

    return null;
  }, [
    message?.status,
    propsContext.bubbleProps?.tickProps?.deliveredElement,
    propsContext.bubbleProps?.tickProps?.readElement,
    propsContext.bubbleProps?.tickProps?.sendingElement,
    propsContext.bubbleProps?.tickProps?.sentElement,
  ]);

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.bubbleFooter}>
        <Text style={styles.date}>{createdAt}</Text>
        {renderTicks()}
      </View>
    );
  }, [createdAt, renderTicks]);

  return (
    <View style={[styles.wrapper, bubbleAlignment]}>
      {propsContext.bubbleProps?.trailingAccessory && message?.me && (
        <View>{propsContext.bubbleProps.trailingAccessory}</View>
      )}

      {propsContext.bubbleProps?.showAvatars?.visible && !message?.me && (
        <Image
          source={
            message?.user.avatar ?? require('./assets/images/noavatar.png')
          }
          style={[styles.avatar, avatarSize]}
        />
      )}

      <ContextMenuWrapper message={message as IMessage}>
        <View
          style={[
            bubbleBackgroundColor,
            propsContext.bubbleProps?.containerStyle,
            styles.container,
            bubbleBackgroundColor,
            { padding: message?.repliedTo ? 5 : 15 },
          ]}
        >
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

              {propsContext.enablePatterns && ParsedText ? (
                <>
                  <ParsedText parse={messagePatterns}>
                    {message?.text}
                  </ParsedText>
                  {renderFooter()}
                </>
              ) : (
                <View>
                  <Text>{message?.text}</Text>
                  {renderFooter()}
                </View>
              )}
            </>
          )}
        </View>
      </ContextMenuWrapper>

      {propsContext.bubbleProps?.showAvatars?.visible && message?.me && (
        <Image
          source={
            message?.user.avatar ?? require('./assets/images/noavatar.png')
          }
          style={[styles.avatarMe, avatarSize]}
        />
      )}

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
  },
  avatar: {
    marginLeft: 10,
  },
  avatarMe: {
    marginRight: 10,
  },
  bubbleFooter: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 5,
  },
});
