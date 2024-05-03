import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un número a un formato de moneda específico.
 *
 * @param amount - El monto a formatear.
 * @param locale - La localidad para la formateación (ej. 'es-MX').
 * @param currency - El tipo de moneda (ej. 'MXN').
 * @returns El monto formateado como moneda.
 */
export const formatCurrency = (
  amount: number,
  locale: string = 'es-MX',
  currency: string = 'MXN'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};