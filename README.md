# پنل گزارش‌گیری فروش (Report Sale Panel)

یک اپلیکیشن داشبورد که با **Next.js 16**، **React 19**، **TypeScript**، **Tailwind CSS 4** و **pnpm** توسعه داده شده است.

این پروژه سه بخش اصلی دارد:

- **داشبورد:** نمایش شاخص‌های کلیدی فروش (KPI) و نمودارها
- **مدیریت سفارش‌ها:** جدول سفارش‌ها با قابلیت جست‌وجو، فیلتر و صفحه‌بندی
- **گزارش‌ساز:** ساخت گزارش‌های پویا با امکان انتخاب معیارها، گروه‌بندی و فیلترها

پروژه با قابلیت **Static Export** در Next.js پیکربندی شده است؛ بنابراین نسخه نهایی را می‌توان به‌صورت فایل‌های استاتیک و بدون اجرای سرور Node.js در محیط Production منتشر کرد.

---

## پیش‌نیازها

پیش از اجرای پروژه، ابزارهای زیر باید نصب باشند:

- Node.js
- pnpm

مدیر بسته این پروژه **pnpm** است و فایل `pnpm-lock.yaml` برای قفل‌کردن نسخه وابستگی‌ها در مخزن قرار دارد.

---

## نصب وابستگی‌ها

ابتدا مخزن پروژه را دریافت کنید و در مسیر اصلی پروژه دستور زیر را اجرا کنید:

```bash
pnpm install
```

برای نصب دقیقاً مطابق فایل lock ــ که در محیط CI و هنگام بیلد قابل‌تکرار توصیه می‌شود ــ از دستور زیر استفاده کنید:

```bash
pnpm install --frozen-lockfile
```

---

## اسکریپت‌های قابل استفاده

### اجرای پروژه در حالت توسعه

```bash
pnpm dev
```

پس از اجرا، برنامه از آدرس زیر در دسترس خواهد بود:

```text
http://localhost:3000
```

### ساخت نسخه Production

```bash
pnpm build
```

با توجه به تنظیم زیر در پیکربندی Next.js:

```ts
output: "export";
```

خروجی به‌صورت فایل‌های استاتیک در پوشه `out/` تولید می‌شود.

### مشاهده محلی خروجی Production

از آنجا که پروژه به‌صورت Static Export ساخته می‌شود، برای انتشار آن به دستور `pnpm start` یا `next start` نیازی نیست. برای مشاهده محلی فایل‌های خروجی می‌توانید از یک وب‌سرور استاتیک استفاده کنید؛ برای مثال:

```bash
pnpm dlx serve out
```

### اجرای بررسی‌های ESLint

```bash
pnpm lint
```

---

## متغیرهای محیطی

آدرس پایه منبع داده از متغیر محیطی `BASE_URL` خوانده می‌شود.

اگر این متغیر تعریف نشده باشد، مقدار پیش‌فرض زیر استفاده می‌شود:

```text
https://dummyjson.com
```

برای تعیین این مقدار می‌توانید در ریشه پروژه فایل `.env.local` بسازید:

```env
BASE_URL=https://dummyjson.com
```

در وضعیت فعلی، برنامه از endpointهای مربوط به سبدهای خرید (carts) و کاربران (users) در DummyJSON داده دریافت می‌کند و از داده‌های دریافت‌شده یک مجموعه‌داده ۱۰٬۰۰۰ رکوردی تولید می‌کند.

---

## ساختار پروژه

```text
.
├── app/
│   ├── (dashboard)/
│   │   ├── orders-managment/
│   │   │   └── page.tsx
│   │   ├── report/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── providers/
│   │   └── QueryClientProvider.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── combobox.tsx
│   │   ├── dialog.tsx
│   │   ├── direction.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── field.tsx
│   │   ├── input.tsx
│   │   ├── input-group.tsx
│   │   ├── label.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── radio-group.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── spinner.tsx
│   │   ├── table.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   ├── AppSidebar.tsx
│   └── DatePicker.tsx
│
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── Kpis.tsx
│   │   │   ├── OrdersPriceBasedOfStatusChart.tsx
│   │   │   ├── SaleBaseOfChannelChart.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   └── queries/
│   │   │       ├── SaleBaseOfChannel.ts
│   │   │       ├── index.ts
│   │   │       ├── useGetKpiData.ts
│   │   │       └── useGetOrdersPriceBasedOfStatus.ts
│   │   ├── Dashboard.tsx
│   │   └── index.ts
│   │
│   ├── orders-managmnet/
│   │   ├── components/
│   │   │   ├── DataTable.tsx
│   │   │   ├── Filters.tsx
│   │   │   ├── Paginat.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── index.ts
│   │   │   ├── useCustomers.ts
│   │   │   └── useDataTable.ts
│   │   ├── OrdersManagment.tsx
│   │   └── index.ts
│   │
│   ├── report/
│   │   ├── components/
│   │   │   ├── FormBuilder.tsx
│   │   │   ├── ReportName.tsx
│   │   │   └── index.ts
│   │   ├── CreateReport.tsx
│   │   └── index.ts
│   │
│   └── share/
│       ├── constants/
│       │   ├── constants.ts
│       │   └── index.ts
│       ├── data/
│       │   ├── carts.ts
│       │   └── useDataset.ts
│       ├── types/
│       │   ├── cart.d.ts
│       │   └── index.ts
│       └── utils/
│           ├── dateFormatter.ts
│           └── index.ts
│
├── hooks/
│   ├── use-mobile.ts
│   └── useDebounce.ts
│
├── lib/
│   └── utils.ts
│
├── store/
│   └── useCreateReportForm.ts
│
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
└── tsconfig.json
```

> فایل‌های `.DS_Store` و فراداده‌های مخصوص macOS در این ساختار نمایش داده نشده‌اند؛ چون بخشی از معماری برنامه نیستند.

---

## آشنایی با ساختار پروژه

پروژه بر اساس رویکرد **Feature-based** سازمان‌دهی شده است؛ یعنی کدهای مرتبط با هر قابلیت در پوشه مخصوص همان قابلیت قرار دارند.

### پوشه `app/`

مسیرها و Layoutهای مربوط به App Router در این پوشه قرار دارند:

- `/` — داشبورد
- `/orders-managment` — مدیریت سفارش‌ها
- `/report` — گزارش‌ساز

پوشه `(dashboard)` یک **Route Group** است؛ بنابراین نام آن در URL نمایش داده نمی‌شود.

### پوشه `features/`

منطق و اجزای اصلی هر قابلیت در این پوشه قرار گرفته‌اند:

- `dashboard`: شاخص‌های کلیدی، نمودارها و Queryهای داشبورد
- `orders-managmnet`: جدول سفارش‌ها، فیلترها، مرتب‌سازی و صفحه‌بندی
- `report`: رابط کاربری ساخت گزارش و فرم‌ساز
- `share`: داده‌ها، Typeها، ثابت‌ها و توابع کمکی مشترک

### پوشه `components/`

شامل کامپوننت‌های قابل استفاده مجدد برنامه و مجموعه کامپوننت‌های رابط کاربری است.

### پوشه `store/`

مدیریت State با Zustand در این بخش انجام می‌شود. وضعیت فرم گزارش‌ساز در `sessionStorage` ذخیره می‌شود.

### پوشه `hooks/`

هوک‌های عمومی React، مانند تشخیص اندازه صفحه و Debounce، در این پوشه قرار دارند.

---

## دیپلوی پروژه

پروژه در فایل `next.config.ts` با تنظیم زیر پیکربندی شده است:

```ts
const nextConfig: NextConfig = {
  output: "export",
};
```

در نتیجه، Next.js به‌جای ساخت یک اپلیکیشن نیازمند سرور، یک وب‌سایت استاتیک تولید می‌کند.

### مرحله ۱: نصب وابستگی‌ها

روی سیستم یا محیطی که قرار است Build در آن انجام شود، اجرا کنید:

```bash
pnpm install --frozen-lockfile
```

### مرحله ۲: تنظیم متغیرهای محیطی

اگر می‌خواهید از منبع داده دیگری استفاده کنید، مقدار `BASE_URL` را پیش از Build تنظیم کنید:

```env
BASE_URL=https://your-api.example.com
```

در صورت تعریف‌نشدن این متغیر، آدرس `https://dummyjson.com` استفاده می‌شود.

### مرحله ۳: ساخت نسخه نهایی

```bash
pnpm build
```

پس از پایان موفق Build، فایل‌های خروجی در پوشه زیر قرار می‌گیرند:

```text
out/
```

### مرحله ۴: انتشار پوشه `out/`

محتویات پوشه `out/` را روی یک وب‌سرور استاتیک یا سرویس میزبانی استاتیک بارگذاری کنید؛ برای مثال Nginx، CDN یا سرویس‌های Static Hosting.

ساختار خروجی به‌صورت کلی مشابه زیر خواهد بود:

```text
Static Hosting / Nginx / CDN
            │
            ▼
          out/
            ├── index.html
            ├── orders-managment/
            ├── report/
            └── _next/
```

در سرور Production نیازی به اجرای Node.js یا فرایند `next start` نیست؛ وب‌سرور فقط باید فایل‌های تولیدشده را ارائه کند.

### نکته مهم درباره `pnpm start`

در این پروژه، `pnpm start` دستور انتشار Production نیست. روند انتشار به این صورت است:

```bash
pnpm install --frozen-lockfile
pnpm build
```

سپس پوشه `out/` را روی میزبان استاتیک قرار دهید.

### نمونه تنظیمات Nginx

برای نمونه، می‌توانید ریشه وب‌سایت را به پوشه فایل‌های خروجی متصل کنید:

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/report-sale-panel;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location /_next/ {
        try_files $uri =404;
    }
}
```

ممکن است بسته به محیط میزبانی و نیازهای مسیریابی، لازم باشد این تنظیمات را تغییر دهید.

---

## کتابخانه‌ها و ابزارهای استفاده‌شده

### Next.js

فریم‌ورک اصلی پروژه بر پایه React است و مسیریابی، Layoutها، ساختار برنامه و تولید خروجی استاتیک را فراهم می‌کند. پروژه از App Router و Next.js 16 استفاده می‌کند.

### React

برای ساخت رابط کاربری مبتنی بر کامپوننت استفاده شده است. نسخه اصلی پروژه React 19 است.

### TypeScript

برای تعریف Typeها و افزایش اطمینان در کد کامپوننت‌ها، هوک‌ها، مدل‌های داده و منطق برنامه استفاده می‌شود.

### Tailwind CSS

فریم‌ورک CSS مبتنی بر Utility Classها برای استایل‌دهی رابط کاربری است. پروژه از Tailwind CSS 4 و یکپارچه‌سازی PostCSS استفاده می‌کند.

### shadcn/ui و Base UI

ساختار کامپوننت‌های رابط کاربری در `components/ui` قرار دارد. این کامپوننت‌ها از Primitiveهای کتابخانه Base UI و الگوی ساختاری shadcn بهره می‌برند.

### TanStack React Query

برای دریافت داده در سمت کلاینت، مدیریت Server State، Cache و چرخه عمر درخواست‌ها استفاده می‌شود. در بخش‌های داشبورد و مدیریت سفارش‌ها کاربرد دارد.

### Zustand

کتابخانه‌ای سبک برای مدیریت State مشترک است. در فرم‌ساز گزارش استفاده شده و وضعیت آن در `sessionStorage` نگهداری می‌شود.

### nuqs

برای همگام‌سازی وضعیت رابط کاربری ــ مانند جست‌وجو، فیلترها، مرتب‌سازی، صفحه‌بندی و تاریخ‌ها ــ با Query Parameterهای URL استفاده می‌شود.

### Recharts

برای رسم نمودارهای داشبورد، از جمله فروش بر اساس کانال و نمایش قیمت سفارش‌ها بر اساس وضعیت، استفاده شده است.

### React Hook Form

برای مدیریت وضعیت فرم‌ها و فرایند ورود اطلاعات در بخش ساخت گزارش استفاده می‌شود.

### Zod

برای اعتبارسنجی داده‌ها و تعریف Schemaهای دارای Type استفاده می‌شود.

### React Day Picker

برای ساخت تقویم و انتخاب‌گر تاریخ استفاده می‌شود و از تنظیمات Locale فارسی نیز پشتیبانی می‌کند.

### date-fns

مجموعه‌ای از توابع کمکی برای کار با تاریخ، محاسبه و قالب‌بندی آن است.

### Lucide React

آیکون‌های مورد استفاده در رابط کاربری را فراهم می‌کند.

### class-variance-authority

برای تعریف و مدیریت Variantهای قابل استفاده مجدد در کامپوننت‌ها، به‌ویژه کامپوننت‌های UI، استفاده می‌شود.

### tw-animate-css

مجموعه‌ای از کلاس‌های انیمیشن سازگار با Tailwind CSS را برای کامپوننت‌های رابط کاربری فراهم می‌کند.

---

## منبع داده

در وضعیت فعلی، منبع داده پروژه [DummyJSON](https://dummyjson.com/) است.

برنامه داده‌های سبدهای خرید و کاربران را دریافت می‌کند و یک مجموعه‌داده قطعی با ۱۰٬۰۰۰ رکورد برای داشبورد و صفحه مدیریت سفارش‌ها می‌سازد.

آدرس پایه منبع داده از طریق متغیر زیر قابل تغییر است:

```env
BASE_URL=https://your-api.example.com
```

---

## روند پیشنهادی توسعه

برای اجرای معمول پروژه در محیط توسعه:

```bash
# نصب وابستگی‌ها
pnpm install

# اجرای سرور توسعه
pnpm dev

# اجرای ESLint
pnpm lint

# ساخت خروجی استاتیک Production
pnpm build
```

در محیط‌های CI بهتر است از نصب مبتنی بر lockfile استفاده کنید:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

پس از Build موفق، پوشه `out/` را در محیط میزبانی استاتیک منتشر کنید.
