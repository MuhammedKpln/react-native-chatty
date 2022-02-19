import type { ForwardedRef } from 'react';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import { ChatBubble } from './ChatBubble';
import type { IListProps, IMessage, ListRef } from './types/Chatty.types';
import { wait } from './utils/wait';

export const List = React.forwardRef(
  (props: IListProps, ref: ForwardedRef<ListRef>) => {
    const recyclerlistviewRef = useRef<RecyclerListView<any, any>>();
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
      }),
      [dataProvider, messages]
    );

    useEffect(() => {
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
          ref={recyclerlistviewRef}
          optimizeForInsertDeleteAnimations
          rowRenderer={rowRenderer}
        />
      </View>
    );
  }
);
