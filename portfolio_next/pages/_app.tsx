import { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vertical-timeline-component/style.min.css';
import 'highlight.js/scss/tomorrow-night-eighties.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default MyApp