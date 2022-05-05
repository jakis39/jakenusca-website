export default {
  name: "jobProject",
  title: "Job Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "clientName",
      title: "Client Name",
      type: "string"
    },
    {
      name: "logo",
      title: "Project logo",
      type: "figure"
    },
    {
      name: "url",
      title: "Project URL",
      type: "string"
    },
    {
      name: "body",
      title: "Body",
      type: "projectPortableText"
    }
  ],
  preview: {
    select: {
      title: "title",
      media: "logo"
    },
    prepare({ title = "No title", media }) {
      return {
        title,
        media
      };
    }
  }
};
