import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Fade } from 'react-awesome-reveal';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon
} from 'react-share';

interface ShareProps {
  url: string
  title: string
  body: string
  hashtag: string
}

export const SharePanel: React.FC<ShareProps> = ({ url, title, body, hashtag }: ShareProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const [slim, setSlim] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShow(window.scrollY > 0);
    });
    window.addEventListener('resize', () => {
      setSlim(window.innerWidth < 600);
    });
  }, []);

  const sanitize = useCallback((input: string): string => {
    return input.replace(/(<([^>]+)>)/gi, '');
  }, []);

  const prepareTitle = useCallback((title: string | undefined): string => {
    const prefix = 'DanielClarke.tech';
    return title ? `${prefix} - ${title}` : prefix;
  }, []);

  const size: number = 40;

  return (
    <Container className="share-panel">
      {show && (
        <Fade triggerOnce direction={slim ? 'up' : 'left'}>
          <LinkedinShareButton
            url={url}
            title={prepareTitle(title)}
            summary={sanitize(body)}
          >
            <LinkedinIcon size={size} />
          </LinkedinShareButton>

          <FacebookShareButton
            url={url}
            quote={prepareTitle(title)}
            hashtag={hashtag}
          >
            <FacebookIcon size={size} />
          </FacebookShareButton>

          <RedditShareButton
            url={url}
            title={prepareTitle(title)}
          >
            <RedditIcon size={size} />
          </RedditShareButton>

          <TwitterShareButton
            url={url}
            title={prepareTitle(title)}
            hashtags={[hashtag]}
          >
            <TwitterIcon size={size} />
          </TwitterShareButton>

          <WhatsappShareButton
            url={url}
            title={prepareTitle(title)}
            separator=" - "
          >
            <WhatsappIcon size={size} />
          </WhatsappShareButton>

          <EmailShareButton
            url={url}
            subject={prepareTitle(title)}
            body={sanitize(body)}
            separator=" - "
          >
            <EmailIcon size={size} />
          </EmailShareButton>
        </Fade>
      )}
    </Container>
  );
};
