"use client";

import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";

type QueueTableProps = {
  headers: string[];
  rows: ReactNode[][];
};

export const QueueTable = ({ headers, rows }: QueueTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-950/90 text-zinc-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b border-zinc-50/20 p-4 text-center font-bold text-sm sm:text-base whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-zinc-800 hover:bg-zinc-700/60 text-zinc-200 transition duration-200 ease-in-out"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border-b border-zinc-50/20 p-4 text-center text-sm sm:text-base ${
                    cellIndex === 0 ? "font-medium" : ""
                  } ${cellIndex === 3 ? "text-green-500 font-bold" : ""}
                  ${cellIndex === 4 ? <div>

                    <Button>
                      Baixo
                    </Button>
                  </div> : ""}`}
                >
                  <div className="min-w-max break-words">{cell}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};