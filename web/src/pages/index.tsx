import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { mapEdgesToNodes } from "../lib/gatsby-helpers";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

import Container from "../components/container";
import BouncingLetters from "../components/bouncing-letters";
import AboutSection from "../components/sections/about-section";
import WorkSection from "../components/sections/work-section";
import ContactSection from "../components/sections/contact-section";
import MoreSection from "../components/sections/more-section";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileBrowser } from "../lib/helpers";
gsap.registerPlugin(ScrollTrigger);

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      images {
        _key
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
        caption
        alt
      }
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
          notableProjects {
            title
            clientName
            url
            _rawBody
            logo {
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
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

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
  const images = site?.images;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const sectionRefs = useRef<any[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const addSectionRef = element => {
    if (element && !sectionRefs.current.includes(element)) {
      sectionRefs.current.push(element);
    }
  };

  useEffect(() => {
    sectionRefs.current.forEach((ref, index) => {
      gsap.fromTo(
        ref,
        {
          autoAlpha: 0,
          translateY: 40
        },
        {
          autoAlpha: 1,
          translateY: 0,
          duration: 0.5,
          // delay: (index + 1) % 3 === 0 ? 0.4 : 0.2,
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: ref,
            start: `top ${isMobileBrowser() ? "85%" : "center+=100"}`,
            toggleActions: "play"
          }
        }
      );
    });
  }, [sectionRefs]);

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <BGContainer />
      <IndexContainer grow ref={containerRef}>
        <BouncingLetters />
        <TopSection></TopSection>
        <AboutSection content={site.description} containerRef={containerRef} />
        <ContactSection ref={addSectionRef} />
        <WorkSection jobs={jobs} ref={addSectionRef} />
        <MoreSection images={images} ref={addSectionRef} />
      </IndexContainer>
    </Layout>
  );
};

export default IndexPage;

const BGContainer = styled.div`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  background: linear-gradient(125deg, var(--base-color-gradient-1), var(--base-color-gradient-2));
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const IndexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  height: calc(100vh - 3em);
  margin-bottom: 1.5em;

  display: flex;
  align-items: end;
  justify-content: center;
`;
