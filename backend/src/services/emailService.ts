import { Resend } from 'resend';
import dotenv from 'dotenv';
import { IProduct } from '../models/Product';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
    product: IProduct;
    quantity: number;
    price: number;
    variant?: {
        attributes: Map<string, string>;
    };
}

interface OrderData {
    _id: string;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        address: {
            line1: string;
            city: string;
            postal_code: string;
        }
    };
    items: OrderItem[];
    totalAmount: number;
}

export const sendOrderConfirmation = async (order: any) => {
    try {
        console.log(`[EMAIL] Sending confirmation to ${order.customer.email}`);

        const { data, error } = await resend.emails.send({
            from: 'Elegant Impressions <orders@elegantimpressions.com>', // Update with verified domain
            to: [order.customer.email],
            subject: `Order Confirmation #${order._id}`,
            html: `
                <h1>Thank you for your order, ${order.customer.firstName}!</h1>
                <p>We have received your order and it is being processed.</p>
                <h2>Order Summary</h2>
                <ul>
                    ${order.items.map((item: any) => `
                        <li>
                            ${item.product.name} x ${item.quantity} - £${item.price.toFixed(2)}
                            ${item.variant ? `<br><small>${Array.from(item.variant.attributes || []).map(([k, v]: any) => `${k}: ${v}`).join(', ')}</small>` : ''}
                        </li>
                    `).join('')}
                </ul>
                <p><strong>Total: £${order.totalAmount.toFixed(2)}</strong></p>
                <p>Shipping to: ${order.customer.address.line1}, ${order.customer.address.city}</p>
            `,
        });

        if (error) {
            console.error('[EMAIL] Resend Error:', error);
        } else {
            console.log('[EMAIL] Sent successfully:', data);
        }
    } catch (err) {
        console.error('[EMAIL] Exception:', err);
    }
};

export const sendAdminNewOrderAlert = async (order: any) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@elegantimpressions.com';
        await resend.emails.send({
            from: 'Elegant Impressions system <system@elegantimpressions.com>',
            to: [adminEmail],
            subject: `New Order Received #${order._id}`,
            html: `
                <h1>New Order Received</h1>
                <p>Customer: ${order.customer.firstName} ${order.customer.lastName} (${order.customer.email})</p>
                <p>Total: £${order.totalAmount.toFixed(2)}</p>
                <a href="https://admin.elegantimpressions.com/orders/${order._id}">View Order</a>
            `
        });
    } catch (err) {
        console.error('[EMAIL] Admin Alert Error:', err);
    }
};

export const sendContactFormEmail = async (data: { name: string; email: string; phone: string; service: string; message: string }) => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@elegantimpressions.com';
        await resend.emails.send({
            from: 'Elegant Impressions Contact <contact@elegantimpressions.com>',
            to: [adminEmail],
            replyTo: data.email,
            subject: `New Contact Form Submission: ${data.service}`,
            html: `
                <h1>New Contact Form Submission</h1>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Desired Service:</strong> ${data.service}</p>
                <h2>Message:</h2>
                <p>${data.message}</p>
            `
        });
        console.log(`[EMAIL] Sent contact form from ${data.email}`);
    } catch (err) {
        console.error('[EMAIL] Contact Form Error:', err);
        throw err;
    }
};
