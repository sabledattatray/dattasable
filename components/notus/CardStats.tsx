'use client';
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CardStatsProps {
  statSubtitle: string;
  statTitle: string;
  statArrow: "up" | "down";
  statPercent: string;
  statPercentColor: string;
  statDescripiron: string;
  statIconName: React.ReactNode;
  statIconColor: string;
}

export default function CardStats({
  statSubtitle = "Traffic",
  statTitle = "350,897",
  statArrow = "up",
  statPercent = "3.48",
  statPercentColor = "text-emerald-500",
  statDescripiron = "Since last month",
  statIconName = <TrendingUp />,
  statIconColor = "bg-red-500",
}: CardStatsProps) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-slate-400 uppercase font-bold text-xs">
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-slate-700">
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                {statIconName}
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-4">
            <span className={statPercentColor + " mr-2"}>
              <i
                className={
                  statArrow === "up"
                    ? "fas fa-arrow-up"
                    : "fas fa-arrow-down"
                }
              ></i>{" "}
              {statPercent}%
            </span>
            <span className="whitespace-nowrap">{statDescripiron}</span>
          </p>
        </div>
      </div>
    </>
  );
}
