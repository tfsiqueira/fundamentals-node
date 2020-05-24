import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValue = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((sum, currentValue) => sum + currentValue.value, 0);

    const outcomeValue = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((sum, currentValue) => sum + currentValue.value, 0);

    const totalValue = incomeValue - outcomeValue;

    const balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total: totalValue,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
