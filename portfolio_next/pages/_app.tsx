import { AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vertical-timeline-component/style.min.css';
import 'highlight.js/scss/tomorrow-night-eighties.scss';

// This is real dumb
import '../src/components/backstretch/Copyright.scss';
import '../src/components/backstretch/ScrollIndicator.scss';
import '../src/components/backstretch/SketchBackstretch.scss';
import '../src/components/blog/BlogPost.scss';
import '../src/components/blog/Blog.scss';
import '../src/components/contact/Contact.scss';
import '../src/components/cv/CVPreview.scss';
import '../src/components/nav/NavPanel.scss';
import '../src/components/nav/SharePanel.scss';
import '../src/components/profile/About.scss';
import '../src/components/profile/Education.scss';
import '../src/components/profile/Experience.scss';
import '../src/components/profile/Projects.scss';
import '../src/components/profile/Technical.scss';
import '../src/components/shared/BlockReverseLoading.scss';
import '../src/components/shared/DevIcon.scss';
import '../src/components/shared/Lanyard.scss';
import '../src/components/shared/Portfolio.scss';
import '../src/components/shared/TriangleDivider.scss';
import '../src/components/theme/ThemeSetter.scss';
import '../src/components/App.scss';
import '../src/Cujo.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <div id="#root">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp