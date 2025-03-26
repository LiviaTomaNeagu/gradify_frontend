import { Injectable, signal } from '@angular/core';
import { Message } from '../components/chat/chat';
import { messages } from '../components/chat/chatData';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSignal = signal<Message[]>(messages);
  private selectedMessageSignal = signal<Message | null>(messages[0]);

  constructor() {}

  get messages() {
    return this.messagesSignal;
  }

  get selectedMessage() {
    return this.selectedMessageSignal;
  }

  sendMessage(selectedMessage: Message, msg: string) {
    if (msg.trim()) {
      const newMessage = { type: 'even', msg, date: new Date() };
      selectedMessage.chat.push(newMessage);
      this.messagesSignal.update((currentMessages) =>
        currentMessages.map((message) =>
          message === selectedMessage
            ? { ...message, chat: [...selectedMessage.chat] }
            : message
        )
      );
      this.selectedMessageSignal.set({ ...selectedMessage });
    }
  }

  selectMessage(message: Message): void {
    this.selectedMessageSignal.set(message);
  }
}
