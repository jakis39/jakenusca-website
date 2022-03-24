import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { FloatingText } from "../components/floating-text";

import useWindowDimensions from "../hooks/useWindowDimensions";
import { AboutSection } from "../components/sections/about-section";
import { WorkSection } from "../components/sections/work-section";
import styled from "styled-components";
import BouncingLetters from "../components/bouncing-letters";

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    jobs: allSanityJob(
      limit: 100
      sort: { fields: [startedAt], order: DESC }
      filter: { title: { ne: null }, companyName: { ne: null } }
    ) {
      edges {
        node {
          id
          title
          companyName
          startedAt
          endedAt
          isCurrent
          _rawBody
          companyLogo {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
        }
      }
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;
  const [parked, setParked] = React.useState(false);
  // const { isSmall } = useWindowDimensions();

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const jobs = (data || {}).jobs
    ? mapEdgesToNodes(data.jobs)
    : // .filter(filterOutDocsWithoutSlugs)
      // .filter(filterOutDocsPublishedInTheFuture)
      [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  function toggleText() {
    setParked(!parked);
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <IndexContainer grow>
        <BouncingLetters />
        <TopSection></TopSection>
        <AboutSection content={site.description} />
        <WorkSection jobs={jobs} />
      </IndexContainer>
    </Layout>
  );
};

export default IndexPage;

const IndexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  height: 100vh;
`;
