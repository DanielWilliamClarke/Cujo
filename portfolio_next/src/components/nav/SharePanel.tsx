import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Reveal } from '../shared/Reveal';
import { event } from "nextjs-google-analytics";

import {
  EmailIcon, EmailShareButton,
  FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton
} from 'react-share';

type ShareProps = {
  url: string
  title: string
  body: string
  hashtag: string
}

const emitClickEvent = (social: string) => {
  event("dc_user_event", {
    category: "Share redirect activation",
    label: social
  });
};

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
    const prefix = 'danclarke.dev';
    return title ? `${prefix} - ${title}` : prefix;
  }, []);

  const size: number = 40;

  return (
    <Container className="share-panel">
      {show && (
        <Reveal direction={slim ? 'up' : 'left'}>
          <LinkedinShareButton
            url={url}
            title={prepareTitle(title)}
            summary={sanitize(body)}
            onClick={() => emitClickEvent("LinkedIn")}
          >
            <LinkedinIcon size={size} />
          </LinkedinShareButton>

          <FacebookShareButton
            url={url}
            quote={prepareTitle(title)}
            hashtag={hashtag}
            onClick={() => emitClickEvent("Facebook")}
          >
            <FacebookIcon size={size} />
          </FacebookShareButton>

          <RedditShareButton
            url={url}
            title={prepareTitle(title)}
            onClick={() => emitClickEvent("Reddit")}
          >
            <RedditIcon size={size} />
          </RedditShareButton>

          <TwitterShareButton
            url={url}
            title={prepareTitle(title)}
            hashtags={[hashtag]}
            onClick={() => emitClickEvent("Twitter")}
          >
            <TwitterIcon size={size} />
          </TwitterShareButton>

          <WhatsappShareButton
            url={url}
            title={prepareTitle(title)}
            separator=" - "
            onClick={() => emitClickEvent("Whatsapp")}
          >
            <WhatsappIcon size={size} />
          </WhatsappShareButton>

          <EmailShareButton
            url={url}
            subject={prepareTitle(title)}
            body={sanitize(body)}
            separator=" - "
            onClick={() => emitClickEvent("Email")}
          >
            <EmailIcon size={size} />
          </EmailShareButton>
        </Reveal>
      )}
    </Container>
  );
};
