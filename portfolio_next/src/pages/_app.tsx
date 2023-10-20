import 'bootstrap/dist/css/bootstrap.min.css';
import 'devicon/devicon.min.css';
import 'highlight.js/scss/tomorrow-night-eighties.scss';
import { AppProps } from 'next/app';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import 'react-vertical-timeline-component/style.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './styles/global.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <main id="#root">
    <GoogleAnalytics trackPageViews />
    <Component {...pageProps} />
  </main>
);

export default MyApp;
