This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database Setup

This application requires a MySQL database. Make sure to set up the following environment variables in your `.env.local` file:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=drivefitt
DB_PORT=3306
```

The application expects the following database tables to be created:

### Contact Us Table

```sql
CREATE TABLE contact_us (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Franchise Inquiries Table

```sql
CREATE TABLE franchise_inquiries (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    business_name VARCHAR(150) NULL,
    contact_person VARCHAR(100) NULL,
    email VARCHAR(100) NULL,
    phone VARCHAR(20) NULL,
    location VARCHAR(150) NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) NULL,
    investment_capacity DECIMAL(15,2) NULL,
    experience_years INT NULL,
    business_background TEXT NULL,
    why_franchise TEXT NULL,
    status TINYINT DEFAULT 1 COMMENT '1=New, 2=Contacted, 3=In Discussion, 4=Approved, 5=Rejected',
    notes TEXT NULL,
    assigned_to INT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Email Notifications with Brevo

This application uses Brevo (formerly Sendinblue) for sending email notifications when forms are submitted. To configure Brevo, add the following environment variables to your `.env.local` file:

```bash
# Brevo email configuration
BREVO_API_KEY=your_brevo_api_key
NOTIFICATION_EMAIL=your_notification_email@example.com
FRANCHISE_NOTIFICATION_EMAIL=your_franchise_email@example.com
```

To get your Brevo API key:

1. Sign up or log in to your Brevo account at [https://app.brevo.com/](https://app.brevo.com/)
2. Go to Settings → API Keys & Webhooks
3. Generate a new API key with appropriate permissions
4. Copy the API key to your `.env.local` file

The application will automatically send email notifications to the specified email addresses when contact forms or franchise inquiry forms are submitted.

## API Endpoints

The application provides the following API endpoints for form submissions:

- `POST /api/contact` - Submit contact us form
- `POST /api/franchise` - Submit franchise inquiry form

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
