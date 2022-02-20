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
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import { ChatBubble } from './ChatBubble';
import { PropsContext } from './Chatty';
import { LoadEarlier } from './components/LoadEarlier';
import { useHaptic } from './hooks/useHaptic';
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
        {propsContext?.loadEarlierProps && (
          <LoadEarlier
            onLoadEarlier={propsContext?.loadEarlierProps?.onLoadEarlier}
            {...propsContext.loadEarlierProps}
          />
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
            trigger(HapticType.Heavy);
          }
        },
        scrollToEnd: (animated?: boolean) => {
          recyclerlistviewRef.current?.scrollToEnd(animated);
        },
        setIsTyping: (typing?: boolean) => {
          if (typing) return setIsTyping(typing);

          setIsTyping((prev) => !prev);
        },
      }),
      [dataProvider, messages, propsContext.enableHapticFeedback, trigger]
    );

    useEffect(() => {
      //Scroll down on new message
      wait(100).then(() => {
        recyclerlistviewRef.current?.scrollToEnd(true);
      });
    }, [ref, messages, trigger]);

    const layoutProvider = useCallback(() => {
      return new LayoutProvider(
        () => {
          return 0;
        },
        (type, dim) => {
          if (type === 0) {
            dim.height = 85;
            dim.width = windowDimensions.width;
          }
        }
      );
    }, [windowDimensions.width]);

    const rowRenderer = useCallback(
      (type, data: IMessage) => {
        if (type === 0) {
          if (rowRendererProp) {
            return (
              <AnimatedWrapper entering={FadeInDown}>
                {rowRendererProp(data)}
              </AnimatedWrapper>
            );
          }

          return (
            <AnimatedWrapper entering={FadeInDown}>
              {propsContext.onReply ? (
                <SwipeableBubble
                  message={data}
                  onReply={propsContext.onReply}
                />
              ) : (
                <ChatBubble message={data} />
              )}
            </AnimatedWrapper>
          );
        }

        return <></>;
      },
      [rowRendererProp, propsContext.onReply]
    );

    const renderFooter = useCallback(() => {
      const LottieView = loadLottie();

      if (LottieView) {
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
        return <Text>Typing...</Text>;
      }
    }, []);

    return (
      <View style={{ minWidth: 1, minHeight: 1, maxHeight: listHeight }}>
        <RecyclerListView
          renderAheadOffset={1000}
          layoutProvider={layoutProvider()}
          externalScrollView={ScrollViewWithHeader}
          dataProvider={messages}
          style={{
            height: propsContext.replyingTo ? '90%' : '100%',
          }}
          // @ts-ignore
          ref={recyclerlistviewRef}
          optimizeForInsertDeleteAnimations
          rowRenderer={rowRenderer}
          renderFooter={() => (isTyping ? renderFooter() : null)}
        />
      </View>
    );
  }
);
