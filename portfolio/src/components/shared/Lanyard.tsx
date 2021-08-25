import { Component, HTMLAttributes } from "react";
import { Badge } from "react-bootstrap";

import "./Lanyard.scss";

type LanyardProps = {
    tags: string[];
};

export class Lanyard extends Component<LanyardProps & HTMLAttributes<HTMLImageElement>> {
    render(): JSX.Element {
        return (
            <div className={`${this.props.className} lanyard`}>
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