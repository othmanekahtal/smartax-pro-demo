/** Mock revenue detail responses — mirrors GET /revenues/:uuid */

const MOCK_REVENUE_DETAILS = {
  '658b137e-df74-4cb3-9baf-01c866946c80': {
    uuid: '658b137e-df74-4cb3-9baf-01c866946c80',
    created_at: '2026-06-23T01:14:11.408074',
    revenue_date: '2026-06-23',
    amount: 1000.00,
    customer_uuid: '2135ab3a-cd8f-4375-bcd5-19a892edc5fd',
    description: 'This is test description',
    payment_method_uuid: 'f4e4f0f3-4582-4087-b317-c6ac93a9d44f',
    status_uuid: '0b09c556-4dfe-4753-9b5c-de2cba86ae2b',
    source_uuid: '10572755-4786-4538-8793-3516df969972',
    reference_number: '1-000-1-000',
    create_invoice: true,
    invoice_number: 'INV-0005',
    invoice_uuid: '15dfd6a5-b60e-4e79-ad5f-9a7775988786',
    due_date: '2026-06-01',
    payment_term: 'Net 30',
    customer_note: 'NOTE FOR CUSTOMER',
    tax: {
      uuid: '4aa653dc-cdb6-4b0f-921c-3140fa1f2631',
      name: 'TVA 20%',
      rate: 20.00,
      description: null,
      is_default: true,
    },
    customer: 'test customer',
    source: 'sool',
    status: 'PAID',
    payment_method: 'CHECK',
    tags: [
      {
        uuid: '1dc76bbd-6c04-4c97-aedf-483844816362',
        name: 'hello world',
        color: '#64e8cd',
      },
    ],
  },
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890': {
    uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    created_at: '2026-06-12T09:30:00.000000',
    revenue_date: '2026-06-12',
    amount: 85000.00,
    customer_uuid: '2135ab3a-cd8f-4375-bcd5-19a892edc5fd',
    description: 'Développement module comptabilité — phase 2',
    payment_method_uuid: 'f4e4f0f3-4582-4087-b317-c6ac93a9d44f',
    status_uuid: '0b09c556-4dfe-4753-9b5c-de2cba86ae2b',
    source_uuid: '10572755-4786-4538-8793-3516df969972',
    reference_number: 'PO-ATS-2026-042',
    create_invoice: true,
    invoice_number: 'FAC-2026-0142',
    invoice_uuid: '15dfd6a5-b60e-4e79-ad5f-9a7775988786',
    due_date: '2026-07-12',
    payment_term: 'Net 30',
    customer_note: '',
    tax: {
      uuid: '4aa653dc-cdb6-4b0f-921c-3140fa1f2631',
      name: 'TVA 20%',
      rate: 20.00,
      description: null,
      is_default: true,
    },
    customer: 'Atlas Tech Solutions',
    source: 'Prestation de services',
    status: 'PAID',
    payment_method: 'BANK_TRANSFER',
    tags: [
      { uuid: 't1', name: 'projet', color: '#64748b' },
      { uuid: 't2', name: 'recurrent', color: '#94a3b8' },
    ],
  },
  'b2c3d4e5-f6a7-8901-bcde-f12345678901': {
    uuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    created_at: '2026-06-08T14:22:00.000000',
    revenue_date: '2026-06-08',
    amount: 42000.00,
    customer_uuid: '3135ab3a-cd8f-4375-bcd5-19a892edc5fd',
    description: 'Fourniture équipements de bureau — lot Q2',
    payment_method_uuid: 'a4e4f0f3-4582-4087-b317-c6ac93a9d44f',
    status_uuid: '1b09c556-4dfe-4753-9b5c-de2cba86ae2b',
    source_uuid: '20572755-4786-4538-8793-3516df969972',
    reference_number: 'BC-MCP-0891',
    create_invoice: true,
    invoice_number: 'FAC-2026-0138',
    invoice_uuid: '25dfd6a5-b60e-4e79-ad5f-9a7775988786',
    due_date: '2026-07-08',
    payment_term: 'Net 30',
    customer_note: 'Merci pour votre confiance.',
    tax: {
      uuid: '4aa653dc-cdb6-4b0f-921c-3140fa1f2631',
      name: 'TVA 20%',
      rate: 20.00,
      description: null,
      is_default: true,
    },
    customer: 'MediCare Pharma',
    source: 'Vente de produits',
    status: 'INVOICED',
    payment_method: 'CHECK',
    tags: [
      { uuid: 't3', name: 'equipement', color: '#64748b' },
    ],
  },
};

const STATUS_MAP = { 'Reçu': 'PAID', 'Facturé': 'INVOICED', 'Attendu': 'EXPECTED' };
const PAYMENT_MAP = {
  'Virement bancaire': 'BANK_TRANSFER',
  'Chèque': 'CHECK',
  'Espèces': 'CASH',
  'Carte bancaire': 'CARD',
  'Prélèvement automatique': 'DIRECT_DEBIT',
};

function buildDetailFromList(row) {
  return {
    uuid: row.uuid || row.id,
    created_at: `${row.date || '2026-06-01'}T10:00:00.000000`,
    revenue_date: row.date,
    amount: Number(row.amount) || 0,
    customer_uuid: null,
    description: row.description || null,
    payment_method_uuid: null,
    status_uuid: null,
    source_uuid: null,
    reference_number: row.referenceNumber || null,
    create_invoice: row.createInvoice ?? false,
    invoice_number: row.invoiceNumber || null,
    invoice_uuid: row.createInvoice ? '00000000-0000-0000-0000-000000000001' : null,
    due_date: row.dueDate || null,
    payment_term: row.paymentTerms || null,
    customer_note: row.notesToCustomer || null,
    tax: row.applyTax
      ? { uuid: null, name: 'TVA 20%', rate: 20.00, description: null, is_default: true }
      : null,
    customer: row.customer,
    source: row.source,
    status: STATUS_MAP[row.status] || row.status,
    payment_method: PAYMENT_MAP[row.paymentMethod] || row.paymentMethod,
    tags: (row.tags || []).map((name, i) => ({
      uuid: `tag-${row.id}-${i}`,
      name,
      color: '#94a3b8',
    })),
  };
}

/** Simulates GET /revenues/:uuid */
export function getMockRevenueDetail(listRow) {
  const uuid = listRow.uuid || listRow.id;
  return MOCK_REVENUE_DETAILS[uuid] ?? buildDetailFromList(listRow);
}
