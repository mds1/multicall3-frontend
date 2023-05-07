import { Head } from "@/components/layout/Head";
import { ArrowTopRightOnSquareIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useEffect, useRef } from "react";

const deployments = [
  {
    name: "Mainnet",
    chainId: 1,
    url: "https://etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Kovan",
    chainId: 42,
    url: "https://kovan.etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Rinkeby",
    chainId: 4,
    url: "https://rinkeby.etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Görli",
    chainId: 5,
    url: "https://goerli.etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Ropsten",
    chainId: 3,
    url: "https://ropsten.etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Sepolia",
    chainId: 11155111,
    url: "https://sepolia.etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Optimism",
    chainId: 10,
    url: "https://optimistic.etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Optimism Kovan",
    chainId: 69,
    url: "https://kovan-optimistic.etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Optimism Görli",
    chainId: 420,
    url: "https://blockscout.com/optimism/goerli/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Arbitrum",
    chainId: 42161,
    url: "https://arbiscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Arbitrum Nova",
    chainId: 42170,
    url: "https://nova.arbiscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Arbitrum Görli",
    chainId: 421613,
    url: "https://goerli-rollup-explorer.arbitrum.io/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Arbitrum Rinkeby",
    chainId: 421611,
    url: "https://testnet.arbiscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Polygon",
    chainId: 137,
    url: "https://polygonscan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Mumbai",
    chainId: 80001,
    url: "https://mumbai.polygonscan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Polygon zkEVM",
    chainId: 1101,
    url: "https://zkevm.polygonscan.com/address/0xca11bde05977b3631167028862be2a173976ca11#code",
  },
  {
    name: "Polygon zkEVM Testnet",
    chainId: 1442,
    url: "https://testnet-zkevm.polygonscan.com/address/0xca11bde05977b3631167028862be2a173976ca11#code",
  },
  {
    name: "Gnosis Chain (xDai",
    chainId: 100,
    url: "https://blockscout.com/xdai/mainnet/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Avalanche",
    chainId: 43114,
    url: "https://snowtrace.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Avalanche Fuji",
    chainId: 43113,
    url: "https://testnet.snowtrace.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Fantom Testnet",
    chainId: 4002,
    url: "https://testnet.ftmscan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Fantom Opera",
    chainId: 250,
    url: "https://ftmscan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "BNB Smart Chain",
    chainId: 56,
    url: "https://bscscan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "BNB Smart Chain Testnet",
    chainId: 97,
    url: "https://testnet.bscscan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Moonbeam",
    chainId: 1284,
    url: "https://moonscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Moonriver",
    chainId: 1285,
    url: "https://moonriver.moonscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Moonbase Alpha Testnet",
    chainId: 1287,
    url: "https://moonbase.moonscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Harmony",
    chainId: 1666600000,
    url: "https://explorer.harmony.one/address/0xcA11bde05977b3631167028862bE2a173976CA11?activeTab=7",
  },
  {
    name: "Cronos",
    chainId: 25,
    url: "https://cronoscan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Fuse",
    chainId: 122,
    url: "https://explorer.fuse.io/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Flare Mainnet",
    chainId: 14,
    url: "https://flare-explorer.flare.network/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Songbird Canary Network",
    chainId: 19,
    url: "https://songbird-explorer.flare.network/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Coston Testnet",
    chainId: 16,
    url: "https://coston-explorer.flare.network/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Coston2 Testnet",
    chainId: 114,
    url: "https://coston2-explorer.flare.network/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Boba",
    chainId: 288,
    url: "https://blockexplorer.boba.network/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Aurora",
    chainId: 1313161554,
    url: "https://explorer.mainnet.aurora.dev/address/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "Astar",
    chainId: 592,
    url: "https://blockscout.com/astar/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "OKC",
    chainId: 66,
    url: "https://www.oklink.com/en/okc/address/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "Heco Chain",
    chainId: 128,
    url: "https://hecoinfo.com/address/0xcA11bde05977b3631167028862bE2a173976CA11#code",
  },
  {
    name: "Metis",
    chainId: 1088,
    url: "https://andromeda-explorer.metis.io/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Metis Goerli",
    chainId: 599,
    url: "https://goerli.explorer.metisdevops.link/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "RSK",
    chainId: 30,
    url: "https://explorer.rsk.co/address/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "RSK Testnet",
    chainId: 31,
    url: "https://explorer.testnet.rsk.co/address/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "Evmos",
    chainId: 9001,
    url: "https://evm.evmos.org/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Evmos Testnet",
    chainId: 9000,
    url: "https://evm.evmos.dev/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Thundercore",
    chainId: 108,
    url: "https://viewblock.io/thundercore/address/0xcA11bde05977b3631167028862bE2a173976CA11?tab=code",
  },
  {
    name: "Thundercore Testnet",
    chainId: 18,
    url: "https://explorer-testnet.thundercore.com/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Oasis",
    chainId: 42262,
    url: "https://explorer.emerald.oasis.dev/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Celo",
    chainId: 42220,
    url: "https://explorer.celo.org/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Celo Alfajores Testnet",
    chainId: 44787,
    url: "https://explorer.celo.org/alfajores/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Godwoken",
    chainId: 71402,
    url: "https://v1.gwscan.com/account/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "Godwoken Testnet",
    chainId: 71401,
    url: "https://gw-explorer.nervosdao.community/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Klaytn",
    chainId: 8217,
    url: "https://scope.klaytn.com/account/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "Milkomeda",
    chainId: 2001,
    url: "https://explorer-mainnet-cardano-evm.c1.milkomeda.com/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "KCC",
    chainId: 321,
    url: "https://explorer.kcc.io/en/address/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "Velas",
    chainId: 106,
    url: "https://evmexplorer.velas.com/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Telos",
    chainId: 40,
    url: "https://www.teloscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#contract",
  },
  {
    name: "Step Network",
    chainId: 1234,
    url: "https://stepscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Canto",
    chainId: 7700,
    url: "https://evm.explorer.canto.io/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Iotex",
    chainId: 4689,
    url: "https://iotexscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#transactions",
  },
  {
    name: "Bitgert",
    chainId: 32520,
    url: "https://brisescan.com/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Kava",
    chainId: 2222,
    url: "https://explorer.kava.io/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts",
  },
  {
    name: "Mantle Testnet",
    chainId: 5001,
    url: "https://explorer.testnet.mantle.xyz/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Shardeum Sphinx",
    chainId: 8082,
    url: "https://explorer.testnet.mantle.xyz/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Base Testnet",
    chainId: 84531,
    url: "https://goerli.basescan.org/address/0xca11bde05977b3631167028862be2a173976ca11#code",
  },
  {
    name: "DFK Chain Test",
    chainId: 335,
    url: "https://subnets-test.avax.network/defi-kingdoms/address/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "DFK Chain",
    chainId: 53935,
    url: "https://subnets.avax.network/defi-kingdoms/address/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
  {
    name: "Neon EVM DevNet",
    chainId: 245022926,
    url: "https://devnet.neonscan.org/address/0xcA11bde05977b3631167028862bE2a173976CA11#contract",
  },
  {
    name: "Linea Goerli Testnet",
    chainId: 59140,
    url: "https://explorer.goerli.linea.build/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Hashbit",
    chainId: 11119,
    url: "https://explorer.hashbit.org/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Syscoin",
    chainId: 57,
    url: "https://explorer.syscoin.org/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Syscoin Tannebaum Testnet",
    chainId: 5700,
    url: "https://tanenbaum.io/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Syscoin Tannebaum Rollux",
    chainId: 57000,
    url: "https://rollux.tanenbaum.io/address/0xcA11bde05977b3631167028862bE2a173976CA11/contracts#address-tabs",
  },
  {
    name: "Pulsechain v4 Testnet",
    chainId: 943,
    url: "https://scan.v4.testnet.pulsechain.com/address/0xcA11bde05977b3631167028862bE2a173976CA11",
  },
];

const Deployments = () => {
  // -------- Focus search input when user presses Cmd/Ctrl + K --------
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modifierKey = navigator.userAgent.includes("Mac") ? "Cmd" : "Ctrl";

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

  // -------- Render --------
  return (
    <>
      <Head title="Deployments" description="Multicall3 deployments" />
      <div className="flex justify-center">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 align-middle sm:px-6 lg:px-8">
            <div className="mb-4 relative">
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 opacity-60 pointer-events-none">
                {modifierKey} + K
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
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      <div
                        className="group inline-flex cursor-pointer p-1 rounded-md hover:bg-gray-200"
                        onClick={() => onHeaderClick("name")}
                      >
                        Name
                        <span className="ml-2 flex-none rounded text-gray-900">
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <div
                        className="group inline-flex cursor-pointer p-1 rounded-md hover:bg-gray-200"
                        onClick={() => onHeaderClick("chainId")}
                      >
                        Chain ID
                        <span className="ml-2 flex-none rounded text-gray-900">
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
                      className='group'
                      onClick={() => window.open(deployment.url, "_blank", "noopener,noreferrer")}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {deployment.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Deployments;
