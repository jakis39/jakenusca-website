export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '623220d26dad310a4dd3b090',
                  title: 'Sanity Studio',
                  name: 'jakenusca-website-studio',
                  apiId: 'c4e88bc1-6aed-4895-842e-032a25732815'
                },
                {
                  buildHookId: '623220d3cad2540a48e484c3',
                  title: 'Portfolio Website',
                  name: 'jakenusca-website',
                  apiId: 'bf5588bc-b69a-40cb-b274-b843d9643bc2'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/jakis39/jakenusca-website',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://jakenusca-website.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
