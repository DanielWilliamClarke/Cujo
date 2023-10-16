/** @jsxImportSource theme-ui */

import React from 'react';
import { Badge } from 'react-bootstrap';
import { usePositionContext } from './PositionContext';

type LanyardProps = {
  tags: string[]
};

export const Lanyard: React.FC<LanyardProps> = ({ tags }: LanyardProps): JSX.Element => {
  const { even } = usePositionContext();
  return (
    <div>
      {tags.map(
        (tag: string): JSX.Element => (
          <Badge
            key={tag}
            bg="portfolio"
            sx={{
              backgroundColor: even ? 'accent' : 'secondary',
              textTransform: 'capitalize',
              transition: '0.2',
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
