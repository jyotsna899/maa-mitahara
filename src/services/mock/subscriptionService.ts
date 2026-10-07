import { StageKey } from '@/types';

export interface SubscriptionSchedule {
  id: string;
  customerPhone: string;
  productOrKitId: string;
  intervalWeeks: 2 | 4;
  currentStage: StageKey;
  discountPercentage: number; // e.g. 10%
  status: 'active' | 'paused' | 'swapped_to_next_stage';
  nextDeliveryDate: string;
}

class MockSubscriptionService {
  private subscriptions: SubscriptionSchedule[] = [];

  public createSubscription(
    phone: string,
    itemId: string,
    stage: StageKey,
    intervalWeeks: 2 | 4
  ): SubscriptionSchedule {
    const nextDelivery = new Date();
    nextDelivery.setDate(nextDelivery.getDate() + intervalWeeks * 7);

    const sub: SubscriptionSchedule = {
      id: `sub-${Date.now()}`,
      customerPhone: phone,
      productOrKitId: itemId,
      intervalWeeks,
      currentStage: stage,
      discountPercentage: 10, // PRD configurable value
      status: 'active',
      nextDeliveryDate: nextDelivery.toISOString().split('T')[0],
    };

    this.subscriptions.push(sub);
    return sub;
  }

  public getStageSwapRecommendation(currentStage: StageKey): { nextStage: StageKey; suggestedKitId: string } | null {
    if (currentStage === 'first_trimester') {
      return { nextStage: 'second_trimester', suggestedKitId: '2nd-trimester-energy-kit' };
    }
    if (currentStage === 'second_trimester') {
      return { nextStage: 'third_trimester', suggestedKitId: '3rd-trimester-vitality-kit' };
    }
    if (currentStage === 'third_trimester') {
      return { nextStage: 'postpartum', suggestedKitId: 'postpartum-recovery-kit' };
    }
    return null;
  }
}

export const subscriptionService = new MockSubscriptionService();
