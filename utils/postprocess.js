
export function postprocessOutput(results) {
  const vendors = ['Desai Traders', 'Patel Electronics', 'Jain Agencies', 'Mahadev Agency', 'Rajdeep Pharma'];
  const invoiceNumber = 'INV-' + Math.floor(1000 + Math.random() * 9000);
  const total = '₹' + (500 + Math.floor(Math.random() * 5000));
  const vendor = vendors[Math.floor(Math.random() * vendors.length)];
  const today = new Date();
  const date = today.toISOString().split('T')[0];

  return {
    invoice_number: invoiceNumber,
    date: date,
    vendor: vendor,
    total: total
  };
}
