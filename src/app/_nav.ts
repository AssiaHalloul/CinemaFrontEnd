import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Film',
    url: '/film',
   // icon: 'icon-film',
    children: [
      {
        name: 'Ajouter Film',
        url: '/film/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste Films',
        url: '/film/tables',
        icon: 'icon-menu'
      },
    ]
  },
  {
    name: 'Evenement',
    url: '/evenement',
   // icon: 'icon-film',
    children: [
      {
        name: 'Ajouter Evenement',
        url: '/evenement/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste Evenements',
        url: '/evenement/tables',
        icon: 'icon-menu'
      },
    ]
  },
  {
    name: 'Seances',
    url: '/seance',
    children: [
      {
        name: 'Ajouter Seance',
        url: '/seance/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste Seances',
        url: '/seance/tables',
        icon: 'icon-menu'
      },
    ]
  },
  {
    name: 'Gallerie',
    url: '/gallerie',
   // icon: 'icon-film',
    children: [
      {
        name: 'Ajouter Gallerie',
        url: '/gallerie/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste Galleries',
        url: '/gallerie/tables',
        icon: 'icon-menu'
      },
    ]
  },
  {
    name: 'Acteurs / Realisateurs',
    url: '/personne',
    children: [
      {
        name: 'Ajouter Personne',
        url: '/personne/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste Personnes',
        url: '/personne/tables',
        icon: 'icon-menu'
      },
    ]
  },
  {
    name: 'NewsLetter',
    url: '/newsletter',
    //icon: 'icon-paper-plane',
    children: [
      {
        name: 'Ajouter Newsletter',
        url: '/newsletter/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste Newsletters',
        url: '/newsletter/tables',
        icon: 'icon-menu'
      },
    ]
  },
  {
    title: true,
    name: 'Gestion des parametres'
  },
  {
    name: 'Salles',
    url: '/salle',
    children: [
      {
        name: 'Ajouter Salle',
        url: '/salle/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste des Salles',
        url: '/salle/tables',
        icon: 'icon-menu'
      },
    ]
  },
  {
    name: 'Genre Film',
    url: '/genre_film',
    children: [
      {
        name: 'Ajouter Genre',
        url: '/genre_film/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste des Genres',
        url: '/genre_film/tables',
        icon: 'icon-menu'
      },
    ]

  },
  {
    name: 'Types Evenement',
    url: '/type_event',
    children: [
      {
        name: 'Ajouter Type',
        url: '/type_event/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste des Type',
        url: '/type_event/tables',
        icon: 'icon-menu'
      },
    ]
  },
  {
    name: 'Nationalites',
    url: '/nationalite',
    children: [
      {
        name: 'Ajouter Nationalite',
        url: '/nationalite/forms',
        icon: 'icon-plus'
      },
      {
        name: 'Liste Nationalites',
        url: '/nationalite/tables',
        icon: 'icon-menu'
      },
    ]
  },
];
