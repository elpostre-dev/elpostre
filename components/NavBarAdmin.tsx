// components/NavBarAdmin.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import ReportModal from './ReportModal';

export default function NavBarAdmin() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function openReport() {
        setDropdownOpen(false);
        setReportModalOpen(true);
    }

    return (
        <>
            <nav className="sticky top-0 bg-white z-20 shadow-lg">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src="/logos/logo_dorado.png" height={60} width={120} alt="icon" className='p-1' />
                    </Link>

                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className='flex gap-2 items-center border border-black rounded-lg p-2 hover:bg-gray-50'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <p className='font-semibold uppercase hidden sm:block'>Administrador</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4 hidden sm:block">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30 overflow-hidden">
                                <button
                                    onClick={openReport}
                                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    Generar reporte
                                </button>
                                <div className="border-t border-gray-100" />
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 text-left"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                    </svg>
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <ReportModal open={reportModalOpen} onClose={() => setReportModalOpen(false)} />
        </>
    );
}
