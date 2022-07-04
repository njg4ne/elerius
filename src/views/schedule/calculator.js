export default function calcBaseSize(
  hours,
  incrementsPerHour,
  viewPortHeightPixels
) {
  const timespace = viewPortHeightPixels * hours * 0.035 + 2 * hours;
  const sixtypercent = 0.6 * viewPortHeightPixels;
  var pixels = Math.round(Math.max(timespace, sixtypercent));
  const multiple = incrementsPerHour * hours;
  const mod = pixels % multiple;
  pixels -= mod;
  pixels /= multiple;
  return pixels + 2;
}
