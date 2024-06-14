// types.ts
export interface OrderItem {
    item_id: string;
    order_id: string;
    product_name: string;
    size: string;
    unit_price: number;
    quantity: number;
}

export interface Order {
    order_id: string;
    client_id: string;
    final_price: number;
    discount_applied: boolean;
    pickup_date: string;
    pickup_hour: string;
    pickup_person_name: string;
    comments: string;
    completed: boolean;
    datetime_ordered: string;
    total: number;
    session_id: string;
    client_name: string;
    client_email: string;
    client_phone: string;
    items: OrderItem[];
}
