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
    photo: conv.photo || 'assets/images/profile/user-1.jpg',
    chat: conv.chat.map(c => ({
      type: c.type,
      msg: c.msg,
      date: new Date(c.date), // important: conversie din string!
    }))
  }));
}
