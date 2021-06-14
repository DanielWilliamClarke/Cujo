import { Component, HTMLAttributes } from "react";

type ImageProps = {
  image: string;
  alt: string;
};


type ImageState = {
  loaded: string
};

export class DynamicImage extends Component<
  ImageProps & HTMLAttributes<HTMLImageElement>, ImageState
> {

  componentWillMount(): void {
    this.setState({ loaded: "" });
    
    setTimeout(() => {
      const uri = ImageLocator.buildImageUri(this.props.image);
      if (uri) {
        const handleLoad = (): void => {
          this.handleLoad(uri);
          image.removeEventListener('load', handleLoad);
        };
        const image = new Image();
        image.addEventListener('load', handleLoad.bind(this));
        image.src = uri;
      }
    }, 500);
  }

  render(): JSX.Element {
    return (
      <img
        src={this.state.loaded}
        alt={this.props.alt}
        className={this.props.className}
      />
    );
  }

  private handleLoad(loaded: string): void {
    this.setState({ loaded });
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
