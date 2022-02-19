import type { ForwardedRef } from 'react';
import React, { useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Footer } from './Footer';
import { Header } from './Header';
import { List } from './List';
import type { IChatty, ListRef } from './types/Chatty.types';

export const PropsContext = React.createContext<IChatty>({} as IChatty);

export const Chatty = React.forwardRef(
  (props: IChatty, ref: ForwardedRef<ListRef>) => {
    const { messages } = props;

    useEffect(() => {
      // Scroll on keyboard show
      const listener = Keyboard.addListener('keyboardDidShow', () => {
        //@ts-ignore
        ref.current?.scrollToEnd(true);
      });

      return () => {
        listener.remove();
      };
    }, [ref]);

    return (
      <SafeAreaView>
        <PropsContext.Provider value={props}>
          {props?.renderHeader ? (
            props.renderHeader(props.headerProps)
          ) : (
            <Header {...props.headerProps} />
          )}

          <KeyboardAvoidingView
            behavior={Platform.select({
              android: 'height',
              ios: 'padding',
            })}
            keyboardVerticalOffset={80}
          >
            <List
              data={messages}
              ref={ref}
              rowRenderer={props?.renderBubble ? props.renderBubble : undefined}
            />
            {props?.renderFooter ? (
              props.renderFooter(props.footerProps)
            ) : (
              <Footer {...props.footerProps} replyingTo={props.replyingTo} />
            )}
          </KeyboardAvoidingView>
        </PropsContext.Provider>
      </SafeAreaView>
    );
  }
);
