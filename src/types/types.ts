export class Transaction {
    id = ''
    budget_id = ''
    community_id = ''
    amount = 0
    date = ''
    deleted = false
    description?: string | null;
    timestamp?: string | null;

    constructor(data?: Transaction) {
        if (data != null) {
            Object.assign(this, data)

            if (typeof data.deleted === 'number') {
                this.deleted = data.deleted === 1 ? true : false
            }
        }
    }
}