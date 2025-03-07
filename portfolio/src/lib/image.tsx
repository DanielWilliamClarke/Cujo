const urlWithProtocol = (image: string) => `https:${image}`;

const isUrl = (image: string): boolean => {
  if (image.startsWith("//images.")) {
    image = urlWithProtocol(image);
  }

  let url;
  try {
    url = new URL(image);
  } catch {
    return false;
  }

  return ["http:", "https:"].includes(url.protocol);
};

export const buildImageUri = (image: string): string => {
  return isUrl(image) ? urlWithProtocol(image) : image;
};
