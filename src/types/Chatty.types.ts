import type {
  ImageSourcePropType,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

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
  repliedTo?: IMessage;
}

export interface IChatty {
  messages: IMessage[];
  headerProps: IChatHeaderProps;
  footerProps: IFooterProps;
  replyingTo?: IMessage;
  bubbleProps?: Omit<IChatBubble, 'customContent'>;
  loadEarlierProps?: ILoadEarlierProps;
  enableHapticFeedback?: boolean;
  renderDateProps?: Omit<IRenderDateProps, 'date'>;
  scrollToBottom?: boolean;
  scrollToBottomProps?: Omit<IScrollToBottomProps, 'onPress'>;
  setDateLocale?: string | ILocale;
  listProps?: Omit<IListProps, 'rowRenderer' | 'data'>;
  onReply?: (message: IMessage) => void;
  closeReplyButton?: (props?: IFooterProps) => JSX.Element;
  renderFooter?: (props?: IFooterProps) => JSX.Element;
  renderHeader?: (props?: IChatHeaderProps) => JSX.Element;
  renderBubble?: (props?: IMessage) => JSX.Element;
}

export interface IListProps {
  rowRenderer?: (data: IMessage) => JSX.Element;
  data: IMessage[];
  containerStyle?: ViewStyle;
}

export interface IChatBubble {
  message?: IMessage;
  customContent?: JSX.Element;
  containerStyle?: ViewStyle;
  selfBubbleColor?: string;
  otherBubbleColor?: string;
  replyDragElement?: () => JSX.Element;
}

export interface ISwipeableBubble
  extends IChatBubble,
    Pick<IChatty, 'onReply'> {
  children?: JSX.Element;
}

export interface IChatHeaderProps {
  user: IUser;
}

export interface IFooterProps extends Pick<IChatty, 'replyingTo'> {
  onChangeText: (text: string) => void;
  onPressSend: (data: { text: string; repliedTo?: IMessage }) => void;
  onPressCancelReply: () => void;
  value?: string;
}

export interface ListRef {
  appendMessage: (message: IMessage) => void;
  scrollToEnd: (animated?: boolean) => void;
  setIsTyping: (isTyping?: boolean) => void;
}

export interface IReply {
  message: IMessage;
}

export interface ILoadEarlierProps {
  onLoadEarlier?: () => Promise<unknown>;
  buttonContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

export enum HapticType {
  Light = 'light',
  Medium = 'medium',
  Heavy = 'heavy',
}

export interface IRenderDateProps {
  date: Date;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

export interface IScrollToBottomProps
  extends Pick<TouchableOpacityProps, 'onPress'> {
  containerStyle?: ViewStyle;
  content?: JSX.Element;
}
