// app/api/email/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { format } from "date-fns";
import { es } from 'date-fns/locale';

const host = process.env.NEXT_PUBLIC_HOST;

// Helper function to safely convert to number and format
const formatPrice = (price: any): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : Number(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
};

// Email template with beautiful styling
const createEmailTemplate = (data: any, productListHTML: string) => {
    const { name, safeTotal, safeDiscount, finalPrice, pickupPerson, formattedDate, pickupTime, messageClient, session_id } = data;

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Pedido - El Postre</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #2c3e50;
                background-color: #faf8f6;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            }
            .header {
                background: linear-gradient(135deg, #f8f6f4 0%, #f1ede8 100%);
                padding: 40px 30px;
                text-align: center;
                border-bottom: 3px solid #d4af37;
            }
            .logo {
                font-size: 32px;
                font-weight: 300;
                letter-spacing: 4px;
                color: #d4af37;
                margin-bottom: 8px;
                line-height: 1.2;
            }
            .logo .el {
                font-size: 24px;
                display: block;
            }
            .logo .postre {
                font-weight: 400;
            }
            .header-subtitle {
                color: #8b6914;
                font-size: 16px;
                margin: 15px 0 0 0;
                font-weight: 500;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 20px;
                color: #2c3e50;
                margin-bottom: 25px;
                font-weight: 500;
            }
            .confirmation-badge {
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                display: inline-block;
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 25px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .order-summary {
                background-color: #fdfcfb;
                border: 2px solid #f4f1ed;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
            }
            .order-summary h3 {
                color: #2c3e50;
                margin-top: 0;
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .summary-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #f0ebe5;
                font-size: 15px;
            }
            .summary-row:last-child {
                border-bottom: none;
                font-weight: 700;
                font-size: 18px;
                color: #e74c3c;
                padding-top: 15px;
                border-top: 2px solid #f0ebe5;
                margin-top: 10px;
            }
            .pickup-section {
                background: linear-gradient(135deg, #fff9e6 0%, #fef5d4 100%);
                border: 1px solid #f4d03f;
                border-radius: 12px;
                padding: 25px;
                margin: 25px 0;
            }
            .pickup-section h3 {
                color: #8b6914;
                margin-top: 0;
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .pickup-item {
                margin: 12px 0;
                display: flex;
                align-items: flex-start;
                font-size: 15px;
            }
            .pickup-item strong {
                min-width: 120px;
                color: #6c5620;
                font-weight: 600;
            }
            .pickup-item span {
                color: #2c3e50;
            }
            .products-section {
                margin: 30px 0;
            }
            .products-section h3 {
                color: #2c3e50;
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #e74c3c;
            }
            .product-card {
                background-color: #ffffff;
                border: 1px solid #f0ebe5;
                border-radius: 12px;
                padding: 20px;
                margin: 15px 0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                transition: box-shadow 0.2s ease;
            }
            .product-card:hover {
                box-shadow: 0 4px 16px rgba(0,0,0,0.08);
            }
            .product-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;
            }
            .product-name {
                font-weight: 600;
                color: #2c3e50;
                font-size: 16px;
                flex: 1;
            }
            .product-price {
                color: #e74c3c;
                font-weight: 700;
                font-size: 16px;
                background-color: #ffeaa7;
                padding: 6px 12px;
                border-radius: 20px;
                margin-left: 15px;
            }
            .product-details {
                color: #6c757d;
                font-size: 14px;
                line-height: 1.5;
            }
            .product-detail-item {
                margin: 4px 0;
            }
            .message-box {
                background: linear-gradient(135deg, #e8f4fd 0%, #dbeafe 100%);
                border-left: 4px solid #3498db;
                padding: 20px;
                margin: 25px 0;
                border-radius: 0 12px 12px 0;
            }
            .message-box h4 {
                color: #2980b9;
                margin-top: 0;
                font-weight: 600;
                margin-bottom: 10px;
            }
            .message-text {
                font-style: italic;
                color: #34495e;
                line-height: 1.6;
            }
            .cta-section {
                text-align: center;
                margin: 35px 0;
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
                color: white;
                padding: 16px 32px;
                text-decoration: none;
                border-radius: 30px;
                font-weight: 600;
                font-size: 16px;
                box-shadow: 0 4px 16px rgba(231, 76, 60, 0.3);
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
            }
            .footer {
                background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                color: #ecf0f1;
                text-align: center;
                padding: 30px;
            }
            .footer-logo {
                font-size: 24px;
                font-weight: 300;
                letter-spacing: 3px;
                color: #d4af37;
                margin-bottom: 10px;
            }
            .footer p {
                margin: 8px 0;
                font-size: 14px;
                opacity: 0.9;
            }
            .footer-highlight {
                font-weight: 600;
                color: #d4af37;
            }
            .divider {
                height: 2px;
                background: linear-gradient(90deg, transparent 0%, #d4af37 50%, transparent 100%);
                margin: 30px 0;
                border: none;
            }
            
            @media (max-width: 600px) {
                body {
                    padding: 10px;
                }
                .container {
                    border-radius: 12px;
                }
                .content, .header {
                    padding: 25px 20px;
                }
                .order-summary, .pickup-section {
                    padding: 20px;
                }
                .product-header {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .product-price {
                    margin-left: 0;
                    margin-top: 8px;
                    align-self: flex-start;
                }
                .summary-row {
                    font-size: 14px;
                }
                .summary-row:last-child {
                    font-size: 16px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">
                    <span class="el">EL</span>
                    <span class="postre">POSTRE</span>
                </div>
                <div class="header-subtitle">Dulces momentos, sabores únicos</div>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Hola <strong>${name}</strong> 👋
                </div>
                
                <div class="confirmation-badge">
                    ✓ Pedido Confirmado
                </div>
                
                <p style="color: #6c757d; font-size: 16px; margin-bottom: 25px;">
                    ¡Gracias por confiar en nosotros! Hemos recibido tu pedido correctamente y ya estamos preparando todo para ti.
                </p>
                
                <div class="order-summary">
                    <h3>💰 Resumen del Pedido</h3>
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>$${safeTotal} MXN</span>
                    </div>
                    <div class="summary-row">
                        <span>Descuento aplicado:</span>
                        <span>-$${safeDiscount} MXN</span>
                    </div>
                    <div class="summary-row">
                        <span>Total a Pagar:</span>
                        <span>$${finalPrice} MXN</span>
                    </div>
                </div>
                
                <hr class="divider">
                
                <div class="pickup-section">
                    <h3>📅 Información de Entrega</h3>
                    <div class="pickup-item">
                        <strong>Persona:</strong>
                        <span>${pickupPerson || 'No especificado'}</span>
                    </div>
                    <div class="pickup-item">
                        <strong>Fecha:</strong>
                        <span>${formattedDate ? format(new Date(formattedDate), "EEEE d 'de' MMMM, yyyy", { locale: es }) : 'No especificada'}</span>
                    </div>
                    <div class="pickup-item">
                        <strong>Hora:</strong>
                        <span>${pickupTime || 'No especificada'}</span>
                    </div>
                </div>
                
                <div class="products-section">
                    <h3>🛍️ Tus Productos</h3>
                    ${productListHTML}
                </div>
                
                ${messageClient ? `
                <div class="message-box">
                    <h4>💬 Tu Mensaje:</h4>
                    <div class="message-text">"${messageClient}"</div>
                </div>
                ` : ''}
                
                <hr class="divider">
                
                <div class="cta-section">
                    <a href="${host}/success?session_id=${session_id}" class="cta-button">
                        Ver Detalles Completos
                    </a>
                </div>
                
                <p style="color: #8b6914; font-size: 15px; text-align: center; font-style: italic; margin-top: 30px; background-color: #fef9e7; padding: 15px; border-radius: 8px;">
                    💡 <strong>¿Tienes alguna pregunta?</strong><br>
                    No dudes en contactarnos. Estamos aquí para hacer de tu experiencia algo especial.
                </p>
            </div>
            
            <div class="footer">
                <div class="footer-logo">EL POSTRE</div>
                <p><span class="footer-highlight">¡Gracias por elegirnos!</span></p>
                <p>Creando momentos dulces, un postre a la vez</p>
                <p style="font-size: 12px; opacity: 0.7; margin-top: 15px;">
                    Este correo fue enviado como confirmación de tu pedido
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export async function POST(request: NextRequest) {
    const body = await request.json();

    const {
        session_id,
        total,
        discount,
        name,
        email,
        phone,
        pickupPerson,
        formattedDate,
        pickupTime,
        messageClient,
        products,
    } = body;

    // Validate required fields
    if (!email || !name || !products || !Array.isArray(products)) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transport = nodemailer.createTransport({
        // service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    // Generate beautiful product list HTML matching the brand
    const productListHTML = products.map((product: any) => `
        <div class="product-card">
            <div class="product-header">
                <div class="product-name">${product.nombre || 'Producto sin nombre'}</div>
                <div class="product-price">$${formatPrice(product.precio)}</div>
            </div>
            <div class="product-details">
                <div class="product-detail-item">
                    <strong>Tamaño:</strong> ${product.tamanio || 'Estándar'}
                </div>
                <div class="product-detail-item">
                    <strong>Cantidad:</strong> ${product.cantidad || 1} ${(product.cantidad || 1) > 1 ? 'unidades' : 'unidad'}
                </div>
            </div>
        </div>
    `).join('');

    // Safe formatting for totals
    const safeTotal = formatPrice(total);
    const safeDiscount = formatPrice(discount);
    const finalPrice = formatPrice((Number(total) || 0) - (Number(discount) || 0));

    const templateData = {
        name, safeTotal, safeDiscount, finalPrice, pickupPerson,
        formattedDate, pickupTime, messageClient, session_id
    };

    const mailOptions: Mail.Options = {
        from: {
            name: 'El Postre - Confirmación de Pedido',
            address: process.env.MY_EMAIL!
        },
        to: email,
        subject: `🍰 Confirmación de Pedido - El Postre | ${name}`,
        text: `¡Hola ${name}!\n\nTu pedido ha sido confirmado exitosamente.\n\n--- RESUMEN DEL PEDIDO ---\nSubtotal: $${safeTotal} MXN\nDescuento: $${safeDiscount} MXN\nTOTAL FINAL: $${finalPrice} MXN\n\n--- INFORMACIÓN DE ENTREGA ---\nPersona que recoge: ${pickupPerson || 'No especificado'}\nFecha: ${formattedDate ? format(new Date(formattedDate), "EEEE d 'de' MMMM, yyyy", { locale: es }) : 'No especificada'}\nHora: ${pickupTime || 'No especificada'}\n\n--- TUS PRODUCTOS ---\n${products.map((product: any) => `• ${product.nombre || 'Producto'}\n  Tamaño: ${product.tamanio || 'Estándar'}\n  Cantidad: ${product.cantidad || 1}\n  Precio: $${formatPrice(product.precio)}`).join('\n\n')}\n\n${messageClient ? `--- TU MENSAJE ---\n"${messageClient}"\n\n` : ''}¡Gracias por confiar en El Postre!\n\nVer confirmación completa: ${host}/success?session_id=${session_id}\n\n---\nEL POSTRE\nDulces momentos, sabores únicos`,
        html: createEmailTemplate(templateData, productListHTML),
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Correo electrónico enviado');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return NextResponse.json({ message: 'Correo electrónico enviado' });
    } catch (err) {
        console.error('Error sending email:', err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}