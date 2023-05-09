import { Head } from "@/components/layout/Head";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ArrowTopRightOnSquareIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

type Deployment = {
  name: string;
  chainId: number;
  url: string;
};

const Deployments = () => {
  // -------- Fetch deployments --------
  const [deployments, setDeployments] = useState([] as Deployment[]);
  const [isLoading, setIsLoading] = useState(true);
  const deploymentsUrl =
    "https://github.com/mds1/multicall/blob/chore/readme-and-examples/deployments.json";
  const deploymentsUrlRaw =
    "https://raw.githubusercontent.com/mds1/multicall/chore/readme-and-examples/deployments.json";

  useEffect(() => {
    setIsLoading(true);
    fetch(deploymentsUrlRaw)
      .then((response) => response.json())
      .then((data) => setDeployments(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // -------- Focus search input when user presses Cmd/Ctrl + K --------
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modifierKey = navigator.userAgent.includes("Mac") ? "⌘ " : "Ctrl + ";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // -------- Sorting and filtering --------
  const [sortField, setSortField] = useState(null as "name" | "chainId" | null);
  const [sortDirection, setSortDirection] = useState("ascending");
  const [search, setSearch] = useState("");

  const onHeaderClick = (field: "name" | "chainId") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "ascending" ? "descending" : "ascending");
    } else {
      setSortField(field);
      setSortDirection("ascending");
    }
  };

  const sortedDeployments = deployments.sort((a, b) => {
    // Don't change default sort order if sort field is null.
    if (sortField === null) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortDirection === "ascending") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const filteredDeployments = sortedDeployments.filter(
    (deployment) =>
      deployment.name.toLowerCase().includes(search.toLowerCase()) ||
      deployment.chainId.toString().includes(search),
  );

  const loadingDiv = () => (
    <div className="mt-8">
      <LoadingSpinner />
      <p className="mt-4 italic text-gray-500 dark:text-gray-300">Fetching deployments...</p>
    </div>
  );

  const errorDiv = () => (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          Oops!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          Something went wrong fetching the list of deployments.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Try again
          </button>
          <a
            href={deploymentsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm font-semibold text-gray-900 dark:text-gray-50"
          >
            View as JSON <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  );

  const deploymentsTableDiv = () => (
    <>
      <div className="mb-4 relative">
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-300 opacity-60 dark:opacity-70 pointer-events-none">
          {modifierKey}K
        </span>
        <input
          type="text"
          className="w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 block border-gray-300 rounded-md px-4 py-2"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={searchInputRef}
        />
      </div>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-50 sm:pl-6"
              >
                <div
                  className="group inline-flex cursor-pointer p-1 rounded-md hover:bg-gray-200 hover:dark:bg-gray-700"
                  onClick={() => onHeaderClick("name")}
                >
                  Name
                  <span className="ml-2 flex-none rounded text-gray-900 dark:text-gray-50">
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-50"
              >
                <div
                  className="group inline-flex cursor-pointer p-1 rounded-md hover:bg-gray-200 hover:dark:bg-gray-700"
                  onClick={() => onHeaderClick("chainId")}
                >
                  Chain ID
                  <span className="ml-2 flex-none rounded text-gray-900 dark:text-gray-50">
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </th>
              <th scope="col" className="relative pr-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white cursor-pointer">
            {filteredDeployments.map((deployment) => (
              <tr
                key={deployment.chainId}
                className='group dark:bg-gray-800'
                onClick={() => window.open(deployment.url, "_blank", "noopener,noreferrer")}
              >
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-50 sm:pl-6">
                  {deployment.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {deployment.chainId}
                </td>
                <td className="relative pr-4">
                  <div className='hyperlink opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Open contract in block explorer</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  // -------- Render --------
  return (
    <>
      <Head title="Deployments" description="Multicall3 deployments" />
      <div className="flex justify-center">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
            {isLoading && loadingDiv()}
            {!isLoading && deployments.length === 0 && errorDiv()}
            {!isLoading && deployments.length > 0 && deploymentsTableDiv()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Deployments;
