const generateTransactionHtml = (
  name,
  amount,
  fromAccount,
  toAccount,
  transactionId,
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">

      <div style="background:#1e293b;padding:20px;text-align:center;">
        <h2 style="color:#ffffff;margin:0;">LedgerFlow</h2>
      </div>

      <div style="padding:30px;">
        <h3>Hello ${name},</h3>

        <p>Your transaction has been completed successfully.</p>

        <table style="width:100%;border-collapse:collapse;margin-top:20px;">
          <tr>
            <td><strong>Amount</strong></td>
            <td>₹${amount}</td>
          </tr>

          <tr>
            <td><strong>From Account</strong></td>
            <td>${fromAccount}</td>
          </tr>

          <tr>
            <td><strong>To Account</strong></td>
            <td>${toAccount}</td>
          </tr>

          <tr>
            <td><strong>Transaction ID</strong></td>
            <td>${transactionId}</td>
          </tr>

          <tr>
            <td><strong>Status</strong></td>
            <td style="color:green;"><strong>SUCCESS</strong></td>
          </tr>
        </table>

        <p style="margin-top:30px;">
          Thank you for choosing <strong>LedgerFlow</strong>.
        </p>

        <p>
          If you did not authorize this transaction, please contact our support team immediately.
        </p>

        <p>
          Regards,<br>
          <strong>LedgerFlow Team</strong>
        </p>
      </div>

    </div>
  `;
};

const generateTransactionText = (
  name,
  amount,
  fromAccount,
  toAccount,
  transactionId,
) => {
  return `
Hi ${name},

Your transaction has been completed successfully.

Transaction Details
------------------------------
Amount           : ₹${amount}
From Account     : ${fromAccount}
To Account       : ${toAccount}
Transaction ID   : ${transactionId}
Status           : SUCCESS

Thank you for choosing LedgerFlow.

If you did not authorize this transaction, please contact our support team immediately.

Regards,
LedgerFlow Team
`;
};

module.exports = {
  generateTransactionHtml,
  generateTransactionText,
};
