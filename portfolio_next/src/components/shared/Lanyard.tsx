import React, { HTMLAttributes } from 'react';
import { Badge } from 'react-bootstrap';

type LanyardProps = HTMLAttributes<HTMLImageElement> & {
  tags: string[]
};

export const Lanyard: React.FC<LanyardProps> = ({ tags, className }: LanyardProps): JSX.Element => {
  return (
    <div className={`${className} lanyard`}>
      {tags.map(
        (tag: string): JSX.Element => (
          <Badge key={tag} bg="portfolio" className="tag">
            {tag}
          </Badge>
        )
      )}
    </div>
  );
};
