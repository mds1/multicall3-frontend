import { COMPANY_NAME, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const currentPath = useRouter().pathname;

  const NavLink = (props: { path: string; label: string; className?: string }) => {
    const activeClass = props.path === currentPath ? "font-bold" : "";
    return (
      <Link
        href={props.path}
        className={`text-base text-gray-500 dark:text-gray-400 ${activeClass} ${props.className}`}
        target={props.path.startsWith("http") ? "_blank" : undefined}
      >
        {props.label}
      </Link>
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:space-x-10">
      <div>
        <Link href="/" className="flex">
          <span className="sr-only">{COMPANY_NAME}</span>
          <span className="font-bold font-mono text-blue-800 dark:text-blue-300">{SITE_NAME}</span>
          {/* <Image className="h-8 w-auto rounded-full sm:h-10" src={logo} alt="logo" /> */}
        </Link>
      </div>

      <div>
        <NavLink path="/deployments" label="Deployments" className="mr-4" />
        <NavLink path="/abi" label="ABI" className="mr-4" />
        <NavLink path="https://github.com/mds1/multicall" label="Documentation" />
      </div>
    </div>
  );
};
