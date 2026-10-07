export interface WhatsAppOptInRecord {
  phoneNumber: string;
  customerName: string;
  stageTag: string;
  consentGranted: boolean;
  consentTimestamp: string;
  source: 'stage_quiz' | 'checkout' | 'footer_support';
}

export interface DispatchedMessage {
  id: string;
  recipientPhone: string;
  templateType: 'plan_delivery' | 'week_one_usage' | 'stage_transition_prompt' | 'reorder_reminder';
  payloadSummary: string;
  sentAt: string;
}

class MockWhatsAppService {
  private consentLog: WhatsAppOptInRecord[] = [];
  private sentMessages: DispatchedMessage[] = [];

  public logOptIn(record: Omit<WhatsAppOptInRecord, 'consentTimestamp'>): WhatsAppOptInRecord {
    const fullRecord: WhatsAppOptInRecord = {
      ...record,
      consentTimestamp: new Date().toISOString(),
    };
    this.consentLog.push(fullRecord);
    return fullRecord;
  }

  public sendPlanLink(phoneNumber: string, planSummary: string): DispatchedMessage {
    const msg: DispatchedMessage = {
      id: `wa-msg-${Date.now()}`,
      recipientPhone: phoneNumber,
      templateType: 'plan_delivery',
      payloadSummary: planSummary,
      sentAt: new Date().toISOString(),
    };
    this.sentMessages.push(msg);
    return msg;
  }

  public getConsentHistory(): WhatsAppOptInRecord[] {
    return [...this.consentLog];
  }

  public getSentHistory(): DispatchedMessage[] {
    return [...this.sentMessages];
  }
}

export const whatsAppService = new MockWhatsAppService();
