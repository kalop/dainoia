import { httpClient } from './httpClient';

export interface Agent {
  id: string;
  name: string;
  type: string;
  model: string;
  description?: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface SendMessageRequest {
  user_id: string;
  agent_id: string;
  message: string;
  conversation_id?: string;
}

export class AgentService {
  async getAgents(): Promise<Agent[]> {
    return httpClient.get<Agent[]>('/agents');
  }

  async getAgent(id: string): Promise<Agent> {
    return httpClient.get<Agent>(`/agents/${id}`);
  }

  async sendMessage(request: SendMessageRequest): Promise<string> {
    return httpClient.post<string>('/conversation/send', request);
  }
}

export const agentService = new AgentService();
