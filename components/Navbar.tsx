'use client'

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLink from './NavLink';
import clsx from "clsx";
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from '@/lib/utils';

import { useCart } from '@/lib/CartContext';

const links = [
    {
        name: 'Productos',
        href: '/#productos',
    },
    {
        name: 'Nosotros',
        href: '/#nosotros',
    },
];

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const pathname = usePathname();

    const { getCartQuantity, getTotal } = useCart();
    const cant = getCartQuantity();
    const total = getTotal();

    return (
        <nav className="sticky top-0 bg-white z-20 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="/logos/logo_dorado.png" height={60} width={120} alt="icon" className='p-1'></Image>
                </Link>
                <div>
                    {/* carrito */}
                    <Link
                        href="/carrito"
                        className="inline-flex items-center p-2 h-10 mr-3 justify-center text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <span className="sr-only">Carrito</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <Badge className='ml-1 bg-gray-500 text-gray-100'>
                            {formatCurrency(total)}
                        </Badge>
                    </Link>
                    {/* menu */}
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 border"
                        aria-controls="navbar-default" aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div
                    className={`w-full md:block md:w-auto transition-all duration-300 ease-in-out ${isMenuOpen ? 'menu-animate-enter' : 'hidden'
                        }`}
                    id="navbar-default"
                >
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white md:items-center">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={clsx(
                                        'block py-2 px-3 rounded text-lg md:rounded-none hover:text-mainRojo-100 md:p-0 border-b-2 border-transparent md:hover:border-b-2 link-underline-md relative',
                                        {
                                            'text-mainRojo-100 bg-mainAzul-100 md:bg-transparent md:text-mainRojo-100': pathname == link.href,
                                            'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent': pathname != link.href,
                                        },
                                    )}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {/* carrito */}
                        <li className='hidden md:block'>
                            <Link
                                href={'/carrito'}
                                className='flex items-center justify-center py-1 px-3 hover:bg-transparent hover:border-mainRojo-100 border border-gray-700 rounded text-md text-gray-700 hover:text-mainRojo-100 shadow hover:shadow-lg'
                            >
                                <span className="relative inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <Badge className='ml-2 bg-gray-500 text-gray-100'>
                                        {formatCurrency(total)}
                                    </Badge>
                                    {/* Aquí puedes reactivar el contador si lo necesitas */}
                                    {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-100 transform translate-x-1/2 -translate-y-1/2 bg-gray-500 rounded-full">0</span> */}
                                </span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}