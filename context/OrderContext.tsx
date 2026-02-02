import { createContext, ReactNode, useContext, useState } from 'react';

export type Order = {
  id: string;
  store: string;
  items: string[];
  createdAt: number;
  accepted: boolean;
  completed: boolean;
  pickupAddress: string;
  dropoffAddress: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  acceptOrder: (id: string) => void;
  completeOrder: (id: string) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const completeOrder = (id: string) => {
  setOrders(prev =>
    prev.map(order =>
      order.id === id
        ? { ...order, completed: true }
        : order
      )
    );
  };


  const acceptOrder = (id: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, accepted: true }
          : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, acceptOrder, completeOrder }}>
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
