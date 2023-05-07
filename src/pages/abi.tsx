import { Head } from "@/components/layout/Head";
import { classNames } from "@/lib/utils";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";

const tabs = [
  { id: 0, name: "JSON", href: "#json", imgUri: "/json.svg", current: false },
  { id: 1, name: "Solidity", href: "#solidity", imgUri: "/solidity.png", current: true },
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

  const onTabChange = (index: number) => {
    setSelectedTab(index);
    window.location.hash = idToHash(index);
  };

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
                        className='mr-2'
                      />
                      {tab.name}
                    </div>
                  )}
                </Tab>
              );
            })}
          </Tab.List>
          <Tab.Panels className="text-center">
            {tabs.map((tab) => {
              return (
                <Tab.Panel key={tab.name} className="mt-4">
                  {tab.name}
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
