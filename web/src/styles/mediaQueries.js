export const DeviceBreakpoints = {
  minSmall: 450,
  maxSmall: 449,
  minMedium: 675,
  maxMedium: 674,
  minLarge: 900,
  maxLarge: 899
};

export const DeviceWidth = {
  mediaMinSmall: `min-width: ${DeviceBreakpoints.minSmall}px`,
  mediaMaxSmall: `max-width: ${DeviceBreakpoints.maxSmall}px`,
  mediaMinMedium: `min-width: ${DeviceBreakpoints.minMedium}px`,
  mediaMaxMedium: `max-width: ${DeviceBreakpoints.maxMedium}px`,
  mediaMedium: `(min-width: ${DeviceBreakpoints.minSmall}px) and (max-width: ${DeviceBreakpoints.maxMedium}px)`,
  mediaMinLarge: `min-width: ${DeviceBreakpoints.minLarge}px`,
  mediaMaxLarge: `max-width: ${DeviceBreakpoints.maxLarge}px`
};

// TODO add brackets to all of these and change usages throughout app
