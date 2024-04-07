/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart,
  ChevronDown,
  Home,
  PieChart,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Products = () => {
  return (
    <div>
      <div className="flex gap-4">
        <div>
          <h3 className="mb-2 text-sm font-medium">Startup</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            Bookkeeping
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            Invoicing
          </a>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Scaleup</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            Live Coaching
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            Reviews
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            Tax/VAT
          </a>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Enterprise</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            White glove
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            SOX Compliance
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            Staffing
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            More
          </a>
        </div>
      </div>

      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-blue-500">
        <span>View more</span>
        <ArrowRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <Home
          size={20}
          strokeWidth={1.5}
          className="mb-2 text-xl text-blue-500"
        />
        <span className="text-xs">Startup</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <BarChart
          size={20}
          strokeWidth={1.5}
          className="mb-2 text-xl text-blue-500"
        />
        <span className="text-xs">Scaleup</span>
      </a>
      <a
        href="#"
        className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
      >
        <PieChart
          size={20}
          strokeWidth={1.5}
          className="mb-2 text-xl text-blue-500"
        />
        <span className="text-xs">Enterprise</span>
      </a>
    </div>
  );
};

const Blog = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <a href="#">
          <img
            className="mb-2 h-14 w-full rounded object-cover"
            src="https://avatars.githubusercontent.com/u/26369276?v=4"
            alt="Placeholder image"
          />
          <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
          <p className="text-xs text-neutral-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
            quidem eos.
          </p>
        </a>
        <a href="#">
          <img
            className="mb-2 h-14 w-full rounded object-cover"
            src="https://avatars.githubusercontent.com/u/26369276?v=4"
            alt="Placeholder image"
          />
          <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
          <p className="text-xs text-neutral-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
            quidem eos.
          </p>
        </a>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-blue-500">
        <span>View more</span>
        <ArrowRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
};

const TABS = [
  {
    title: "Products",
    Component: Products,
  },
  {
    title: "Pricing",
    Component: Pricing,
  },
  {
    title: "Blog",
    Component: Blog,
  },
].map((tab, index) => {
  return { ...tab, id: index + 1 };
});

type TabProps = {
  selected: number | null;
  handleTabFocus: (val: number | null) => void;
  tabId: number;
  children: React.ReactNode;
};

const Tab = (props: TabProps) => {
  const { children, selected, tabId, handleTabFocus } = props;

  return (
    <button
      id={`shift-tab-${tabId}`}
      onClick={() => handleTabFocus(tabId)}
      onMouseEnter={() => handleTabFocus(tabId)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tabId
          ? "bg-neutral-800 text-neutral-100"
          : "text-neutral-400"
      }`}
    >
      <span>{children}</span>
      <ChevronDown
        className={`transition-transform ${
          selected === tabId ? "rotate-180" : ""
        }`}
        size={20}
        strokeWidth={1.5}
        color="#fff"
      />
    </button>
  );
};

const Nub = ({ selectedTab }: { selectedTab: number | null }) => {
  const nubRef = useRef<HTMLSpanElement>(null);
  const [left, setLeft] = useState<number>(0);

  const moveNub = () => {
    if (selectedTab) {
      // Get hovered tab
      const hoveredTab = document.getElementById(`shift-tab-${selectedTab}`);
      // Get overlay content, to calculate the position of the nub
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      // getBoundingClientRect means the position of the element relative to the viewport
      const tabRect = hoveredTab.getBoundingClientRect();
      // getBoundingClientRect means the position of the element relative to the viewport
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      // Calculate the center of the tab
      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  useEffect(() => {
    moveNub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  return (
    <motion.span
      ref={nubRef}
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

type ContentProps = {
  direction: null | "left" | "right";
  selectedTab: number;
};

const Content = (props: ContentProps) => {
  const { direction, selectedTab } = props;

  return (
    <motion.div
      id="overlay-content"
      className="absolute left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-700 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-900 p-4"
    >
      {/* Bridge while mouse leave */}
      <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
      {/* Nub slider  */}
      <Nub selectedTab={selectedTab} />
      {/*  */}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
      >
        {TABS.map((tab) => {
          const x =
            direction === "left" ? 100 : direction === "right" ? -100 : 0;

          return (
            <div key={tab.id} className="overflow-hidden">
              {tab.id === selectedTab ? (
                <motion.div
                  initial={{ opacity: 0, x: x }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <tab.Component />
                </motion.div>
              ) : null}
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [direction, setDirection] = useState<null | "left" | "right">(null);

  const handleTabFocus = (val: number | null) => {
    // if(typeof selectedTab === "number" && typeof val === "number") {
    //   setDirection(selectedTab > val ? "right" : "left");
    // } else if (val === null) {
    //   setDirection(null);
    // }

    if (val === null) {
      setDirection(null);
      setSelectedTab(null);
      return;
    }

    if (selectedTab) {
      setDirection(selectedTab > val ? "right" : "left");
    }

    setSelectedTab(val);
  };

  return (
    <div
      onMouseLeave={() => handleTabFocus(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS.map((tab) => {
        return (
          <Tab
            key={tab.id}
            selected={selectedTab}
            handleTabFocus={handleTabFocus}
            tabId={tab.id}
          >
            {tab.title}
          </Tab>
        );
      })}

      {selectedTab ? (
        <AnimatePresence>
          <Content direction={direction} selectedTab={selectedTab} />
        </AnimatePresence>
      ) : null}
    </div>
  );
};

export function ShiftingDropdown() {
  return (
    <div className="flex h-dvh pt-20 w-full justify-center bg-neutral-950 p-8 text-neutral-200 md:justify-center">
      <Tabs />
    </div>
  );
}
