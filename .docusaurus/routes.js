import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '1d8'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '55a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '261'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '536'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'd3a'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '34e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '856'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'f25'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '089'),
    exact: true
  },
  {
    path: '/blog/html-sse',
    component: ComponentCreator('/blog/html-sse', 'f6e'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3df'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '587'),
    routes: [
      {
        path: '/docs/category/go',
        component: ComponentCreator('/docs/category/go', '685'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/go/database-migration-in-go-with-soda',
        component: ComponentCreator('/docs/go/database-migration-in-go-with-soda', '9a0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'a1d'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
