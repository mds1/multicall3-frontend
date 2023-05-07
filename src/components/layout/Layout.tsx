import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900'>
      <Header />
      <main className='flex-1 h-full w-full px-4 text-gray-800 dark:text-gray-100 sm:px-6 md:justify-between lg:px-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
