import { Head } from "@/components/layout/Head";
import { MULTICALL_ABI, MULTICALL_SOLIDITY_INTERFACE } from "@/lib/constants";
import { classNames } from "@/lib/utils";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-solidity";
import "prismjs/themes/prism.css";
import { useEffect, useState } from "react";

const tabs = [
  {
    id: 0,
    name: "JSON",
    href: "#json",
    imgUri: "/json.svg",
    language: "json",
    abi: JSON.stringify(MULTICALL_ABI, null, 2),
  },
  {
    id: 1,
    name: "Solidity",
    href: "#solidity",
    imgUri: "/solidity.png",
    language: "solidity",
    abi: MULTICALL_SOLIDITY_INTERFACE,
  },
];

const hashToId = () => {
  const anchor = window.location.hash || "#json";
  const tab = tabs.find((tab) => tab.href === anchor);
  return tab ? tab.id : 0;
};

const idToHash = (id: number) => {
  const tab = tabs.find((tab) => tab.id === id);
  return tab ? tab.href : "#json";
};

const Abi = () => {
  const [selectedTab, setSelectedTab] = useState(hashToId());
  const [isLoading, setIsLoading] = useState(true);

  const onTabChange = (index: number) => {
    // We set `isLoading` to true to fade out the content while the tab is changing, to avoid
    // briefly showing un-highlighted code. This is set to false again in the `useEffect` hook.
    setIsLoading(true);
    setSelectedTab(index);
    window.location.hash = idToHash(index);
  };

  // This is required to re-highlight the code when the tab changes, and we use `setTimeout` with
  // a delay of 0 to ensure that the code is highlighted after the tab has changed. Otherwise the
  // `highlightAll` function runs before the code has been updated, so the code is not highlighted.
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
      setIsLoading(false);
    }, 0);
  }, [selectedTab]);

  return (
    <>
      <Head title="ABI" description="Multicall3 ABI in various formats" />
      <div className="content-center">
        <Tab.Group selectedIndex={selectedTab} onChange={onTabChange}>
          <Tab.List className="border-b border-gray-200 dark:border-gray-700 -mb-px flex space-x-8 justify-center">
            {tabs.map((tab) => {
              return (
                <Tab key={tab.name} className="focus:outline-0">
                  {({ selected }) => (
                    <div
                      className={classNames(
                        "group inline-flex items-center py-3 px-1 text-sm font-medium",
                        selected
                          ? "text-blue-800 dark:text-blue-300 border-b-2 border-b-blue-800 dark:border-b-blue-300 outline-none"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                      )}
                    >
                      <Image
                        src={tab.imgUri}
                        height={20}
                        width={20}
                        alt="JSON logo"
                        className="mr-2"
                      />
                      {tab.name}
                    </div>
                  )}
                </Tab>
              );
            })}
          </Tab.List>
          <Tab.Panels className="text-center" style={{ opacity: isLoading ? 0 : 1 }}>
            {tabs.map((tab) => {
              return (
                <Tab.Panel
                  key={tab.name}
                  className="mt-4 text-sm inline-block max-h-screen overflow-y-auto"
                >
                  <pre>
                    <code className={`language-${tab.language}`}>{tab.abi}</code>
                  </pre>
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Abi;
