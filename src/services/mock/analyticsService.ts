export type FunnelEventType =
  | 'page_view'
  | 'stage_selected'
  | 'quiz_started'
  | 'quiz_step_completed'
  | 'quiz_completed'
  | 'plan_viewed'
  | 'add_to_cart'
  | 'checkout_initiated'
  | 'subscribe_toggled'
  | 'stage_progression_triggered';

export interface TelemetryEvent {
  id: string;
  eventName: FunnelEventType;
  payload: Record<string, unknown>;
  timestamp: string;
}

class MockAnalyticsService {
  private events: TelemetryEvent[] = [];

  public track(eventName: FunnelEventType, payload: Record<string, unknown> = {}) {
    const evt: TelemetryEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      eventName,
      payload,
      timestamp: new Date().toISOString(),
    };
    this.events.push(evt);
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Telemetry ${eventName}]`, payload);
    }
  }

  public getEvents(): TelemetryEvent[] {
    return [...this.events];
  }
}

export const analyticsService = new MockAnalyticsService();
