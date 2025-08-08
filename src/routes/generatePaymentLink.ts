import { Request, Response } from 'express';
import axios from 'axios';

export const generatePaymentLink = async (req: Request, res: Response) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.XENDIT_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'XENDIT_API_KEY not set' });
  }

  const body = JSON.parse(req.body || '{}');
  const { external_id, payer_email, description, amount, customer } = body;

  if (!external_id || !payer_email || !description || !amount) {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const invoicePayload = {
      external_id,
      payer_email,
      description,
      amount,
      customer: {
        given_names: customer.given_names,
        surname: customer.surname,
        email: customer.email,
        mobile_number: customer.mobile_number,
        addresses: [
          {
            city: customer.city,
            country: customer.country,
            postal_code: customer.postal_code,
            state: customer.province,
            street_line1: customer.street_line1,
            street_line2: customer.street_line2,
          },
        ],
      },
    };

    const response = await axios.post(
      'https://api.xendit.co/v2/invoices',
      invoicePayload,
      {
        auth: {
          username: apiKey,
          password: '',
        },
      },
    );

    return res.status(200).json({
      invoice: {
        id: response.data.id,
        expiry_date: response.data.expiry_date,
        invoice_url: response.data.invoice_url,
      },
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error?.response?.data || error.message });
  }
};
