import { Link } from "gatsby";
import React from "react";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import BlockContent from "../block-content";

import * as styles from "./job-block.module.css";
import { title3 } from "../typography.module.css";

export interface JobBlockProps {
  job?: any;
}

export const JobBlock = (props: JobBlockProps) => {
  const { job } = props;
  console.log(job);
  return (
    <div className={styles.root}>
      {job.companyLogo && (
        <div className={styles.logoContainer}>
          <img
            src={imageUrlFor(buildImageObj(job.companyLogo))
              .width(200)
              .height(200)
              .fit("fill")
              .bg("ffffff")
              .url()}
            alt={job.companyLogo.alt}
          />
        </div>
      )}

      <div className={styles.content}>
        <h3 className={title3}>{job.title ?? ""}</h3>
        <span className={styles.companyName}>{job.companyName ?? ""}</span>
        {job._rawBody && <BlockContent blocks={job._rawBody || []} />}
      </div>
    </div>
  );
};
