import type { Transaction } from "types/types";

export interface Income extends Transaction {
    property_id: string;
}

export type NewIncome = Omit<Income, 'id' | 'deleted'> 