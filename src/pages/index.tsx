import { Head } from '@/components/layout/Head';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

const Home = () => {
  return (
    <>
      <Head />
      <h1 className="text-center">{SITE_NAME}</h1>
      <p className="text-center">{SITE_DESCRIPTION}</p>
    </>
  );
};

export default Home;
