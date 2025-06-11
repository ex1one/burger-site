export interface Order {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
}

export interface FeedOrder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "created" | "pending" | "done";
  updatedAt: string;
  _id: string;
}

export interface FeedOrderResponse {
  orders: FeedOrder[];
  success: boolean;
  total: number;
  totalToday: number;
}
