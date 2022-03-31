// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native Chatty',
  tagline: 'Full-featured high performance chat UI for React Native.',
  url: 'https://muhammedkpln.github.io',
  baseUrl: '/react-native-chatty/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'muhammedkpln', // Usually your GitHub org/user name.
  projectName: 'react-native-chatty', // Usually your repo name.
  trailingSlash: false,
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/MuhammedKpln/react-native-chatty/tree/main/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // If Algolia did not provide you any appId, use 'BH4D9OD16A'
        appId: 'T29VG53S5H',
        // Public API key: it is safe to commit it
        apiKey: '2405410935faf3f7821173d0aa500267',
        indexName: 'react-native-chatty',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',
        // Optional: Algolia search parameters
        // searchParameters: {}
        //... other Algolia params
      },
      navbar: {
        title: 'React Native Chatty',
        logo: {
          alt: 'React Native Chatty - Chat UI for React Native',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/setup',
            position: 'right',
            label: 'Docs',
          },
          {
            href: 'https://github.com/muhammedkpln/react-native-chatty',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/getting-started/setup',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} React Native Chatty, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
