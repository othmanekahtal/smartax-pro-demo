/** Mock invoice detail responses — mirrors GET /invoices/:uuid */

const MOCK_INVOICE_DETAILS = {
  '15dfd6a5-b60e-4e79-ad5f-9a7775988786': {
    uuid: '15dfd6a5-b60e-4e79-ad5f-9a7775988786',
    invoice_number: 'INV-0005',
    status: 'OVERDUE',
    issue_date: '2026-06-23',
    due_date: '2026-06-01',
    payment_terms: 'Net 30',
    reference_number: '1-000-1-000',
    currency: 'MAD',
    subtotal: 1000.00,
    tax_amount: 200.00,
    tax: {
      uuid: '4aa653dc-cdb6-4b0f-921c-3140fa1f2631',
      name: 'TVA 20%',
      rate: 20.00,
      description: null,
      is_default: true,
    },
    total_amount: 1200.00,
    balance: 1200.00,
    customer: 'test customer',
    items: [
      {
        uuid: 'f7e29232-dbfb-497c-a624-519fa91d713c',
        description: 'This is test description',
        quantity: 1.0000,
        unitPrice: 1000.00,
        amount: 1000.00,
        taxAmount: 0.00,
        unitName: null,
      },
    ],
    customer_note: 'NOTE FOR CUSTOMER',
    internal_notes: 'Generated from Revenue entry: This is test description',
    payment_instructions: null,
    payment_method: null,
    payment_reference: null,
  },
};

const STATUS_MAP = {
  'Brouillon': 'DRAFT',
  'Envoyée': 'SENT',
  'Payée': 'PAID',
  'En retard': 'OVERDUE',
};

function lineSubtotal(items) {
  return (items || []).reduce(
    (s, item) => s + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0
  );
}

function buildDetailFromList(row) {
  const items = (row.lineItems || []).map((item, i) => ({
    uuid: item.id || `item-${row.id}-${i}`,
    description: item.description,
    quantity: Number(item.quantity) || 0,
    unitPrice: Number(item.unitPrice) || 0,
    amount: (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    taxAmount: 0,
    unitName: null,
  }));
  const subtotal = lineSubtotal(row.lineItems);
  const taxRate = row.applyTax ? 20 : 0;
  const tax_amount = row.applyTax ? subtotal * 0.2 : 0;
  const total_amount = subtotal + tax_amount;

  return {
    uuid: row.uuid || row.id,
    invoice_number: row.invoiceNumber,
    status: STATUS_MAP[row.status] || row.status,
    issue_date: row.invoiceDate,
    due_date: row.dueDate || null,
    payment_terms: row.paymentTerms || null,
    reference_number: row.referenceNumber || null,
    currency: 'MAD',
    subtotal,
    tax_amount,
    tax: row.applyTax
      ? { uuid: null, name: 'TVA 20%', rate: 20.00, description: null, is_default: true }
      : null,
    total_amount,
    balance: row.status === 'Payée' ? 0 : total_amount,
    customer: row.customer,
    items,
    customer_note: row.notesToCustomer || null,
    internal_notes: row.internalNotes || null,
    payment_instructions: null,
    payment_method: null,
    payment_reference: null,
  };
}

/** Simulates GET /invoices/:uuid */
export function getMockInvoiceDetail(listRow) {
  const uuid = listRow.uuid || listRow.id;
  return MOCK_INVOICE_DETAILS[uuid] ?? buildDetailFromList(listRow);
}
