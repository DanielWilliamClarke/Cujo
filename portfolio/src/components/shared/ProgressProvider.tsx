import React from "react";

type ProgressProps = {
  valueStart: number;
  valueEnd: number;
  children: (value: number) => JSX.Element;
};

type ProgressState = {
  value: number;
  timeout?: number;
};

export class ProgressProvider extends React.Component<
  ProgressProps,
  ProgressState
> {
  constructor(props: ProgressProps) {
    super(props);
    this.state = {
      value: this.props.valueStart,
      timeout: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      timeout: window.setTimeout(() => {
        this.setState({
          value: this.props.valueEnd,
        });
      }, 0),
    });
  }

  componentDidUpdate(prevProps: ProgressProps, prevState: ProgressState) {
    if (prevProps.valueEnd !== this.props.valueEnd) {
      this.setState({
        value: this.props.valueEnd,
      });
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.timeout);
  }

  render(): JSX.Element {
    return this.props.children(this.state.value);
  }
}
