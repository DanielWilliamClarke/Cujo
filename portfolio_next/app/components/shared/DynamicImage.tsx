import React, { HTMLAttributes, useEffect, useState } from 'react';

type ImageProps = HTMLAttributes<HTMLImageElement> & {
  image: string
  alt: string
};

namespace ImageLocator {
  export const buildImageUri = (image: string): any => {
    return isUrl(image) ? image : require(`../../assets/${image}`).default;
  };

  const isUrl = (image: string): boolean => {
    if (image.startsWith('//images.')) {
      image = `https:${image}`;
    }

    let url;
    try {
      url = new URL(image);
    } catch (_) {
      return false;
    }

    return ['http:', 'https:'].includes(url.protocol);
  };
}

export const DynamicImage: React.FC<ImageProps> =
  ({ image, alt, className }: ImageProps): JSX.Element => {
    const [loaded, setLoaded] = useState('');

    useEffect(() => {
      new Promise((resolve) => {
        const uri = ImageLocator.buildImageUri(image);
        if (uri) {
          const handleLoad = (): void => {
            setLoaded(uri);
            image.removeEventListener('load', handleLoad);
            resolve(true);
          };
          const image = new Image();
          image.addEventListener('load', handleLoad.bind(this));
          image.src = uri;
        }
      });
    });

    return (
      <img
        src={loaded}
        alt={alt}
        className={className}
      />
    );
  };
