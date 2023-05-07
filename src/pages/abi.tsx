import { Head } from "@/components/layout/Head";
import {
  MULTICALL_ABI,
  MULTICALL_ABI_ETHERS,
  MULTICALL_ABI_VIEM,
  MULTICALL_SOLIDITY_INTERFACE,
} from "@/lib/constants";
import { classNames } from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";
import { Tab } from "@headlessui/react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import Image from "next/image";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-typescript";
import { useEffect, useState } from "react";

const tabs = [
  {
    name: "Solidity",
    href: "#solidity",
    imgUri: "/solidity.png",
    imgSize: "sm",
    language: "solidity",
    abi: MULTICALL_SOLIDITY_INTERFACE,
  },
  {
    name: "ethers.js",
    href: "#ethers-js",
    imgUri: "/ethersjs.png",
    language: "typescript",
    abi: MULTICALL_ABI_ETHERS,
  },
  {
    name: "viem",
    href: "#viem",
    imgUri: "/viem.png",
    language: "typescript",
    abi: MULTICALL_ABI_VIEM,
  },
  {
    name: "JSON",
    href: "#json",
    imgUri: "/json.svg",
    imgSize: "sm",
    language: "json",
    abi: JSON.stringify(MULTICALL_ABI, null, 2),
  },
  {
    name: "JSON (minified)",
    href: "#json-minified",
    imgUri: "/json.svg",
    imgSize: "sm",
    language: "json",
    abi: JSON.stringify(MULTICALL_ABI),
  },
];

const hashToIndex = () => {
  const anchor = window.location.hash || "#solidity";
  const index = tabs.findIndex((tab) => tab.href === anchor);
  return index === -1 ? 0 : index;
};

const indexToHash = (index: number) => {
  return tabs[index].href || "#solidity";
};

const Abi = () => {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState(hashToIndex());
  const [isLoading, setIsLoading] = useState(true);

  const onTabChange = (index: number) => {
    // We set `isLoading` to true to fade out the content while the tab is changing, to avoid
    // briefly showing un-highlighted code. This is set to false again in the `useEffect` hook.
    setIsLoading(true);
    setSelectedTab(index);
    window.location.hash = indexToHash(index);
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

  // We conditionally import the Prism theme based on the current theme, to adjust the syntax
  // highlighting to the theme. The logic in the `importTheme` function combined with the presence
  // of the `prism-light.css` and `prism-dark.css` files in the `public` folder is what allows us
  // to ensure all styles from the light theme are removed when the user toggles to the dark theme,
  // and vice versa.
  useEffect(() => {
    const importTheme = async () => {
      // Define the new stylesheet href based on the theme and get it's element.
      const newStylesheetHref = theme === "dark" ? "/prism-dark.css" : "/prism-light.css";
      const existingStylesheet = document.getElementById("dynamic-stylesheet");

      // If there's an existing stylesheet, remove it.
      existingStylesheet?.parentNode?.removeChild(existingStylesheet);

      // Create a new element for the new stylesheet, and append the stylesheet to the head.
      const newStylesheet = document.createElement("link");
      newStylesheet.rel = "stylesheet";
      newStylesheet.type = "text/css";
      newStylesheet.href = newStylesheetHref;
      newStylesheet.id = "dynamic-stylesheet";
      document.head.appendChild(newStylesheet);
    };
    importTheme();
  }, [theme]);

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
                        height={tab.imgSize === "sm" ? 16 : 20}
                        width={tab.imgSize === "sm" ? 16 : 20}
                        alt="JSON logo"
                        className="mr-2"
                        style={{
                          filter:
                            theme === "dark" ? "invert(1) brightness(1) saturate(0)" : undefined,
                        }}
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
                  className="relative mt-4 text-sm inline-block max-w-full max-h-screen overflow-x-auto overflow-y-auto shadow-md"
                >
                  <button
                    className="absolute top-4 right-3 z-10 p-1 border border-gray-600 dark:border-gray-300 rounded-md focus:outline-0"
                    style={{
                      // Blur the background behind the copy button.
                      background: "rgba(0, 0, 0, 0.0)",
                      backdropFilter: "blur(4px)",
                    }}
                    onClick={() => copyToClipboard(tab.abi)}
                  >
                    <ClipboardDocumentIcon className="h-6 w-6" />
                  </button>
                  <pre className="rounded-lg">
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
