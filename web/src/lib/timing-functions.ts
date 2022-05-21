export function easeInOutCubic(time, beginVal, delta, duration) {
  if ((time /= duration / 2) < 1) return (delta / 2) * time * time * time + beginVal;
  return (delta / 2) * ((time -= 2) * time * time + 2) + beginVal;
}
