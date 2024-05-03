'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Variacion {
    tamanio: string;
    precio: number;
    personas: string;
}

interface CartItem {
    productId: number;
    nombre: string;
    cantidad: number;
    photo: string;
    variacion: Variacion;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    getCartQuantity: () => number;
    getCart: () => CartItem[];
    emptyCart: () => void;
    editCartItem: (productId: number, tamanio: string, changes: Partial<CartItem>) => void;
    removeCartItem: (productId: number, tamanio: string) => void;
    getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(loadedCart);
    }, []);

    const addToCart = (item: CartItem) => {
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(i =>
            i.productId === item.productId && i.variacion.tamanio === item.variacion.tamanio
        );
        if (existingItemIndex > -1) {
            updatedCart[existingItemIndex].cantidad += item.cantidad;
        } else {
            updatedCart.push(item);
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0);
    };

    const getCart = () => {
        return cart;
    };

    const emptyCart = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
    };

    const editCartItem = (productId: number, tamanio: string, changes: Partial<CartItem>) => {
        let updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(i => i.productId === productId && i.variacion.tamanio === tamanio);
        if (itemIndex > -1) {
            updatedCart[itemIndex] = { ...updatedCart[itemIndex], ...changes };
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const removeCartItem = (productId: number, tamanio: string) => {
        let updatedCart = cart.filter(i => !(i.productId === productId && i.variacion.tamanio === tamanio));
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + item.cantidad * item.variacion.precio, 0);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, getCartQuantity, getCart, emptyCart, editCartItem, removeCartItem, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
