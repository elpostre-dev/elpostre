'use client'

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLink from './NavLink';
import clsx from "clsx";
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from '@/lib/utils';

export default function NavBarAdmin() {

    return (
        <nav className="sticky top-0 bg-white z-20 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="/logos/logo_dorado.png" height={60} width={120} alt="icon" className='p-1'></Image>
                </Link>
                <div className='flex gap-2 border-2 rounded-lg p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    <p className='font-semibold uppercase'>Administrador</p>
                </div>
            </div>
        </nav>
    );
}