import i18n from '@/i18n';

export const NEW = 'NEW';
export const HIRED = 'HIRED';
export const PENDING = 'PENDING';
export const CONFIRMED = 'CONFIRMED';
export const REFUSED = 'REFUSED';

export const ADDON_CATEGORY_TYPES = [
  { value: 'SINGLE', name: i18n.t('addon.typeSingle') },
  { value: 'MULTIPLE', name: i18n.t('addon.typeMultiple') },
];

export const STAFF_TYPES = [
  { value: 'SUPER_ADMIN', name: i18n.t('staff.superAdmin') },
  { value: 'MANAGER', name: i18n.t('staff.manager') },
  { value: 'CASHIER', name: i18n.t('staff.cashier') },
];

export const STATUS_OPTIONS = [
  { name: 'Идэвхтэй', value: true },
  { name: 'Идэвхгүй', value: false },
];

export const YES_OR_NO_OPTIONS = [
  { name: i18n.t('text.yes'), value: true },
  { name: i18n.t('text.no'), value: false },
];

export const DURATIONS = [
  { name: '5m', value: 5 },
  { name: '10m', value: 10 },
  { name: '15m', value: 15 },
  { name: '20m', value: 20 },
  { name: '25m', value: 25 },
  { name: '30m', value: 30 },
  { name: '35m', value: 35 },
  { name: '40m', value: 40 },
  { name: '45m', value: 45 },
  { name: '50m', value: 50 },
  { name: '55m', value: 55 },
  { name: '1h', value: 60 },
  { name: '1h 15m', value: 75 },
  { name: '1h 30m', value: 90 },
  { name: '1h 45m', value: 105 },
  { name: '2h', value: 120 },
  { name: '2h 15m', value: 135 },
  { name: '2h 30m', value: 150 },
  { name: '2h 45m', value: 165 },
  { name: '3h', value: 180 },
];
