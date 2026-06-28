export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateOtpHtml(name, otp) {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Verify Your Email | LedgerFlow</title>
</head>

<body style="margin:0;padding:0;background:#F1F5F9;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 16px;">
<tr>
<td align="center">

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
max-width:620px;
background:#ffffff;
border-radius:18px;
overflow:hidden;
box-shadow:0 8px 24px rgba(15,23,42,.08);
">

<!-- Header -->

<tr>
<td
align="center"
style="
padding:42px 32px;
background:linear-gradient(135deg,#4F46E5,#2563EB);
">

<h1
style="
margin:0;
font-size:34px;
font-weight:700;
letter-spacing:.5px;
color:#ffffff;
">
LedgerFlow
</h1>

<p
style="
margin:10px 0 0;
font-size:15px;
color:#E0E7FF;
">
Enterprise Bank Ledger Management System
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:42px 36px;">

<h2
style="
margin:0;
font-size:28px;
color:#0F172A;
">
Verify Your Email
</h2>

<p
style="
margin:24px 0 0;
font-size:16px;
line-height:28px;
color:#475569;
">
Hello <strong>${name}</strong>,
</p>

<p
style="
margin:18px 0 0;
font-size:16px;
line-height:28px;
color:#475569;
">
Thank you for choosing <strong>LedgerFlow</strong>.
To activate your account and continue securely, please verify your email address using the One-Time Password (OTP) below.
</p>

<!-- OTP Card -->

<table
role="presentation"
width="100%"
cellpadding="0"
cellspacing="0"
style="
margin:36px 0;
background:#F8FAFC;
border:2px solid #E2E8F0;
border-radius:14px;
">

<tr>
<td align="center" style="padding:32px;">

<p
style="
margin:0;
font-size:13px;
font-weight:600;
letter-spacing:2px;
text-transform:uppercase;
color:#64748B;
">
Verification Code
</p>

<p
style="
margin:18px 0 0;
font-size:42px;
font-weight:700;
letter-spacing:12px;
color:#2563EB;
font-family:Arial,Helvetica,sans-serif;
">
${otp}
</p>

</td>
</tr>

</table>

<!-- Security Notice -->

<div
style="
background:#EEF2FF;
border-left:4px solid #4F46E5;
border-radius:10px;
padding:20px;
">

<p
style="
margin:0;
font-size:15px;
line-height:28px;
color:#334155;
">

<strong>Security Notice</strong>

<br><br>

• This verification code is valid for <strong>10 minutes</strong>.

<br>

• This OTP can only be used once.

<br>

• Never share this code with anyone.

<br>

• LedgerFlow will never ask for your OTP, password, or banking credentials.

</p>

</div>

<p
style="
margin:32px 0 0;
font-size:15px;
line-height:28px;
color:#64748B;
">
If you did not create a LedgerFlow account, you can safely ignore this email. No account will be activated unless this email address is verified.
</p>

</td>
</tr>

<!-- Footer -->

<tr>
<td
align="center"
style="
padding:28px;
background:#FAFAFA;
border-top:1px solid #E2E8F0;
">

<p
style="
margin:0;
font-size:16px;
font-weight:700;
color:#1E293B;
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
margin:18px 0 0;
font-size:12px;
color:#94A3B8;
line-height:22px;
">
This is an automated security email. Please do not reply to this message.
</p>

<p
style="
margin:10px 0 0;
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
