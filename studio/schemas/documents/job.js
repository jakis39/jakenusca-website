// import {format} from 'date-fns'

export default {
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'companyName',
      title: 'Company Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'startedAt',
      title: 'Started at',
      type: 'datetime'
    },
    {
      name: 'endedAt',
      title: 'Ended at',
      type: 'datetime'
    },
    {
      name: 'isCurrent',
      title: 'Currently working here',
      type: 'boolean'
    },
    {
      name: 'companyLogo',
      title: 'Company logo',
      type: 'figure'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'projectPortableText'
    }
  ],
  preview: {
    select: {
      title: 'title',
      companyName: 'companyName',
      startedAt: 'startedAt',
      endedAt: 'endedAt',
      media: 'companyLogo'
    },
    prepare ({title = 'No title', companyName, startedAt, endedAt, media}) {
      // const dateSegment = format(startedAt, 'YYYY/MM')
      // const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        companyName,
        media
        // subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  }
}
