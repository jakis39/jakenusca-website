import { css } from "styled-components";

interface TypeStyle {
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: string;
  textTransform?: string;
  textDecoration?: string;
}

const Typography = {
  title80: {
    fontFamily: "var(--font-family-title)",
    fontSize: "var(--font-title80-size)",
    lineHeight: "var(--font-title80-line-height)"
  },
  title24caps: {
    fontFamily: "var(--font-family-subtitle)",
    fontSize: "var(--font-title24-size)",
    lineHeight: "var(--font-title24-line-height)",
    fontWeight: "700",
    textTransform: "uppercase"
  },
  title24: {
    fontFamily: "var(--font-family-sans)",
    fontSize: "var(--font-title24-size)",
    lineHeight: "var(--font-title24-line-height)",
    fontWeight: "500"
  },
  title16: {
    fontFamily: "var(--font-family-sans)",
    fontSize: "var(--font-title16-size)",
    lineHeight: "var(--font-title16-line-height)",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  body16: {
    fontFamily: "var(--font-family-sans)",
    fontSize: "var(--font-body16-size)",
    lineHeight: "var(--font-body16-line-height)",
    fontWeight: "normal"
  },
  // interface18: {
  //   fontFamily: "var(--font-family-sans)",
  //   fontSize: "var(--font-interface18-size)",
  //   lineHeight: "var(--font-interface18-line-height)",
  //   fontWeight: "normal",
  //   textDecoration: "none"
  // },
  // interface20: {
  //   fontFamily: "var(--font-family-sans)",
  //   fontSize: "var(--font-interface20-size)",
  //   lineHeight: "var(--font-interface20-line-height)",
  //   fontWeight: "normal",
  //   textTransform: "uppercase",
  //   textDecoration: "none"
  // },
  // body18: {
  //   fontFamily: "var(--font-family-sans)",
  //   fontSize: "var(--font-body18-size)",
  //   lineHeight: "var(--font-body18-line-height)",
  //   fontWeight: "normal"
  // },
  // body20: {
  //   fontFamily: "var(--font-family-sans)",
  //   fontSize: "var(--font-body20-size)",
  //   lineHeight: "var(--font-body20-line-height)",
  //   fontWeight: "normal"
  // },
  // body24: {
  //   fontFamily: "var(--font-family-sans)",
  //   fontSize: "var(--font-body24-size)",
  //   lineHeight: "var(--font-body24-line-height)",
  //   fontWeight: "normal"
  // },
  // title24: {
  //   fontFamily: "var(--font-family-title)",
  //   fontSize: "var(--font-title24-size)",
  //   lineHeight: "var(--font-title24-line-height)",
  //   fontWeight: "800",
  //   textTransform: "uppercase"
  // },
  // title48: {
  //   fontFamily: "var(--font-family-title)",
  //   fontSize: "var(--font-title48-size)",
  //   lineHeight: "var(--font-title48-line-height)",
  //   fontWeight: "800",
  //   textTransform: "uppercase"
  // },
  base: {
    fontSize: "inherit",
    lineHeight: "inherit"
  }
};

export type FontStyle = "title80" | "title24caps" | "title24" | "title16" | "body16";

export const font = (type: FontStyle) => {
  const typeStyle = Typography[type] as TypeStyle;

  if (!typeStyle) {
    return null;
  }

  return css`
    font-family: ${typeStyle.fontFamily ?? undefined};
    font-size: ${typeStyle.fontSize ?? undefined};
    line-height: ${typeStyle.lineHeight ?? undefined};
    font-weight: ${typeStyle.fontWeight ?? undefined};
    text-transform: ${typeStyle.textTransform ?? undefined};
    text-decoration: ${typeStyle.textDecoration ?? undefined};
  `;
};
