import { createContext, ReactNode, useContext, useState } from 'react';

export type Order = {
  id: string;
  store: string;
  items: string[];
  createdAt: number;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
}
