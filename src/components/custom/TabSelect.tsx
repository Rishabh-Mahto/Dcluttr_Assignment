import { useState } from "react";

interface Tab {
  label: string;
  icon?: string;
  value: string;
  bgColor: string;
  textColor: string;
}

interface TabSelectProps {
  tabs: Tab[];
  onChange?: (value: string) => void;
}

export default function TabSelect({ tabs, onChange }: TabSelectProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || "");

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="flex space-x-2 h-[40px] bg-white p-1 rounded-lg border-[0.5px] border-[#EBEBEB]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            style={{
              backgroundColor: isActive ? tab.bgColor : "transparent",
              color: isActive ? tab.textColor : "#9CA3AF",
            }}
            className="flex items-center text-sm font-medium cursor-pointer px-[14px] py-[6px] rounded-md transition-all leading-5"
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.icon && (
              <img
                src={tab.icon}
                alt={tab.label}
                className={`w-4 h-4 mr-2  ${
                  isActive ? "opacity-100" : "opacity-30"
                }`}
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
