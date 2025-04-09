import { Message } from "../components/chat/chat";

export interface ChatEntryDto {
  type: 'odd' | 'even';
  msg: string;
  date: Date; // va fi convertit din string
}

export interface GetConversation {
  id: string;
  from: string;
  subject: string;
  photo: string;
  chat: ChatEntryDto[];
}

export interface GetUserConversationsResponse {
  conversations: GetConversation[];
}


export function mapToMessages(response: GetUserConversationsResponse): Message[] {

  return response.conversations.map(conv => ({
    id: conv.id,
    from: conv.from,
    subject: conv.subject,
    photo: conv.photo || getDefaultAvatar(conv.from),
    chat: conv.chat.map(c => ({
      type: c.type,
      msg: c.msg,
      date: new Date(c.date), // important: conversie din string!
    }))
  }));
}

export function getDefaultAvatar(name: string): string {
  name = name.split(' ')[0];
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