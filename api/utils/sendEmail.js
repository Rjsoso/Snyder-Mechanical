import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send payment confirmation email for credit card payments
 */
export async function sendPaymentConfirmationEmail({ customerEmail, customerName, invoiceNumber, amount, paidAt, paymentIntentId }) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  const formattedDate = new Date(paidAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'Snyder Mechanical <payments@snydermechanical.com>',
      to: [customerEmail],
      subject: `Payment Confirmation - Invoice ${invoiceNumber}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #303f9f 0%, #1a237e 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Payment Received</h1>
              <p style="margin: 10px 0 0 0; color: #e8eaf6; font-size: 16px;">Thank you for your payment</p>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <div style="display: inline-block; width: 80px; height: 80px; background-color: #4caf50; border-radius: 50%; text-align: center; line-height: 80px;">
                <span style="color: white; font-size: 40px;">✓</span>
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="margin: 0 0 20px 0; color: #424242; font-size: 16px; line-height: 1.5;">
                Hello ${customerName || 'Valued Customer'},
              </p>
              <p style="margin: 0 0 30px 0; color: #616161; font-size: 16px; line-height: 1.5;">
                We have successfully processed your payment. Your invoice has been marked as paid.
              </p>

              <!-- Payment Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Invoice Number</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">${invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Amount Paid</td>
                        <td style="color: #212121; font-size: 18px; font-weight: 700; text-align: right; padding: 8px 0;">${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Payment Method</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">Credit Card</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Date</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Transaction ID</td>
                        <td style="color: #757575; font-size: 12px; font-family: monospace; text-align: right; padding: 8px 0;">${paymentIntentId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; color: #616161; font-size: 14px; line-height: 1.5;">
                This email serves as your receipt. Please save it for your records.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f5f5f5; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #424242; font-size: 16px; font-weight: 600;">Snyder Mechanical LLC</p>
              <p style="margin: 0 0 5px 0; color: #757575; font-size: 14px;">Phone: (775) 738-5616</p>
              <p style="margin: 0 0 15px 0; color: #757575; font-size: 14px;">Serving Elko County, Nevada</p>
              <p style="margin: 0; color: #9e9e9e; font-size: 12px;">
                If you have any questions about this payment, please contact us.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Failed to send payment confirmation email:', error);
      throw error;
    }

    console.log('Payment confirmation email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    // Don't fail the payment if email fails
    return null;
  }
}

/**
 * Send ACH payment initiated email (immediate confirmation)
 */
export async function sendACHInitiatedEmail({ customerEmail, customerName, invoiceNumber, amount, estimatedClearanceDate }) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  const formattedDate = estimatedClearanceDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'Snyder Mechanical <payments@snydermechanical.com>',
      to: [customerEmail],
      subject: `ACH Payment Initiated - Invoice ${invoiceNumber}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ACH Payment Initiated</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #303f9f 0%, #1a237e 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">ACH Payment Initiated</h1>
              <p style="margin: 10px 0 0 0; color: #e8eaf6; font-size: 16px;">Your payment is being processed</p>
            </td>
          </tr>

          <!-- Processing Icon -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <div style="display: inline-block; width: 80px; height: 80px; background-color: #2196f3; border-radius: 50%; text-align: center; line-height: 80px;">
                <span style="color: white; font-size: 40px;">⏱</span>
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="margin: 0 0 20px 0; color: #424242; font-size: 16px; line-height: 1.5;">
                Hello ${customerName || 'Valued Customer'},
              </p>
              <p style="margin: 0 0 30px 0; color: #616161; font-size: 16px; line-height: 1.5;">
                We've successfully initiated your ACH bank transfer. Your bank account will be charged in 3-5 business days.
              </p>

              <!-- Payment Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Invoice Number</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">${invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Amount</td>
                        <td style="color: #212121; font-size: 18px; font-weight: 700; text-align: right; padding: 8px 0;">${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Payment Method</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">ACH Bank Transfer</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Expected Clearance</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">${formattedDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e8eaf6; border-left: 4px solid #303f9f; border-radius: 4px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 8px 0; color: #1a237e; font-size: 14px; font-weight: 600;">What happens next?</p>
                    <ol style="margin: 0; padding-left: 20px; color: #424242; font-size: 14px; line-height: 1.6;">
                      <li>Your bank processes the transfer (3-5 business days)</li>
                      <li>You'll receive another email when payment clears</li>
                      <li>Your invoice will be automatically marked as paid</li>
                    </ol>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #616161; font-size: 14px; line-height: 1.5;">
                This email serves as your payment authorization receipt.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f5f5f5; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #424242; font-size: 16px; font-weight: 600;">Snyder Mechanical LLC</p>
              <p style="margin: 0 0 5px 0; color: #757575; font-size: 14px;">Phone: (775) 738-5616</p>
              <p style="margin: 0 0 15px 0; color: #757575; font-size: 14px;">Serving Elko County, Nevada</p>
              <p style="margin: 0; color: #9e9e9e; font-size: 12px;">
                If you have any questions about this payment, please contact us.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Failed to send ACH initiated email:', error);
      throw error;
    }

    console.log('ACH initiated email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    return null;
  }
}

/**
 * Send ACH payment completed email (when payment clears)
 */
export async function sendACHCompletedEmail({ customerEmail, customerName, invoiceNumber, amount }) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'Snyder Mechanical <payments@snydermechanical.com>',
      to: [customerEmail],
      subject: `ACH Payment Completed - Invoice ${invoiceNumber}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ACH Payment Completed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Payment Complete</h1>
              <p style="margin: 10px 0 0 0; color: #e8f5e9; font-size: 16px;">Your ACH payment has cleared</p>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <div style="display: inline-block; width: 80px; height: 80px; background-color: #4caf50; border-radius: 50%; text-align: center; line-height: 80px;">
                <span style="color: white; font-size: 40px;">✓</span>
              </div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="margin: 0 0 20px 0; color: #424242; font-size: 16px; line-height: 1.5;">
                Hello ${customerName || 'Valued Customer'},
              </p>
              <p style="margin: 0 0 30px 0; color: #616161; font-size: 16px; line-height: 1.5;">
                Great news! Your ACH bank transfer has successfully completed. Your invoice is now fully paid.
              </p>

              <!-- Payment Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Invoice Number</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">${invoiceNumber}</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Amount Paid</td>
                        <td style="color: #212121; font-size: 18px; font-weight: 700; text-align: right; padding: 8px 0;">${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Payment Method</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">ACH Bank Transfer</td>
                      </tr>
                      <tr>
                        <td style="color: #757575; font-size: 14px; padding: 8px 0;">Completed Date</td>
                        <td style="color: #212121; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">${formattedDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; color: #616161; font-size: 14px; line-height: 1.5;">
                Thank you for your business! This email serves as your final payment receipt.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f5f5f5; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #424242; font-size: 16px; font-weight: 600;">Snyder Mechanical LLC</p>
              <p style="margin: 0 0 5px 0; color: #757575; font-size: 14px;">Phone: (775) 738-5616</p>
              <p style="margin: 0 0 15px 0; color: #757575; font-size: 14px;">Serving Elko County, Nevada</p>
              <p style="margin: 0; color: #9e9e9e; font-size: 12px;">
                If you have any questions about this payment, please contact us.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Failed to send ACH completed email:', error);
      throw error;
    }

    console.log('ACH completed email sent:', data?.id);
    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    return null;
  }
}
