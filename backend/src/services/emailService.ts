export const sendOrderConfirmation = async (order: any) => {
    console.log(`[EMAIL SERVICE] Sending Order Confirmation to ${order.customer.email} for Order ${order._id}`);
    // Future: Integrate SendGrid/Nodemailer here
};

export const sendAdminNewOrderAlert = async (order: any) => {
    console.log(`[EMAIL SERVICE] Sending New Order Alert to Admin for Order ${order._id}`);
    // Future: Integrate Admin Email Alert
};
