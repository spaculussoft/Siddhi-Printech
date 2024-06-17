import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/brand_styles/brand_styles-list',
    label: 'Brand styles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiPalette ? icon.mdiPalette : icon.mdiTable,
    permissions: 'READ_BRAND_STYLES',
  },
  {
    href: '/categories/categories-list',
    label: 'Categories',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiViewList ? icon.mdiViewList : icon.mdiTable,
    permissions: 'READ_CATEGORIES',
  },
  {
    href: '/category_questions/category_questions-list',
    label: 'Category questions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCommentQuestion ? icon.mdiCommentQuestion : icon.mdiTable,
    permissions: 'READ_CATEGORY_QUESTIONS',
  },
  {
    href: '/color_codes/color_codes-list',
    label: 'Color codes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiPaletteSwatch ? icon.mdiPaletteSwatch : icon.mdiTable,
    permissions: 'READ_COLOR_CODES',
  },
  {
    href: '/customers/customers-list',
    label: 'Customers',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccount ? icon.mdiAccount : icon.mdiTable,
    permissions: 'READ_CUSTOMERS',
  },
  {
    href: '/industries/industries-list',
    label: 'Industries',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFactory ? icon.mdiFactory : icon.mdiTable,
    permissions: 'READ_INDUSTRIES',
  },
  {
    href: '/orders/orders-list',
    label: 'Orders',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCart ? icon.mdiCart : icon.mdiTable,
    permissions: 'READ_ORDERS',
  },
  {
    href: '/packages/packages-list',
    label: 'Packages',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiPackageVariant ? icon.mdiPackageVariant : icon.mdiTable,
    permissions: 'READ_PACKAGES',
  },
  {
    href: '/payments/payments-list',
    label: 'Payments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCreditCard ? icon.mdiCreditCard : icon.mdiTable,
    permissions: 'READ_PAYMENTS',
  },
  {
    href: '/products/products-list',
    label: 'Products',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCube ? icon.mdiCube : icon.mdiTable,
    permissions: 'READ_PRODUCTS',
  },
  {
    href: '/tickets/tickets-list',
    label: 'Tickets',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTicket ? icon.mdiTicket : icon.mdiTable,
    permissions: 'READ_TICKETS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
