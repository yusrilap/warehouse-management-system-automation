# Warehouse Management System — QA Automation

End-to-end test automation project for a Warehouse Management System built with Laravel and Filament.

This repository contains automated browser tests developed using **Playwright** and **TypeScript** to validate critical application workflows, user access, and inventory operations.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Laravel WMS as the application under test
- Chromium for primary test execution

## Project Structure

```text
warehouse-management-system-automation/
├── pages/
│   └── LoginPage.ts
├── tests/
│   └── auth/
│       └── login.spec.ts
├── .env.example
├── playwright.config.ts
├── package.json
└── README.md
```

## Test Coverage

### Authentication

- [x] Login page accessibility
- [x] Successful admin login
- [x] Invalid credentials validation
- [x] Admin logout

### Role-Based Access Control

- [ ] Admin access
- [ ] Warehouse Staff access
- [ ] Viewer access
- [ ] Unauthorized action restrictions

### Master Data

- [ ] Product management
- [ ] Category management
- [ ] Unit management
- [ ] Supplier management
- [ ] Warehouse and location management

### Inventory Transactions

- [ ] Goods Receipt
- [ ] Stock Out
- [ ] Stock Transfer
- [ ] Stock Adjustment
- [ ] Stock Opname

### Inventory Monitoring

- [ ] Current Stock
- [ ] Stock Movements
- [ ] Low Stock

### Reports & Audit

- [ ] Stock Report
- [ ] Movement Report
- [ ] Activity Log

## Current Automation Status

Authentication automation has been implemented using the **Page Object Model (POM)** pattern.

Current authentication test suite:

```text
✓ Admin can access login page
✓ Admin can login successfully
✓ Login fails with invalid credentials
✓ Admin can logout successfully
```

## Environment Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Copy the environment configuration:

```bash
cp .env.example .env
```

Configure the test account in `.env`:

```env
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-admin-password
```

The `.env` file is excluded from Git and should never be committed.

## Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run authentication tests using Chromium:

```bash
npx playwright test tests/auth/login.spec.ts --project=chromium
```

Run tests in headed mode:

```bash
npx playwright test --project=chromium --headed
```

Run tests using Playwright Inspector:

```bash
npx playwright test --project=chromium --debug
```

View the latest HTML report:

```bash
npx playwright show-report
```

## Application Under Test

The application under test is a custom **Warehouse Management System** developed using Laravel and Filament.

The WMS covers warehouse operations including:

- Goods receiving
- Stock issuing to production
- Stock transfers
- Stock adjustments
- Stock opname
- Inventory monitoring
- Reporting
- Role-based access control
- Activity logging

The WMS application and this automation project are maintained as separate repositories to demonstrate both **application development** and **QA automation** practices.

## Project Status

🚧 **In Development**

Automation coverage is being expanded incrementally across authentication, authorization, master data, inventory transactions, monitoring, reporting, and end-to-end warehouse workflows.
