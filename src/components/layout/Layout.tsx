import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900'>
      <Header />
      <main className='my-4 h-full w-full flex-1 px-4 text-gray-800 dark:text-gray-100 sm:px-6 md:justify-between lg:px-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
