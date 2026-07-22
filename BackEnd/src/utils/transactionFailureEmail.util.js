const generateTransactionFailureHtml = (
  name,
  amount,
  fromAccount,
  toAccount,
  reason,
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">

      <div style="background:#dc2626;padding:20px;text-align:center;">
        <h2 style="color:#ffffff;margin:0;">LedgerFlow</h2>
      </div>

      <div style="padding:30px;">
        <h3>Hello ${name},</h3>

        <p>
          We were unable to complete your recent transaction.
        </p>

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
            <td><strong>Status</strong></td>
            <td style="color:#dc2626;"><strong>FAILED</strong></td>
          </tr>

          <tr>
            <td><strong>Reason</strong></td>
            <td>${reason}</td>
          </tr>
        </table>

        <p style="margin-top:30px;">
          No amount has been debited from your account.
        </p>

        <p>
          If you believe this transaction should have succeeded,
          please contact our support team.
        </p>

        <p>
          Regards,<br>
          <strong>LedgerFlow Team</strong>
        </p>

      </div>

    </div>
  `;
};

const generateTransactionFailureText = (
  name,
  amount,
  fromAccount,
  toAccount,
  reason,
) => {
  return `
Hi ${name},

We were unable to complete your recent transaction.

Transaction Details
------------------------------
Amount           : ₹${amount}
From Account     : ${fromAccount}
To Account       : ${toAccount}
Status           : FAILED
Reason           : ${reason}

No amount has been debited from your account.

If you believe this is an error, please contact LedgerFlow Support.

Regards,
LedgerFlow Team
`;
};

module.exports = {
  generateTransactionFailureHtml,
  generateTransactionFailureText,
};
