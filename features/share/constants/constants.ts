export const status = {
  paid: "پرداخت شده",
  pending: "در انتظار پرداخت",
  failed: "ناموفق",
  refunded: "مسترد شده",
} as const;

export const channels = {
  web: "وبسایت",
  mobile: "موبایل",
  partner: "پارتنر",
} as const;