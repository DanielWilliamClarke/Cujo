import NextImage from 'next/image';
import React, { HTMLAttributes, useEffect, useState } from 'react';

import { Media } from '../model/Includes';

type ImageProps = HTMLAttributes<HTMLImageElement> & {
  image: Media
};

namespace ImageLocator {
  export const buildImageUri = (image: string): any => {
    return isUrl(image) ? urlWithProtocol(image) : require(`../../assets/${image}`).default;
  };

  const urlWithProtocol = (image: string) => `https:${image}`;

  const isUrl = (image: string): boolean => {
    if (image.startsWith('//images.')) {
      image = urlWithProtocol(image);
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
  ({ image, className }: ImageProps): JSX.Element | null => {
    const [loaded, setLoaded] = useState(undefined);

    useEffect(() => {
      new Promise((resolve) => {
        const uri = ImageLocator.buildImageUri(image.file.url);
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

    if (!loaded) {
      return null;
    }

    return (
      <NextImage
        src={loaded}
        alt={image.description}
        className={className}
        width={image.file.details.image.width}
        height={image.file.details.image.height}
      />
    );
  };
