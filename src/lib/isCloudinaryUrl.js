export function isCloudinaryUrl(url) {
  try {
    return new URL(url).hostname === 'res.cloudinary.com';
  } catch {
    return false;
  }
}
