import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [ 
    {    
    id: { type: String, required: true },
    date_created: { type: Date },
    date_closed: { type: Date },
    last_updated: { type: Date },
    manufacturing_ending_date: { type: Date },
    feedback: {
        sale: { type: String, required: true },
        purchase: { type: String, required: true },
    },
    comment: { type: String, required: true },
    pack_id: { type: String, required: true },
    pickup_id: { type: String, required: true },
    order_request: {
        return: { type: String, required: true },
        change: { type: String, required: true },
    },
    fulfilled: { type: String, required: true },
    mediations: [],
    total_amount: { type: String, required: true },
    paid_amount: { type: String, required: true },
    coupon: {
        id: { type: String, required: true },
        amount: { type: String, required: true },
    },
    expiration_date: { type: Date },
    order_items:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
    ],
    currency_id: { type: String, required: true },
    payments: [
        {
            id: { type: String, required: true },
            order_id: { type: String, required: true },
            payer_id: { type: String, required: true },
            collector: {
                id: { type: String, required: true },
            },
            card_id: { type: String, required: true },
            site_id: { type: String, required: true },
            reason: { type: String, required: true },
            payment_method_id: debvisa,
            currency_id: { type: String, required: true },
            installments: 1,
            issuer_id: { type: String, required: true },
            atm_transfer_reference: {
                company_id: { type: String, required: true },
                transaction_id: { type: String, required: true },
            },
            coupon_id: { type: String, required: true },
            activation_uri: { type: String, required: true },
            operation_type: { type: String, required: true },
            payment_type: { type: String, required: true },
            available_actions: [
                refund
            ],
            status: { type: String, required: true },
            status_code: { type: String, required: true },
            status_detail: { type: String, required: true },
            transaction_amount: { type: String, required: true },
            taxes_amount: { type: String, required: true },
            shipping_cost: { type: String, required: true },
            coupon_amount: { type: String, required: true },
            overpaid_amount: { type: String, required: true },
            total_paid_amount: { type: String, required: true },
            installment_amount: { type: String, required: true },
            deferred_period: { type: String, required: true },
            date_approved:  { type: Date },
            authorization_code: { type: String, required: true },
            transaction_order_id: { type: String, required: true },
            date_created:  { type: Date },
            date_last_modified:  { type: Date },
        }
    ],
    shipping: {
        id: String,
    },
    status: { type: String, required: true },
    status_detail: { type: String, required: true },
    tags: [
        not_delivered,
        paid
    ],
    buyer: {
        id: { type: String, required: true },
        nickname: { type: String, required: true },
        email: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
    },
    seller: {
        id: { type: String, required: true },
        nickname: { type: String, required: true },
        email: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        phone: {
            extension: { type: String, required: true },
            area_code: { type: String, required: true },
            number: { type: String, required: true },
            verified: { type: Boolean, default: false },
  
        },
        alternative_phone: {
            area_code: { type: String, required: true },
            extension: { type: String, required: true },
            number: { type: String, required: true },
        }
    },
    taxes: {
        amount: { type: String, required: true },
        currency_id: { type: String, required: true },
    }
}
);
const Order = mongoose.model('Order', orderSchema);
export default Order;