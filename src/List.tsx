import dayjs from 'dayjs';
import type { ForwardedRef, Ref } from 'react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform } from 'react-native';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import type { ScrollEvent } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';
import { ChatBubble } from './ChatBubble';
import { PropsContext } from './Chatty';
import { FAB, IFabRef } from './components/FAB';
import { LoadEarlier } from './components/LoadEarlier';
import { RenderDate } from './components/RenderDate';
import { useHaptic } from './hooks/useHaptic';
import { usePrevious } from './hooks/usePrevious';
import { SwipeableBubble } from './SwipeableBubble';
import {
  HapticType,
  IListProps,
  IMessage,
  ListRef,
} from './types/Chatty.types';
import { loadAnimated } from './utils/animated';
import { loadLottie } from './utils/lottie';
import { wait } from './utils/wait';
import { AnimatedWrapper } from './wrappers/AnimatedWrapper';

const { FadeInDown } = loadAnimated();

const ScrollViewWithHeader = React.forwardRef(
  ({ children, ...props }, ref: Ref<ScrollView>) => {
    const propsContext = useContext(PropsContext);

    return (
      <ScrollView ref={ref} {...props}>
        {propsContext?.loadEarlierProps &&
          propsContext.loadEarlierProps.show && (
            <LoadEarlier {...propsContext.loadEarlierProps} />
          )}
        {children}
      </ScrollView>
    );
  }
);

export const List = React.forwardRef(
  (props: IListProps, ref: ForwardedRef<ListRef>) => {
    const propsContext = useContext(PropsContext);
    const recyclerlistviewRef = useRef<RecyclerListView<any, any>>();
    const [isTyping, setIsTyping] = useState(false);
    const windowDimensions = useWindowDimensions();
    const safeArea = useSafeAreaInsets();
    const { trigger } = useHaptic();
    const fabRef = useRef<IFabRef>(null);
    const listHeight = useMemo(
      () => windowDimensions.height - 150 - safeArea.bottom - safeArea.top,
      [windowDimensions, safeArea]
    );
    const { rowRenderer: rowRendererProp, data } = props;

    const dataProvider = useMemo<DataProvider>(() => {
      return new DataProvider((r1: IMessage, r2: IMessage) => {
        if (r1.id !== r2.id) {
          return true;
        }

        return false;
      });
    }, []);

    const [messages, setMessages] = useState<DataProvider>(dataProvider);
    const previousMessages = usePrevious<DataProvider>(messages);

    useEffect(() => {
      setMessages(dataProvider.cloneWithRows(data));
    }, [data, dataProvider]);

    useImperativeHandle(
      ref,
      () => ({
        appendMessage: (message: IMessage) => {
          setMessages(
            dataProvider.cloneWithRows([...messages.getAllData(), message])
          );

          if (!message.me && propsContext?.enableHapticFeedback) {
            if (Platform.OS !== 'web') trigger(HapticType.Heavy);
          }
        },
        scrollToEnd: (animated?: boolean) => {
          recyclerlistviewRef.current?.scrollToEnd(animated);
        },
        setIsTyping: (typing?: boolean) => {
          if (typing) return setIsTyping(typing);

          setIsTyping((prev) => !prev);
        },
        removeMessage: (id: number) => {
          setMessages(
            dataProvider.cloneWithRows(
              messages.getAllData().filter((message) => message.id !== id)
            )
          );
        },
      }),
      [dataProvider, messages, propsContext.enableHapticFeedback, trigger]
    );

    useEffect(() => {
      // Checks if first index of messages have same id, if it is then it will not trigger scrolling
      // This is because the first message is the load earlier message, and we don't want to scroll to the bottom.
      if (
        previousMessages &&
        previousMessages.getAllData()![0]?.id === messages.getAllData()![0]?.id
      ) {
        wait(100).then(() => {
          recyclerlistviewRef.current?.scrollToEnd(true);
        });
      }
    }, [ref, messages, previousMessages]);

    const layoutProvider = useCallback(() => {
      return new LayoutProvider(
        (index) => {
          const currentMessage: IMessage = messages.getAllData()[index];
          const prevMessage: IMessage = messages.getAllData()[index - 1];

          const isFirstMessage = index === 0;

          if (currentMessage.repliedTo) {
            return 2;
          }

          if (
            (!isFirstMessage &&
              dayjs(currentMessage.createdAt).date() !==
                dayjs(prevMessage.createdAt).date()) ||
            isFirstMessage
          ) {
            return 1;
          }

          return 0;
        },
        (type, dim) => {
          if (type === 0) {
            dim.height = 85;
            dim.width = windowDimensions.width;
          }
          if (type === 1) {
            dim.height = 110;
            dim.width = windowDimensions.width;
          }
          if (type === 2) {
            dim.height = 190;
            dim.width = windowDimensions.width;
          }
        }
      );
    }, [windowDimensions.width, messages]);

    const renderBubble = useCallback(
      (data: IMessage, withDate?: boolean) => {
        if (rowRendererProp) {
          return (
            <View>
              {withDate && (
                <RenderDate
                  date={data.createdAt}
                  {...propsContext.renderDateProps}
                />
              )}

              <AnimatedWrapper entering={FadeInDown} exiting={FadeOutUp}>
                <SwipeableBubble message={data} onReply={propsContext.onReply}>
                  {rowRendererProp(data)}
                </SwipeableBubble>
              </AnimatedWrapper>
            </View>
          );
        }

        return (
          <View>
            {withDate && (
              <RenderDate
                date={data.createdAt}
                {...propsContext.renderDateProps}
              />
            )}
            <AnimatedWrapper entering={FadeInDown} exiting={FadeOutUp}>
              {propsContext.onReply ? (
                <SwipeableBubble
                  message={data}
                  onReply={propsContext.onReply}
                />
              ) : (
                <ChatBubble message={data} />
              )}
            </AnimatedWrapper>
          </View>
        );
      },
      [propsContext.onReply, propsContext.renderDateProps, rowRendererProp]
    );

    const rowRenderer = useCallback(
      (type, data: IMessage) => {
        if (type === 0) {
          return renderBubble(data);
        }
        if (type === 1) {
          return renderBubble(data, true);
        }
        if (type === 2) {
          return renderBubble(data, true);
        }

        return null;
      },
      [renderBubble]
    );

    const renderFooter = useCallback(() => {
      const LottieView = loadLottie();

      if (LottieView) {
        if (propsContext?.renderTypingBubble) {
          return propsContext.renderTypingBubble({
            typingAnimation: (
              <LottieView
                source={require('./assets/lottie/typing.json')}
                autoPlay
                style={{ width: 30 }}
              />
            ),
          });
        }

        return (
          <ChatBubble
            customContent={
              <LottieView
                source={require('./assets/lottie/typing.json')}
                autoPlay
                style={{ width: 30 }}
              />
            }
          />
        );
      } else {
        if (propsContext?.renderTypingBubble) {
          return propsContext.renderTypingBubble();
        }

        return <Text>Typing...</Text>;
      }
    }, [propsContext]);

    const onScroll = useCallback(
      (e: ScrollEvent, offsetX: number, offsetY: number) => {
        if (e.nativeEvent.contentOffset.y <= 0) {
          fabRef.current?.show();
        } else {
          fabRef.current?.hide();
        }

        if (props.onScroll) {
          props.onScroll(e, offsetX, offsetY);
        }
      },
      [props]
    );

    const scrollToBottom = useCallback(() => {
      recyclerlistviewRef.current?.scrollToEnd(true);
    }, []);

    return (
      <View style={{ minWidth: 1, minHeight: 1, maxHeight: listHeight }}>
        {propsContext.showScrollToBottomButton && (
          <FAB
            ref={fabRef}
            onPress={scrollToBottom}
            {...propsContext.scrollToBottomProps}
          />
        )}

        <RecyclerListView
          layoutProvider={layoutProvider()}
          externalScrollView={ScrollViewWithHeader}
          dataProvider={messages}
          style={[
            {
              height: propsContext.replyingTo ? '90%' : '100%',
            },
            props.containerStyle,
          ]}
          // @ts-ignore
          ref={recyclerlistviewRef}
          scrollViewProps={{
            keyboardShouldPersistTaps: 'never',
          }}
          onScroll={onScroll}
          optimizeForInsertDeleteAnimations
          rowRenderer={rowRenderer}
          renderFooter={() => (isTyping ? renderFooter() : null)}
          onEndReached={props?.onEndReached}
          onEndReachedThreshold={props?.onEndReachedThreshold}
        />
      </View>
    );
  }
);
