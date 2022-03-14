import { NbMenuItem } from '@nebular/theme';
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
    hidden: true,
  },

  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    hidden: true,

  },
  {
    title: 'Gestion constats',
    icon: 'clipboard',
    link: '/pages/constat',
    data : 'admin'
  },
  {
    title: 'Gestion voyage',
    icon: 'paper-plane',
    link: '/pages/voyage',
    data : 'admin'
  },
  {
    title: 'Unite',
    link: '/pages/unite',
    icon: 'cube',
    data : 'admin'
  },
  {
    title: 'Paramétrage',
    icon: 'options',
    data : 'admin',
    children: [
      {
        title: 'Bateaux',
        link: '/pages/bateau',
        icon: 'arrowhead-right'
      },
      {
        title: 'Port',
        link: '/pages/port',
        icon: 'arrowhead-right'
      },
      {
        title: 'Dommage',
        link: '/pages/dommage',
        icon: 'arrowhead-right'
      },
      {
        title: 'Categorie',
        link: '/pages/type',
        icon: 'arrowhead-right'
      },
    ]
  },
  {
    title: 'Gestion utilisateurs',
    icon: 'people',
    link: '/pages/utilisateur',
    data : 'admin',
    children:
      [{
        title: 'Gestion inspecteur',
        icon: 'person',
        link: '/pages/inspecteur',
      },
      {
        title: 'Gestion chargeur',
        icon: 'car',
        link: '/pages/chargeur',
      },
      {
        title: 'Gestion des comptes',
        icon: 'lock',
        link: '/pages/utilisateur',
      },

      ]
  },
  {
    title: 'Mes Constat',
    icon: 'clipboard',
    link: '/pages/constatChargeur',
    data: 'chargeur'
  },

];
