function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateOtpHtml(name, otp) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email | LEDGER PRO</title>
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
                  color:#666666;
                  font-size:15px;
                  line-height:28px;
                ">
                Modern Banking Platform
              </p>

            </td>
          </tr>

          <!-- Body -->

          <tr>
            <td style="padding:52px 42px;">

              <h2
                style="
                  margin:0;
                  color:#111111;
                  font-size:34px;
                  font-weight:700;
                ">
                Verify your email
              </h2>

              <p
                style="
                  margin:28px 0 0;
                  color:#555555;
                  font-size:17px;
                  line-height:32px;
                ">
                Hello <strong>${name}</strong>,
              </p>

              <p
                style="
                  margin:18px 0 0;
                  color:#555555;
                  font-size:17px;
                  line-height:32px;
                ">
                Welcome to <strong>LEDGER PRO</strong>.

                To activate your account securely, enter the verification code below.

              </p>

              <!-- OTP -->

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  margin:42px 0;
                  background:#FFF8F2;
                  border:2px solid #FFE2C8;
                  border-radius:20px;
                ">

                <tr>

                  <td
                    align="center"
                    style="padding:40px;">

                    <p
                      style="
                        margin:0;
                        color:#777777;
                        font-size:13px;
                        font-weight:700;
                        letter-spacing:4px;
                        text-transform:uppercase;
                      ">
                      Verification Code
                    </p>

                    <p
                      style="
                        margin:24px 0 0;
                        color:#FFBA7D;
                        font-size:52px;
                        font-weight:800;
                        letter-spacing:16px;
                        font-family:Arial,Helvetica,sans-serif;
                      ">
                      ${otp}
                    </p>

                    <p
                      style="
                        margin:18px 0 0;
                        color:#888888;
                        font-size:14px;
                      ">
                      Valid for 10 minutes
                    </p>

                  </td>

                </tr>

              </table>

              <!-- Security -->

              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  background:#FAFAFA;
                  border-left:4px solid #FFBA7D;
                  border-radius:12px;
                ">

                <tr>

                  <td style="padding:24px;">

                    <p
                      style="
                        margin:0;
                        color:#111111;
                        font-size:18px;
                        font-weight:700;
                      ">
                      Security Tips
                    </p>

                    <p
                      style="
                        margin:18px 0 0;
                        color:#555555;
                        font-size:15px;
                        line-height:30px;
                      ">

                      • This verification code expires in
                      <strong>10 minutes</strong>.

                      <br><br>

                      • This OTP can only be used once.

                      <br><br>

                      • Never share your OTP with anyone.

                      <br><br>

                      • LEDGER PRO will never ask for your password or verification code.

                    </p>

                  </td>

                </tr>

              </table>

              <p
                style="
                  margin:34px 0 0;
                  color:#666666;
                  font-size:15px;
                  line-height:30px;
                ">

                If you didn't create a LEDGER PRO account,
                you can safely ignore this email.

                No account will be activated until your email address is verified.

              </p>

            </td>
          </tr>

          <!-- Footer -->

          <tr>

            <td
              align="center"
              style="
                padding:42px;
                background:#FAFAFA;
                border-top:1px solid #EEEEEE;
              ">

              <p
                style="
                  margin:0;
                  font-size:28px;
                  font-weight:800;
                  font-family:Arial,Helvetica,sans-serif;
                ">

                <span style="color:#111111;">LEDGER</span>
                <span style="color:#FFBA7D;"> PRO</span>

              </p>

              <p
                style="
                  margin:14px 0 0;
                  color:#666666;
                  font-size:14px;
                ">
                Modern Banking Platform
              </p>

              <p
                style="
                  margin:24px 0 0;
                  color:#999999;
                  font-size:12px;
                  line-height:22px;
                ">
                This is an automated security email.<br>
                Please do not reply to this message.
              </p>

              <p
                style="
                  margin:14px 0 0;
                  color:#999999;
                  font-size:12px;
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

</html>`;
}

function GenerateOtpText(name, otp) {
  return `
Hello ${name},

Welcome to LEDGER PRO!

To verify your email address, use the One-Time Password (OTP) below:

Verification Code: ${otp}

This verification code expires in 10 minutes.

If you did not create a LEDGER PRO account, you can safely ignore this email.

Thank you,

LEDGER PRO Team
`;
}

module.exports = {
  generateOtp,
  generateOtpHtml,
  GenerateOtpText,
};
