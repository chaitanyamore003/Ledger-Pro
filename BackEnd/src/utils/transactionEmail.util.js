const generateTransactionHtml = (
  name,
  amount,
  fromAccount,
  toAccount,
  transactionId,
) => {
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Transaction Successful | LEDGER PRO</title>
</head>

<body style="margin:0;padding:40px 16px;background:#F5F5F5;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
max-width:650px;
background:#FFFFFF;
border:1px solid #ECECEC;
border-radius:24px;
overflow:hidden;
">

<!-- Header -->

<tr>
<td
align="center"
style="
padding:56px 40px;
border-bottom:1px solid #EFEFEF;
">

<h1
style="
margin:0;
font-size:42px;
font-weight:800;
letter-spacing:1px;
font-family:Arial,Helvetica,sans-serif;
">

<span style="color:#111111;">LEDGER</span>
<span style="color:#FFBA7D;"> PRO</span>

</h1>

<p
style="
margin:16px 0 0;
font-size:15px;
color:#666666;
line-height:28px;
">
Modern Banking Platform
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:50px 42px;">

<h2
style="
margin:0;
font-size:34px;
font-weight:700;
color:#111111;
">
Transaction Successful
</h2>

<p
style="
margin:26px 0 0;
font-size:17px;
line-height:32px;
color:#555555;
">
Hello <strong>${name}</strong>,
</p>

<p
style="
margin:18px 0 0;
font-size:17px;
line-height:32px;
color:#555555;
">
Your transaction has been completed successfully.
Below are the details of your transaction.
</p>

<!-- Amount Card -->

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin:40px 0;
background:#FFF8F2;
border:2px solid #FFE2C8;
border-radius:20px;
">

<tr>
<td align="center" style="padding:38px;">

<p
style="
margin:0;
font-size:13px;
font-weight:700;
letter-spacing:3px;
text-transform:uppercase;
color:#777777;
">
Amount Transferred
</p>

<p
style="
margin:20px 0 0;
font-size:44px;
font-weight:800;
color:#FFBA7D;
">
₹${amount}
</p>

</td>
</tr>

</table>

<!-- Transaction Details -->

<table
role="presentation"
width="100%"
cellpadding="14"
cellspacing="0"
style="
border:1px solid #EEEEEE;
border-radius:14px;
">

<tr>
<td style="color:#666;font-weight:600;">From Account</td>
<td align="right" style="color:#111;">${fromAccount}</td>
</tr>

<tr>
<td style="color:#666;font-weight:600;">To Account</td>
<td align="right" style="color:#111;">${toAccount}</td>
</tr>

<tr>
<td style="color:#666;font-weight:600;">Transaction ID</td>
<td align="right" style="color:#111;">${transactionId}</td>
</tr>

<tr>
<td style="color:#666;font-weight:600;">Status</td>
<td
align="right"
style="
font-weight:700;
color:#16A34A;
">
SUCCESS
</td>
</tr>

</table>

<!-- Notice -->

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin-top:36px;
background:#FAFAFA;
border-left:4px solid #FFBA7D;
border-radius:12px;
">

<tr>

<td style="padding:24px;">

<p
style="
margin:0;
font-size:18px;
font-weight:700;
color:#111111;
">
Security Notice
</p>

<p
style="
margin:18px 0 0;
font-size:15px;
line-height:30px;
color:#555555;
">

• Keep this email for your transaction records.

<br><br>

• Never share your banking credentials.

<br><br>

• If you don't recognize this transaction, contact support immediately.

</p>

</td>

</tr>

</table>

<p
style="
margin:34px 0 0;
font-size:15px;
line-height:30px;
color:#666666;
">
Thank you for choosing <strong>LEDGER PRO</strong>.
We appreciate your trust in our secure banking platform.
</p>

</td>
</tr>

<!-- Footer -->

<tr>
<td
align="center"
style="
padding:40px;
background:#FAFAFA;
border-top:1px solid #EEEEEE;
">

<p
style="
margin:0;
font-size:28px;
font-weight:800;
">

<span style="color:#111111;">LEDGER</span>

<span style="color:#FFBA7D;"> PRO</span>

</p>

<p
style="
margin:14px 0 0;
font-size:14px;
color:#666666;
">
Modern Banking Platform
</p>

<p
style="
margin:24px 0 0;
font-size:12px;
line-height:22px;
color:#999999;
">
This is an automated transaction confirmation email.<br>
Please do not reply to this message.
</p>

<p
style="
margin:14px 0 0;
font-size:12px;
color:#999999;
">
© ${new Date().getFullYear()} LEDGER PRO. All rights reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>

</html>
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
Hello ${name},

Your transaction has been completed successfully.

Transaction Details
--------------------------------------------------

Amount            : ₹${amount}
From Account      : ${fromAccount}
To Account        : ${toAccount}
Transaction ID    : ${transactionId}
Status            : SUCCESS

--------------------------------------------------

Thank you for choosing LEDGER PRO.

For your security:
• Keep this email for your records.
• Never share your banking credentials or OTP with anyone.
• If you do not recognize this transaction, please contact our support team immediately.

Regards,

LEDGER PRO Team
Modern Banking Platform`;
};

module.exports = {
  generateTransactionHtml,
  generateTransactionText,
};
