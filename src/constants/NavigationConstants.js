import {
  ADMIN_ROLE_ID,
  SUPERVISOR_ROLE_ID,
  CASHIER_ROLE_ID
} from '../constants/ConfigurationConstants';

export const CLIENT_ITEMS = [
  {
    title: 'clients',
    icon: 'mdi-account-outline',
    path: 'clients',
    allowedRoles: [ADMIN_ROLE_ID]
  }
];

export const ENGINE_ITEMS = [
  {
    title: 'engineParts',
    icon: 'mdi-engine-outline',
    path: 'parts',
    allowedRoles: [ADMIN_ROLE_ID]
  },
  {
    title: 'cylinders',
    icon: 'mdi-cylinder',
    path: 'cylinders',
    allowedRoles: [ADMIN_ROLE_ID]
  },
  {
    title: 'unitsOfMeasure',
    icon: 'mdi-tape-measure',
    path: 'unit-of-measures',
    allowedRoles: [ADMIN_ROLE_ID]
  },
  {
    title: 'spareParts',
    icon: 'mdi-car-door',
    path: 'spare-parts',
    allowedRoles: [ADMIN_ROLE_ID]
  }
];

export const SERVICE_ITEMS = [
  {
    title: 'services',
    icon: 'mdi-toolbox-outline',
    path: 'services',
    allowedRoles: [ADMIN_ROLE_ID]
  }
];

export const ORDER_CONFIGURATION_ITEMS = [
  {
    title: 'engineRebuildingOrderStatuses',
    icon: 'mdi-file-cog-outline',
    path: 'rectifier-order-statuses',
    allowedRoles: [ADMIN_ROLE_ID]
  }
];

export const ORDER_ITEMS = [
  {
    title: 'engineRebuildingOrders',
    icon: 'mdi-text-box-search-outline',
    path: 'rectifier-orders',
    allowedRoles: [ADMIN_ROLE_ID, SUPERVISOR_ROLE_ID, CASHIER_ROLE_ID]
  },
  {
    title: 'engineRebuildingOrdersBoard',
    icon: 'mdi-view-dashboard-variant-outline',
    path: 'rectifier-orders-board',
    allowedRoles: [ADMIN_ROLE_ID, SUPERVISOR_ROLE_ID]
  },
  {
    title: 'engineRebuildingCalendarOrder',
    icon: 'mdi-calendar',
    path: 'calendar-orders',
    allowedRoles: [ADMIN_ROLE_ID, SUPERVISOR_ROLE_ID]
  },
  {
    title: 'engineRebuildingOrderHistory',
    icon: 'mdi-archive-outline',
    path: 'rectifier-historical-orders',
    allowedRoles: [ADMIN_ROLE_ID, SUPERVISOR_ROLE_ID, CASHIER_ROLE_ID]
  }
];

export const WORKER_ITEMS = [
  {
    title: 'workers',
    icon: 'mdi-account-hard-hat-outline',
    path: 'workers',
    allowedRoles: [ADMIN_ROLE_ID]
  }
];

export const REPORT_ITEMS = [
  {
    title: 'clients',
    icon: 'mdi-account-outline',
    path: 'clients-report'
  },
  {
    title: 'financial',
    icon: 'mdi-finance',
    path: 'financial-report'
  },
  {
    title: 'debtors',
    icon: 'mdi-hand-coin-outline',
    path: 'debtors-report'
  },
  {
    title: 'unpicked',
    icon: 'mdi-package-variant-closed',
    path: 'unpicked-orders-report'
  },
  {
    title: 'brands',
    icon: 'mdi-engine-outline',
    path: 'brands-report'
  },
  {
    title: 'spareParts',
    icon: 'mdi-car-door',
    path: 'spare-parts-report'
  },
  {
    title: 'workers',
    icon: 'mdi-account-hard-hat-outline',
    path: 'workers-report'
  }
];

export const SERVICE_REPORT_SUB_ITEMS = [
  {
    title: 'servicesFrequency',
    icon: 'mdi-sine-wave',
    path: 'service-report'
  },
  {
    title: 'servicesMoney',
    icon: 'mdi-cash',
    path: 'service-money-report'
  }
];
