import { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vertical-timeline-component/style.min.css';
import 'highlight.js/scss/tomorrow-night-eighties.scss';
import 'devicon/devicon.min.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './styles/global.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <main id="#root">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp