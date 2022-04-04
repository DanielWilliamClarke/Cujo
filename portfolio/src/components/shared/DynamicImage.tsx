import { Component, HTMLAttributes } from "react";

type ImageProps = {
  image: string;
  alt: string;
};

type ImageState = {
  loaded: string;
};

export class DynamicImage extends Component<
  ImageProps & HTMLAttributes<HTMLImageElement>,
  ImageState
> {
  constructor(props: ImageProps & HTMLAttributes<HTMLImageElement>) {
    super(props);
    this.state = { loaded: "" };
  }

  async componentDidMount() {
    await this.load();
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

  private load(): Promise<boolean> {
    return new Promise((resolve) => {
      const uri = ImageLocator.buildImageUri(this.props.image);
      if (uri) {
        const handleLoad = (): void => {
          this.handleLoad(uri);
          image.removeEventListener("load", handleLoad);
          resolve(true);
        };
        const image = new Image();
        image.addEventListener("load", handleLoad.bind(this));
        image.src = uri;
      }
    });
  }
}

export class ImageLocator {
  public static buildImageUri(image: string): any {
    return this.isUrl(image) ? image : require(`../../assets/${image}`).default;
  }

  private static isUrl(image: string): boolean {
    if (image.startsWith("//images.")) {
      return true;
    }

    let url;
    try {
      url = new URL(image);
    } catch (_) {
      return false;
    }

    return ["http:", "https:"].includes(url.protocol);
  }
}
