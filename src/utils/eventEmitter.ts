import type { IMessage } from 'src/types/Chatty.types';
import type TypedEmitter from 'typed-emitter';

let _: any;

try {
  _ = require('eventemitter3');
} catch {
  console.warn("Please install 'eventemitter3' to use pattern feature");
}

export type EventMap = {
  [key: string]: (...args: any[]) => void;
};

type ChatEvents = {
  patternPressed: (pattern: string, index: number, message: IMessage) => void;
};

export const ChatEmitter = new _.EventEmitter() as TypedEmitter<ChatEvents>;
