import {
  IconBus,
  IconCards,
  IconCreditCardPay,
  IconSchool,
  IconUserCircle,
  IconUserPentagon,
  IconUserSquare,
} from '@tabler/icons-react'
import { uniqueId } from 'lodash'

interface MenuitemsType {
  [x: string]: any
  id?: string
  navlabel?: boolean
  subheader?: string
  title?: string
  icon?: any
  href?: string
  children?: MenuitemsType[]
  chip?: string
  chipColor?: string
  variant?: string
  external?: boolean
}

const BusinessMenuItems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'User Management',
  },

  {
    id: uniqueId(),
    title: 'Customer Management',
    icon: IconUserCircle,
    chipColor: 'secondary',
    href: '/customer-management',
  },
  {
    id: uniqueId(),
    title: 'Driver Management',
    icon: IconUserSquare,
    href: '/driver-management',
  },

  {
    id: uniqueId(),
    title: 'Admin Management',
    icon: IconUserPentagon,
    chipColor: 'secondary',
    href: '/admin-management',
  },

  {
    navlabel: true,
    subheader: 'Card Management',
  },

  {
    id: uniqueId(),
    title: 'Card Template',
    icon: IconCards,
    href: '/card-template',
  },

  {
    id: uniqueId(),
    title: 'Card Request',
    icon: IconCreditCardPay,
    href: '/card-request',
  },

  {
    navlabel: true,
    subheader: 'Data Management',
  },

  {
    id: uniqueId(),
    title: 'School List',
    icon: IconSchool,
    href: '/school-list',
  },
  {
    id: uniqueId(),
    title: 'Bus Company List',
    icon: IconBus,
    href: '/bus-company-list',
  },
]

export default BusinessMenuItems
