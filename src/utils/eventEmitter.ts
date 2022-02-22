import type { IMessage } from 'src/types/Chatty.types';
import * as _ from 'eventemitter3';
import type TypedEmitter from 'typed-emitter';

export type EventMap = {
  [key: string]: (...args: any[]) => void;
};

type ChatEvents = {
  patternPressed: (pattern: string, index: number, message: IMessage) => void;
};

export const ChatEmitter = new _.EventEmitter() as TypedEmitter<ChatEvents>;
