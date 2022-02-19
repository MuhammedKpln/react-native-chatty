import type { ForwardedRef } from 'react';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import { ChatBubble } from './ChatBubble';
import type { IListProps, IMessage, ListRef } from './types/Chatty.types';
import { loadLottie } from './utils/lottie';
import { wait } from './utils/wait';

export const List = React.forwardRef(
  (props: IListProps, ref: ForwardedRef<ListRef>) => {
    const recyclerlistviewRef = useRef<RecyclerListView<any, any>>();
    const [isTyping, setIsTyping] = useState(false);
    const windowDimensions = useWindowDimensions();
    const safeArea = useSafeAreaInsets();
    const listHeight = useMemo(
      () => windowDimensions.height - 150 - safeArea.bottom - safeArea.top,
      [windowDimensions, safeArea]
    );
    const { rowRenderer: rowRendererProp } = props;

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
      setMessages(dataProvider.cloneWithRows(props.data));
    }, [props.data, dataProvider]);

    useImperativeHandle(
      ref,
      () => ({
        appendMessage: (message: IMessage) => {
          setMessages(
            dataProvider.cloneWithRows([...messages.getAllData(), message])
          );
        },
        scrollToEnd: (animated?: boolean) => {
          recyclerlistviewRef.current?.scrollToEnd(animated);
        },
        setIsTyping: (typing?: boolean) => {
          if (typing) return setIsTyping(typing);

          setIsTyping((prev) => !prev);
        },
      }),
      [dataProvider, messages]
    );

    useEffect(() => {
      //Scroll down on new message
      wait(100).then(() => {
        recyclerlistviewRef.current?.scrollToEnd(true);
      });
    }, [ref, messages]);

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
              <Animated.View entering={FadeInDown}>
                {rowRendererProp(data)}
              </Animated.View>
            );
          }

          return (
            <Animated.View entering={FadeInDown}>
              <ChatBubble message={data} />
            </Animated.View>
          );
        }

        return <></>;
      },
      [rowRendererProp]
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
          dataProvider={messages}
          style={{
            height: '100%',
          }}
          // @ts-ignore
          ref={ref}
          optimizeForInsertDeleteAnimations
          rowRenderer={rowRenderer}
          renderFooter={() => (isTyping ? renderFooter() : null)}
        />
      </View>
    );
  }
);
