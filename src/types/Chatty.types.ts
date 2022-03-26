import type {
  ImageSourcePropType,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import type { ContextMenuAction } from 'react-native-context-menu-view';
import type { RecyclerListViewProps } from 'recyclerlistview';

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
  status?: MessageStatus;
  media?: IMedia[];
}

export interface IChatty {
  messages: IMessage[];
  headerProps: IChatHeaderProps;
  footerProps: IFooterProps;
  replyingTo?: IMessage;
  bubbleProps?: Omit<IChatBubble, 'customContent'>;
  loadEarlierProps?: ILoadEarlierProps;
  enableHapticFeedback?: boolean;
  enableImageUploads?: boolean;
  renderDateProps?: Omit<IRenderDateProps, 'date'>;
  showScrollToBottomButton?: boolean;
  scrollToBottomProps?: Omit<IScrollToBottomProps, 'onPress'>;
  setDateLocale?: string | ILocale;
  listProps?: Omit<IListProps, 'rowRenderer' | 'data'>;
  enablePatterns?: boolean;
  enableUrlPreviews?: boolean;
  patternProps?: IPatternProps;
  enableSkeletonLoader?: boolean;
  onReply?: (message: IMessage) => void;
  renderFooter?: (props?: IFooterProps) => JSX.Element;
  renderHeader?: (props?: IChatHeaderProps) => JSX.Element;
  renderBubble?: (props?: IMessage) => JSX.Element;
  renderTypingBubble?: (props?: ITypingBubble) => JSX.Element;
}

export interface IListProps
  extends Pick<
    RecyclerListViewProps,
    'onEndReached' | 'onEndReachedThreshold' | 'onScroll'
  > {
  rowRenderer?: (data: IMessage) => JSX.Element;
  data: IMessage[];
  containerStyle?: ViewStyle;
}

export interface IChatBubble {
  message?: IMessage;
  containerStyle?: ViewStyle;
  selfBubbleColor?: string;
  otherBubbleColor?: string;
  labelStyle?: (isSelf: boolean) => TextStyle;
  dateStyle?: (isSelf: boolean) => TextStyle;
  replyDragElement?: JSX.Element;
  trailingAccessory?: JSX.Element;
  showAvatars?: IShowAvatarProps;
  tickProps?: ITickProps;
  actions?: IActionProps;
  enableCornerRounding?: boolean;
  children?: JSX.Element;
}

export interface IShowAvatarProps {
  width?: number;
  height?: number;
  visible: boolean;
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
  onPressSend: (data: {
    text: string;
    repliedTo?: IMessage;
    media?: IMedia[];
  }) => void;
  onPressCancelReply: () => void;
  closeReplyButton?: (props?: IFooterProps) => JSX.Element;
  sendButton?: (props?: Pick<IFooterProps, 'onPressSend'>) => JSX.Element;
  value?: string;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  placeholder?: string;
  replyStyles?: {
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    usernameStyle?: TextStyle;
  };
  mentionStyles?: {
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
  };
  renderImageAction?: (props: { onPressImage: () => void }) => JSX.Element;
}

export interface ListRef {
  appendMessage: (message: IMessage | IMessage[], firstIndex?: boolean) => void;
  removeMessage: (id: number) => void;
  scrollToEnd: (animated?: boolean) => void;
  setIsTyping: (isTyping?: boolean) => void;
}

export interface IReply {
  message: IMessage;
}

export interface ILoadEarlierProps {
  show: boolean;
  onLoadEarlier: () => Promise<unknown>;
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

export interface ITypingBubble {
  typingAnimation?: JSX.Element;
}

export interface IPatternShape {
  type?: string;
  pattern?: RegExp | string;
  style: TextStyle;
  onPress?: (pattern: string, index: number) => void;
}

export interface IPatternProps {
  allowPatterns?: Array<'mention' | 'hashtag' | 'url'>;
  customPatterns?: IPatternShape[];
}

export const LayoutType = {
  Normal: 0,
  Replied: 1,
  Dated: 2,
  Long: 3,
  Long2x: 4,
  Long3x: 5,
  ExtremeLong: 6,
  Media: 7,
  Media2x: 8,
};

export enum MessageStatus {
  Sending = 'sending',
  Sent = 'sent',
  Delivered = 'delivered',
  Read = 'readed',
}

export interface ITickProps {
  sendingElement?: JSX.Element;
  sentElement?: JSX.Element;
  deliveredElement?: JSX.Element;
  readElement?: JSX.Element;
}

export interface ITypingStatusRef {
  setIsTyping: (isTyping: boolean) => void;
}

export interface IActionProps {
  options: Pick<ContextMenuAction, 'title' | 'destructive' | 'systemIcon'>[];
  cancelButtonLabel?: string;
}

export enum MediaType {
  Image = 0,
  Video = 1,
  Audio = 2,
}

export interface IMedia {
  uri: string;
  base64?: string;
  type: MediaType;
}

export interface IUrlPreviewBubble {
  title: string;
  image: string;
  description: string;
  url: string;
}
