import { AppProps } from 'next/app'

import './styles/global.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <div id="#root">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp