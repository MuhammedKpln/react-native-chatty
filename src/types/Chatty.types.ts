import type { ImageSourcePropType } from 'react-native';

export interface IUser {
  id: number;
  username: string;
  avatar: ImageSourcePropType;
}

export interface IMessage {
  id: number;
  text: string;
  user: IUser;
  me: boolean;
  createdAt: Date;
}

export interface IChatty {
  messages: IMessage[];
  headerProps: IChatHeaderProps;
  footerProps: IFooterProps;
  renderFooter?: (props?: IFooterProps) => JSX.Element;
  renderHeader?: (props?: IChatHeaderProps) => JSX.Element;
  renderBubble?: (props?: IMessage) => JSX.Element;
}

export interface IListProps {
  rowRenderer?: (data: IMessage) => JSX.Element;
  data: IMessage[];
}

export interface IChatBubble {
  message?: IMessage;
  customContent?: JSX.Element;
}

export interface IChatHeaderProps {
  user: IUser;
}

export interface IFooterProps {
  onChangeText: (text: string) => void;
  onPressSend: (text: string) => void;
}

export interface ListRef {
  appendMessage: (message: IMessage) => void;
  scrollToEnd: (animated?: boolean) => void;
  setIsTyping: (isTyping?: boolean) => void;
}
