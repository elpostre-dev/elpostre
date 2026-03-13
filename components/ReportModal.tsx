'use client';

import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReportOrderItem {
    product_name: string;
    size: string;
    quantity: number;
    unit_price: number;
}

interface ReportOrder {
    order_id: string;
    client_name: string;
    datetime_ordered: string;
    final_price: number;
    items: ReportOrderItem[];
}

interface MonthlyRow {
    month: string;        // "YYYY-MM"
    order_count: number;
    revenue: number;
    products_sold: number;
}

interface GlobalStats {
    totals: {
        total_orders: number;
        total_revenue: number;
        total_products_sold: number;
    };
    monthly: MonthlyRow[];
}

interface ReportModalProps {
    open: boolean;
    onClose: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const MONTHS_SHORT = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const TODAY_STR = new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
const SITE_URL = 'www.elpostre.com.mx';

// ─── Shared header ────────────────────────────────────────────────────────────
// Returns the y position right after the header block.

function drawPDFHeader(doc: jsPDF, reportTitle: string, subtitle: string): number {
    const PAGE_W = 210;
    const BANNER_H = 38;

    // Dark banner background
    doc.setFillColor(20, 20, 20);
    doc.rect(0, 0, PAGE_W, BANNER_H, 'F');

    // Thin gold accent line at bottom of banner
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(0.8);
    doc.line(0, BANNER_H, PAGE_W, BANNER_H);

    // Company name – large white
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('PASTELERIA EL POSTRE', PAGE_W / 2, 13, { align: 'center' });

    // Tagline – small light gray
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(180, 180, 180);
    doc.text('Postres de alta calidad', PAGE_W / 2, 19, { align: 'center' });

    // Website URL – gold
    doc.setFontSize(8);
    doc.setTextColor(180, 140, 60);
    doc.text(SITE_URL, PAGE_W / 2, 25, { align: 'center' });

    // Report title – white, slightly smaller
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(reportTitle.toUpperCase(), PAGE_W / 2, 33, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Subtitle row (date range / generation date)
    const INFO_Y = BANNER_H + 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(subtitle, 14, INFO_Y);
    doc.text(`Generado el ${TODAY_STR}`, 196, INFO_Y, { align: 'right' });

    // Disclaimer line
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text(
        `Este reporte incluye únicamente órdenes realizadas a través de ${SITE_URL}`,
        PAGE_W / 2, INFO_Y + 5, { align: 'center' }
    );

    // Divider
    doc.setDrawColor(180, 140, 60);
    doc.setLineWidth(0.4);
    doc.line(14, INFO_Y + 8, 196, INFO_Y + 8);

    doc.setTextColor(0, 0, 0);
    return INFO_Y + 14; // content starts here
}

// ─── Monthly PDF ──────────────────────────────────────────────────────────────

function generateMonthlyPDF(orders: ReportOrder[], startDate: string, endDate: string) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    let yPos = drawPDFHeader(
        doc,
        'Reporte Mensual de Ventas',
        `Período: ${startDate} al ${endDate}`
    );
    let grandTotal = 0;

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        if (yPos > 255) {
            doc.addPage();
            yPos = drawPDFHeader(doc, 'Reporte Mensual de Ventas', `Período: ${startDate} al ${endDate}`);
        }

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Orden #${order.order_id.substring(0, 8).toUpperCase()}`, 14, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(`Cliente: ${order.client_name}`, 14, yPos + 5);
        doc.text(`Fecha de pedido: ${order.datetime_ordered}`, 14, yPos + 10);
        yPos += 14;

        autoTable(doc, {
            startY: yPos,
            head: [['Producto', 'Talla/Tamaño', 'Cant.', 'Precio Unit.', 'Subtotal']],
            body: order.items.map((item) => [
                item.product_name,
                item.size,
                item.quantity,
                `$${Number(item.unit_price).toFixed(2)}`,
                `$${(item.quantity * Number(item.unit_price)).toFixed(2)}`,
            ]),
            foot: [[
                { content: 'Total de la orden:', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: `$${Number(order.final_price).toFixed(2)}`, styles: { fontStyle: 'bold' } },
            ]],
            margin: { left: 14, right: 14 },
            styles: { fontSize: 9, cellPadding: 2 },
            headStyles: { fillColor: [30, 30, 30], textColor: [255, 255, 255] },
            footStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0] },
            columnStyles: {
                0: { cellWidth: 65 },
                1: { cellWidth: 40 },
                2: { cellWidth: 15, halign: 'center' },
                3: { cellWidth: 30, halign: 'right' },
                4: { cellWidth: 30, halign: 'right' },
            },
        });

        yPos = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
        grandTotal += Number(order.final_price);

        if (i < orders.length - 1) {
            if (yPos > 258) {
                doc.addPage();
                yPos = drawPDFHeader(doc, 'Reporte Mensual de Ventas', `Período: ${startDate} al ${endDate}`);
            } else {
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.3);
                doc.line(14, yPos - 5, 196, yPos - 5);
            }
        }
    }

    if (yPos > 265) {
        doc.addPage();
        yPos = drawPDFHeader(doc, 'Reporte Mensual de Ventas', `Período: ${startDate} al ${endDate}`);
    }

    doc.setLineWidth(0.8);
    doc.line(14, yPos, 196, yPos);
    yPos += 7;

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL GENERAL DEL PERÍODO:', 14, yPos);
    doc.text(`$${grandTotal.toFixed(2)}`, 196, yPos, { align: 'right' });

    doc.save(`reporte-mensual-${startDate}-${endDate}.pdf`);
}

// ─── Global PDF ───────────────────────────────────────────────────────────────

function drawBarChart(doc: jsPDF, monthlyData: MonthlyRow[], startY: number) {
    // Use last 12 months (or all if fewer)
    const last12 = monthlyData.slice(-12);
    const n = last12.length;
    if (n === 0) return startY;

    const LEFT = 24;       // left margin (space for y-axis labels)
    const RIGHT = 196;
    const CHART_W = RIGHT - LEFT;
    const CHART_H = 55;    // chart height in mm
    const BOTTOM = startY + CHART_H;

    const maxRevenue = Math.max(...last12.map((r) => Number(r.revenue)));
    if (maxRevenue === 0) return startY;

    const barW = (CHART_W / n) * 0.6;
    const gap = CHART_W / n;

    // Y-axis gridlines & labels (4 gridlines)
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.2);
    for (let i = 0; i <= 4; i++) {
        const y = BOTTOM - (CHART_H * i) / 4;
        doc.line(LEFT, y, RIGHT, y);
        const label = `$${((maxRevenue * i) / 4 / 1000).toFixed(0)}k`;
        doc.text(label, LEFT - 2, y + 1, { align: 'right' });
    }

    // Bars
    doc.setFillColor(40, 40, 40);
    last12.forEach((row, idx) => {
        const revenue = Number(row.revenue);
        const barH = (revenue / maxRevenue) * CHART_H;
        const x = LEFT + idx * gap + (gap - barW) / 2;
        const y = BOTTOM - barH;

        // Bar
        doc.setFillColor(40, 40, 40);
        doc.rect(x, y, barW, barH, 'F');

        // Revenue label above bar
        doc.setFontSize(6);
        doc.setFont('helvetica', 'bold');
        const label = `$${(revenue / 1000).toFixed(1)}k`;
        doc.text(label, x + barW / 2, y - 1.5, { align: 'center' });

        // Month label below bar
        const [, mm] = row.month.split('-');
        const monthLabel = MONTHS_SHORT[Number(mm) - 1];
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.text(monthLabel, x + barW / 2, BOTTOM + 4, { align: 'center' });

        // Year label (only show on January or first bar)
        if (mm === '01' || idx === 0) {
            const [yyyy] = row.month.split('-');
            doc.setFontSize(6);
            doc.text(yyyy, x + barW / 2, BOTTOM + 8, { align: 'center' });
        }
    });

    // Axis lines
    doc.setDrawColor(80, 80, 80);
    doc.setLineWidth(0.4);
    doc.line(LEFT, startY, LEFT, BOTTOM);       // y-axis
    doc.line(LEFT, BOTTOM, RIGHT, BOTTOM);       // x-axis

    return BOTTOM + 14;
}

function generateGlobalPDF(stats: GlobalStats) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const { totals, monthly } = stats;
    const numMonths = monthly.length || 1;

    const avgOrders = (totals.total_orders / numMonths).toFixed(1);
    const avgRevenue = (Number(totals.total_revenue) / numMonths).toFixed(2);
    const avgProducts = (totals.total_products_sold / numMonths).toFixed(1);

    let y = drawPDFHeader(
        doc,
        'Reporte Global de Ventas',
        'Historial completo de órdenes'
    );

    // ── Summary stats block ──
    const statBoxes = [
        { label: 'Total de Órdenes', value: totals.total_orders.toLocaleString('es-MX') },
        { label: 'Ingresos Totales', value: `$${Number(totals.total_revenue).toFixed(2)}` },
        { label: 'Productos Vendidos', value: totals.total_products_sold.toLocaleString('es-MX') },
    ];
    const boxW = (196 - 14) / 3;
    statBoxes.forEach((box, i) => {
        const x = 14 + i * boxW;
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(x, y, boxW - 2, 22, 2, 2, 'F');
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(box.label, x + (boxW - 2) / 2, y + 7, { align: 'center' });
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(box.value, x + (boxW - 2) / 2, y + 17, { align: 'center' });
    });

    y += 28;

    // ── Averages per month ──
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Promedios por mes', 14, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Órdenes: ${avgOrders}   ·   Ingresos: $${avgRevenue}   ·   Productos vendidos: ${avgProducts}`, 14, y);
    y += 8;

    // ── Bar chart: last 12 months revenue ──
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Ingresos por mes (últimos 12 meses)', 14, y);
    y += 4;
    y = drawBarChart(doc, monthly, y) as number;

    // ── Monthly breakdown table ──
    if (y > 220) {
        doc.addPage();
        y = drawPDFHeader(doc, 'Reporte Global de Ventas', 'Historial completo de órdenes');
    }

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalle mensual (historial completo)', 14, y);
    y += 4;

    autoTable(doc, {
        startY: y,
        head: [['Mes', 'Órdenes', 'Ingresos', 'Productos Vendidos']],
        body: monthly.map((row) => {
            const [yyyy, mm] = row.month.split('-');
            return [
                `${MONTHS[Number(mm) - 1]} ${yyyy}`,
                row.order_count.toLocaleString('es-MX'),
                `$${Number(row.revenue).toFixed(2)}`,
                row.products_sold.toLocaleString('es-MX'),
            ];
        }),
        foot: [[
            { content: 'TOTALES', styles: { fontStyle: 'bold' } },
            { content: totals.total_orders.toLocaleString('es-MX'), styles: { fontStyle: 'bold' } },
            { content: `$${Number(totals.total_revenue).toFixed(2)}`, styles: { fontStyle: 'bold' } },
            { content: totals.total_products_sold.toLocaleString('es-MX'), styles: { fontStyle: 'bold' } },
        ]],
        margin: { left: 14, right: 14 },
        styles: { fontSize: 9, cellPadding: 2 },
        headStyles: { fillColor: [30, 30, 30], textColor: [255, 255, 255] },
        footStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0] },
        columnStyles: {
            0: { cellWidth: 60 },
            1: { cellWidth: 35, halign: 'center' },
            2: { cellWidth: 50, halign: 'right' },
            3: { cellWidth: 40, halign: 'center' },
        },
    });

    doc.save('reporte-global-elpostre.pdf');
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function ReportModal({ open, onClose }: ReportModalProps) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const [reportType, setReportType] = useState<'monthly' | 'global'>('monthly');
    const [minYear, setMinYear] = useState<number>(currentYear);
    const [minMonth, setMinMonth] = useState<number>(1);
    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Fetch earliest order date when modal opens
    useEffect(() => {
        if (!open) return;
        fetch('/api/admin/generate-report')
            .then((r) => r.json())
            .then((data: { minDate: string | null }) => {
                if (data.minDate) {
                    const [y, m] = data.minDate.split('-').map(Number);
                    setMinYear(y);
                    setMinMonth(m);
                }
            })
            .catch(() => {/* keep defaults */ });
    }, [open]);

    // Auto-populate start/end dates from month/year selection
    useEffect(() => {
        const firstDay = new Date(selectedYear, selectedMonth - 1, 1);
        const lastDay = new Date(selectedYear, selectedMonth, 0);
        const fmt = (d: Date) => d.toISOString().split('T')[0];
        setStartDate(fmt(firstDay));
        setEndDate(fmt(lastDay));
    }, [selectedMonth, selectedYear]);

    const availableYears = Array.from(
        { length: currentYear - minYear + 1 },
        (_, i) => minYear + i
    );

    function isMonthDisabled(month: number, year: number): boolean {
        if (year < minYear || (year === minYear && month < minMonth)) return true;
        if (year > currentYear || (year === currentYear && month > currentMonth)) return true;
        return false;
    }

    function handleYearChange(year: number) {
        setSelectedYear(year);
        if (year === minYear && selectedMonth < minMonth) setSelectedMonth(minMonth);
        if (year === currentYear && selectedMonth > currentMonth) setSelectedMonth(currentMonth);
    }

    function handleClose() {
        setPassword('');
        setError('');
        onClose();
    }

    function switchType(t: 'monthly' | 'global') {
        setReportType(t);
        setError('');
    }

    async function handleGenerate() {
        if (!password) {
            setError('Ingresa la contraseña para continuar.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const body = reportType === 'global'
                ? { type: 'global', password }
                : { type: 'monthly', startDate, endDate, password };

            const res = await fetch('/api/admin/generate-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.status === 401) { setError('Sesión expirada. Vuelve a iniciar sesión.'); return; }
            if (res.status === 403) { setError('Contraseña incorrecta.'); return; }
            if (!res.ok) { setError('Error al generar el reporte. Intenta de nuevo.'); return; }

            if (reportType === 'global') {
                const stats: GlobalStats = await res.json();
                if (stats.totals.total_orders === 0) {
                    setError('No hay órdenes en el historial.');
                    return;
                }
                generateGlobalPDF(stats);
            } else {
                const orders: ReportOrder[] = await res.json();
                if (orders.length === 0) {
                    setError('No hay órdenes en ese período.');
                    return;
                }
                generateMonthlyPDF(orders, startDate, endDate);
            }

            handleClose();
        } catch {
            setError('Error de conexión. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Generar Reporte de Ventas</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-2">
                    {/* Type toggle */}
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm font-medium">
                        <button
                            onClick={() => switchType('monthly')}
                            className={`flex-1 py-2 transition-colors ${reportType === 'monthly'
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            Mensual
                        </button>
                        <button
                            onClick={() => switchType('global')}
                            className={`flex-1 py-2 transition-colors ${reportType === 'global'
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            Global
                        </button>
                    </div>

                    {/* Monthly-only controls */}
                    {reportType === 'monthly' && (
                        <>
                            <div className="flex gap-3">
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium text-gray-700">Mes</label>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        {MONTHS.map((m, idx) => {
                                            const month = idx + 1;
                                            return (
                                                <option key={month} value={month} disabled={isMonthDisabled(month, selectedYear)}>
                                                    {m}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium text-gray-700">Año</label>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => handleYearChange(Number(e.target.value))}
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    >
                                        {availableYears.map((y) => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium text-gray-700">Fecha inicio</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        readOnly
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label className="text-sm font-medium text-gray-700">Fecha fin</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        readOnly
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Global description */}
                    {reportType === 'global' && (
                        <p className="text-sm text-gray-500 bg-gray-50 rounded-md px-3 py-2">
                            Incluye todas las órdenes del historial: totales, promedios por mes, desglose mensual y gráfica de ingresos.
                        </p>
                    )}

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            placeholder="Ingresa la contraseña"
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate(); }}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm hover:bg-gray-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Generando...
                            </>
                        ) : 'Generar Reporte'}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
