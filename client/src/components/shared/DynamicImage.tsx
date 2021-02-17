import { Component, HTMLAttributes } from "react";

type ImageProps = {
  image: string;
  alt: string;
};

export class DynamicImage extends Component<
  ImageProps & HTMLAttributes<HTMLImageElement>
> {
  render(): JSX.Element {
    return (
      <img
        src={ImageLocator.buildImageUri(this.props.image)}
        alt={this.props.alt}
        className={this.props.className}
      />
    );
  }
}

export class ImageLocator {
  public static buildImageUri(image: string): any {
    return this.isUrl(image) ? image : require(`../../assets/${image}`).default;
  }

  private static isUrl(image: string): boolean {
    let url;

    try {
      url = new URL(image);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}
