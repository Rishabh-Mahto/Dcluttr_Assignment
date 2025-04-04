"use client";

import { useState } from "react";
import {
  Home,
  Images,
  Tv,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Settings,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function Sidebar() {
  const [isChannelsOpen, setIsChannelsOpen] = useState<boolean | undefined>(
    false
  );

  return (
    <div className=" flex flex-col justify-between space-y-1 bg-[#F8F8F8] h-screen px-4 py-6 rounded-lg ">
      <div>
        {" "}
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-[10px] cursor-pointer"
        >
          <Home size={20} color="#7E8986" />
          <span className="text-sm text-[#031B15] font-medium">Overview</span>
        </a>
        <Collapsible open={isChannelsOpen} onOpenChange={setIsChannelsOpen}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-[10px] cursor-pointer">
              <Tv size={20} color="#7E8986" />
              <span className="text-sm text-[#031B15] font-medium">
                Channels
              </span>
              {isChannelsOpen ? (
                <ChevronUp size={20} color="#031B15" className="ml-auto" />
              ) : (
                <ChevronDown size={20} color="#031B15" className="ml-auto" />
              )}
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="pl-6 space-y-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer"
              >
                Meta Ads
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer"
              >
                Google Ads
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm bg-[#DFEAE8] text-[#027056] font-medium rounded-lg cursor-pointer"
              >
                Quick Commerce
              </a>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <Images size={20} color="#7E8986" />
          <span className="text-sm text-[#031B15] font-medium">Creatives</span>
        </a>
      </div>

      <div className="flex flex-col h-[82px] gap-2">
        <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
          <CircleHelp size={20} color="#7E8986" />
          <span className="text-sm text-[#031B15] font-medium">Help</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
          <Settings size={20} color="#7E8986" />
          <span className="text-sm text-[#031B15] font-medium">Settings</span>
        </div>
      </div>
    </div>
  );
}
