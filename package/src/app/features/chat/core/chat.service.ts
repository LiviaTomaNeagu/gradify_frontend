import { Injectable, inject, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../components/chat/chat';
import { CurrentUserService } from 'src/app/@core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: signalR.HubConnection;
  private currentUserService = inject(CurrentUserService);

  private messagesSignal = signal<Message[]>([]);
  private selectedMessageSignal = signal<Message | null>(null);

  constructor() {
    this.startConnection();
  }

  public messages(): Message[] {
    return this.messagesSignal();
  }

  public selectedMessage(): Message | null {
    return this.selectedMessageSignal();
  }

  public setSelectedMessage(message: Message): void {
    this.selectedMessageSignal.set(message);
  }

  private startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7176/chatHub', {
        withCredentials: true,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR connected'))
      .catch((err) => console.error('❌ SignalR connection error:', err));

    this.hubConnection.on('ReceiveMessage', (message: Message) => {
      const current = this.messagesSignal();
      const matched = current.find((m) => m.id === message.id);

      const newChatEntry = {
        type: 'even',
        msg: message.chat[0].msg,
        date: new Date(message.chat[0].date),
      };

      if (matched) {
        matched.chat.push(newChatEntry);
        this.messagesSignal.set([...current]);
      } else {
        this.messagesSignal.set([
          ...current,
          {
            ...message,
            chat: [newChatEntry],
          },
        ]);
      }
    });
  }

  public sendMessage(to: Message, content: string): void {
    const currentUser = this.currentUserService.getCurrentUserInfo();

    if (!currentUser) return;

    const current = this.messagesSignal();
    const matched = current.find((m) => m.id === to.id);

    const localChatEntry = {
      type: 'odd',
      msg: content,
      date: new Date(),
    };

    if (matched) {
      matched.chat.push(localChatEntry);
      this.messagesSignal.set([...current]);
    } else {
      const newLocalMessage: Message = {
        id: to.id,
        from: to.from,
        subject: to.subject,
        photo: to.photo,
        chat: [localChatEntry],
      };
      this.messagesSignal.set([...current, newLocalMessage]);
    }

    const payload: Message = {
      id: to.id,
      from: currentUser.name,
      subject: 'Licenta Chat',
      photo: 'assets/images/profile/user-1.jpg',
      chat: [localChatEntry],
    };

    this.hubConnection
      .invoke('SendMessage', payload)
      .catch((err) => console.error(err));
  }

  public overrideMessages(newMessages: Message[]): void {
    this.messagesSignal.set(newMessages);
  }
  
}
