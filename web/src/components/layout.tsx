import React from "react";
import styled from "styled-components";

import "../styles/global-fonts.css";
import "../styles/global-colors.css";
import GlobalStyle from "../styles/globalStyles";

// import Header from "./header";

const Layout = ({ children, siteTitle }) => (
  <>
    <GlobalStyle />
    {/* <Header siteTitle={siteTitlze} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} /> */}
    <PageWrapper>{children}</PageWrapper>
    {/* <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          © {new Date().getFullYear()}, Built with <a href="https://www.sanity.io">Sanity</a> &amp;
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </footer> */}
  </>
);

export default Layout;

const PageWrapper = styled.div`
  min-height: 100%;
  display: flex;
`;
