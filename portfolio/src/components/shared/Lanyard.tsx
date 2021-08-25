import { Component } from "react";
import { Badge } from "react-bootstrap";

type LanyardProps = {
    tags: string[];
};

export class Lanyard extends Component<LanyardProps> {
    render(): JSX.Element {
        return (
            <div>
                {this.props.tags.map(
                    (tag: string): JSX.Element => (
                        <Badge bg="portfolio" className="tag">
                            {tag}
                        </Badge>
                    ))}
            </div>
        );
    }
}