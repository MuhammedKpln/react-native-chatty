import type { ForwardedRef } from 'react';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Footer } from './Footer';
import { Header } from './Header';
import { List } from './List';
import type { IChatty, ListRef } from './types/Chatty.types';

export const PropsContext = React.createContext<IChatty>({} as IChatty);

export const Chatty = React.forwardRef(
  (props: IChatty, ref: ForwardedRef<ListRef>) => {
    const { messages } = props;

    return (
      <PropsContext.Provider value={props}>
        {props?.renderHeader ? (
          props.renderHeader(props.headerProps)
        ) : (
          <Header {...props.headerProps} />
        )}
        <KeyboardAvoidingView
          behavior={Platform.select({
            android: 'height',
            ios: 'position',
          })}
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
    );
  }
);
