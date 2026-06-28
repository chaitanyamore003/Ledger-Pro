function RegistrationText(name) {
  return `
Hello ${name},

Welcome to LedgerFlow!

Your account has been successfully created.

You can now securely access the Bank Ledger Management System.

Thank you,
LedgerFlow Team
`;
}

function generateRegistrationHtml(name) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to LedgerFlow</title>
</head>

<body style="margin:0;padding:0;background:#F1F5F9;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
<tr>
<td align="center">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
max-width:600px;
background:#ffffff;
border-radius:16px;
overflow:hidden;
">

<!-- Header -->

<tr>
<td
align="center"
style="
background:#4F46E5;
padding:40px 24px;
">

<div
style="
height:64px;
width:64px;
line-height:64px;
background:#ffffff20;
border-radius:16px;
font-size:34px;
margin:auto;
color:#ffffff;
">
🏦
</div>

<h1
style="
margin:20px 0 8px;
font-size:32px;
font-weight:700;
color:#ffffff;
">
LedgerFlow
</h1>

<p
style="
margin:0;
font-size:16px;
color:#E0E7FF;
">
Enterprise Bank Ledger Management System
</p>

</td>
</tr>

<!-- Content -->

<tr>
<td style="padding:40px 32px;">

<h2
style="
margin:0;
font-size:26px;
color:#0F172A;
">
Welcome, ${name}! 👋
</h2>

<p
style="
margin:24px 0 0;
font-size:16px;
line-height:28px;
color:#475569;
">
Thank you for creating your LedgerFlow account.
Your registration has been completed successfully.
</p>

<p
style="
margin:18px 0 30px;
font-size:16px;
line-height:28px;
color:#475569;
">
Your account is secured using modern authentication practices including JWT Authentication, Secure Sessions, Refresh Tokens and HTTP-only Cookies.
</p>

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#F8FAFC;
border:1px solid #E2E8F0;
border-radius:12px;
">

<tr>
<td style="padding:24px;">

<p style="margin:0 0 16px;font-weight:600;color:#0F172A;">
Your account includes:
</p>

<p style="margin:8px 0;color:#334155;">
✔ Secure Login & Authentication
</p>

<p style="margin:8px 0;color:#334155;">
✔ Bank Ledger Dashboard
</p>

<p style="margin:8px 0;color:#334155;">
✔ Protected User Sessions
</p>

<p style="margin:8px 0;color:#334155;">
✔ Enterprise-grade Backend Security
</p>

</td>
</tr>

</table>

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="margin-top:36px;"
>

<tr>
<td align="center">

<a
href="http://localhost:5173/login"
style="
display:inline-block;
background:#4F46E5;
color:#ffffff;
text-decoration:none;
padding:15px 34px;
font-size:16px;
font-weight:600;
border-radius:10px;
">
Access Your Account
</a>

</td>
</tr>

</table>

<p
style="
margin-top:36px;
font-size:14px;
line-height:24px;
color:#64748B;
text-align:center;
">
If you did not create this account, you can safely ignore this email.
No further action is required.
</p>

</td>
</tr>

<!-- Footer -->

<tr>
<td
align="center"
style="
padding:24px;
border-top:1px solid #E2E8F0;
background:#FAFAFA;
">

<p
style="
margin:0;
font-size:14px;
font-weight:600;
color:#334155;
">
LedgerFlow
</p>

<p
style="
margin:8px 0 0;
font-size:13px;
color:#64748B;
">
Enterprise Bank Ledger Management System
</p>

<p
style="
margin:12px 0 0;
font-size:12px;
color:#94A3B8;
">
© ${new Date().getFullYear()} LedgerFlow. All rights reserved.
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
}

module.exports = {
  RegistrationText,
  generateRegistrationHtml,
};
