import { Injectable, inject, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../components/chat/chat';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetUserConversationsResponse, mapToMessages } from './chat.interfaces';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: signalR.HubConnection;
  private currentUserService = inject(CurrentUserService);

  private messagesSignal = signal<Message[]>([]);
  private selectedMessageSignal = signal<Message | null>(null);

  private readonly baseUrl = `${environment.apiUrl}/chat`;

  constructor(private http: HttpClient) {
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
    const currentUser = this.currentUserService.getCurrentUserInfo();

    if(currentUser === null) return;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7176/chatHub?userId=${currentUser.id}`, {
        withCredentials: true
      })
      .configureLogging(signalR.LogLevel.Debug) 
      .build();

    console.log(localStorage.getItem('accessToken'));

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR connected'))
      .catch((err) => console.error('❌ SignalR connection error:', err));

      
    this.hubConnection.on('ReceiveMessage', (message: Message) => {
      const current = this.messagesSignal();
      const currentUser = this.currentUserService.getCurrentUserInfo();
      
      if (!currentUser) return;
      
      const senderIsCurrentUser = message.id === currentUser.id;
      const otherUserId = senderIsCurrentUser
        ? this.selectedMessage()?.id || ''
        : message.id || '';
      
      const matched = current.find((m) => m.id === otherUserId);
      
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
            id: otherUserId,
            from: 'Unknown user', // completează dacă ai un fallback
            subject: '',
            photo: 'assets/images/profile/default.jpg',
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
      const firstName = to.from.split(' ')[0];
      const newLocalMessage: Message = {
        id: to.id,
        from: to.from,
        subject: 'Conversation',
        photo: this.getDefaultAvatar(firstName),
        chat: [localChatEntry],
      };
      this.messagesSignal.set([...current, newLocalMessage]);
    }

    const payload: Message = {
      id: to.id,
      from: currentUser.name,
      subject: 'Conversation',
      photo: this.getDefaultAvatar(currentUser.name),
      chat: [localChatEntry],
    };

    this.hubConnection
      .invoke('SendMessage', payload)
      .catch((err) => console.error(err));
  }

  public overrideMessages(newMessages: Message[]): void {
    this.messagesSignal.set(newMessages);
  }
  

  public async loadMessages(): Promise<void> {
    const currentUser = this.currentUserService.getCurrentUserInfo();
    if (!currentUser) return;
  
    try {
      const response = await this.http
        .get<GetUserConversationsResponse>(`${this.baseUrl}/get-messages`)
        .pipe(first())
        .toPromise();
  
      const messages = mapToMessages(response!);
      this.messagesSignal.set(messages);
    } catch (err) {
      console.error('Eroare la încărcarea mesajelor din DB:', err);
    }
  }
  

  getDefaultAvatar(name: string): string {
    const avatars = [
      '/assets/images/profile/user-1.jpg',
      '/assets/images/profile/user-2.jpg',
      '/assets/images/profile/user-3.jpg',
      '/assets/images/profile/user-4.jpg',
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const index = Math.abs(hash) % avatars.length;
    return avatars[index]; 
  }
  
}
