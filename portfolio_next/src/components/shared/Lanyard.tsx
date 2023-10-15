/** @jsxImportSource theme-ui */

import React from 'react';
import { Badge } from 'react-bootstrap';
import { GenericComponentProps } from './props';

type LanyardProps = GenericComponentProps & {
  tags: string[]
};

export const Lanyard: React.FC<LanyardProps> = ({ tags, className }: LanyardProps): JSX.Element => {
  return (
    <div className={className}>
      {tags.map(
        (tag: string): JSX.Element => (
          <Badge
            key={tag}
            bg="portfolio"
            sx={{
              textTransform: 'capitalize',
              transition: 0.2,
              '&:hover': {
                margin: '0 1%',
                transform: 'scale(1.05)',
              }
            }}
          >
            {tag}
          </Badge>
        )
      )}
    </div>
  );
};
