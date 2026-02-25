<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Booking Confirmation</title>
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
        .header { background: #050D1A; padding: 30px; text-align: center; }
        .header h1 { color: #00D4FF; margin: 0; font-size: 24px; letter-spacing: 2px; }
        .content { padding: 30px; color: #333; line-height: 1.6; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-label { font-weight: 600; color: #555; }
        .detail-value { color: #050D1A; font-weight: 500; }
        .price { font-size: 24px; color: #F5C842; font-weight: 700; text-align: center; padding: 20px; }
        .footer { background: #050D1A; color: #7A9BB5; padding: 20px; text-align: center; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>DOORSTEP AUTOWASH</h1>
        </div>
        <div class="content">
            <p>Thank you for booking with <strong>Doorstep Autowash Service</strong>, British Columbia's premier mobile car wash.</p>

            <h2 style="color: #050D1A; border-bottom: 2px solid #00D4FF; padding-bottom: 8px;">Booking Details</h2>

            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Service</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">{{ $booking->service->name }}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Date</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">{{ $booking->booking_date->format('F j, Y') }}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Time</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">{{ $booking->booking_time }}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555;">Address</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">{{ $booking->address }}</td>
                </tr>
            </table>

            <div class="price">CAD ${{ number_format($booking->service->price, 2) }}</div>

            <p>Our team will arrive at your location on time, fully equipped. We look forward to serving you!</p>

            <p style="margin-top: 30px;">
                Warm regards,<br>
                <strong>The Doorstep Autowash Team</strong>
            </p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Doorstep Autowash Service. All rights reserved.</p>
            <p>British Columbia, Canada</p>
        </div>
    </div>
</body>
</html>
