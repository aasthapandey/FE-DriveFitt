# DriveFitt Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deployment Issues & Troubleshooting

### Email Service (Brevo) Connection Issues

If you're experiencing `ECONNRESET` or socket timeout errors in production:

1. **Environment Variables**: Ensure all required environment variables are set:

   ```
   BREVO_API_KEY=your_brevo_api_key
   SENDER_EMAIL=alerts@drivefitt.club
   NOTIFICATION_EMAIL=your_notification_email
   FRANCHISE_NOTIFICATION_EMAIL=your_franchise_email
   ```

2. **Timeout Configuration**: The application now includes:

   - HTTP agent configuration with proper timeouts (30s)
   - Retry logic for failed requests (3 retries)
   - Request-level timeouts (25s) to prevent hanging

3. **Monitoring**: Add these logs to monitor email performance:

   ```bash
   # Check for email errors
   grep "Error sending.*email" logs

   # Check for retry attempts
   grep "Retrying API call" logs

   # Check for timeout errors
   grep "Email sending timeout" logs
   ```

4. **Network Configuration**: For hosting platforms:
   - Ensure outbound HTTPS connections are allowed
   - Check if your hosting provider has specific timeout limits
   - Consider increasing function timeout limits if available

### Common Production Issues

1. **Database Connection**: Ensure MySQL connection pooling is properly configured
2. **Static Assets**: Verify all images and assets are properly optimized
3. **Environment Parity**: Keep development and production environments synchronized

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
