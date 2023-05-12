import Link from 'next/link';
import { Head } from '@/components/layout/Head';
import { SITE_DESCRIPTION } from '@/lib/constants';

const Home = () => {
  const cards = [
    { id: 1, href: '/deployments', title: 'Deployments', subtitle: 'Deployed on 70+ chains' },
    { id: 2, href: '/abi', title: 'ABI', subtitle: 'In any format' },
    {
      id: 3,
      href: 'https://github.com/mds1/multicall',
      title: 'Documentation',
      subtitle: 'Learn more',
    },
  ];

  return (
    <>
      <Head />
      <div className='top-1/5 absolute left-1/2 mt-6 w-full -translate-x-1/2 transform sm:top-1/4 sm:mt-0 sm:w-8/12'>
        <h1 className='mb-10 text-center text-3xl font-bold text-blue-800 dark:text-blue-300 sm:text-4xl'>
          {SITE_DESCRIPTION}
        </h1>
        <dl className='mx-6 grid grid-cols-1 gap-x-12 gap-y-6 text-center sm:mx-0 sm:gap-y-16 lg:grid-cols-3'>
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              className='mx-auto flex w-full cursor-pointer flex-col gap-y-4 rounded-xl border border-blue-800/0 bg-gray-50 p-6 shadow hover:border-blue-800 dark:border-blue-300/0 dark:bg-gray-700 dark:hover:border-blue-300'
            >
              <dd className='order-first text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl'>
                {card.title}
              </dd>
              <dt className='text-base leading-7 text-gray-600 dark:text-gray-400'>
                {card.subtitle}
              </dt>
            </Link>
          ))}
        </dl>
      </div>
    </>
  );
};

export default Home;
