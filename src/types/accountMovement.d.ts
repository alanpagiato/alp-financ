
export interface AccountMovementSplit {
    id?: number;
    accountMovementId?: number;
    entityId: number;
    entity?: {
      name: string;
    };
    accountSubPlanId: number;
    accountSubPlan?: {
      description: string;
    };
    valueSplit: number;
  }