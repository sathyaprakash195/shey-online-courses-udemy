import React from "react";

function ReportCard({
  name,
  value,
  showCurrency = false,
}: {
  name: string;
  value: number;
  showCurrency?: boolean;
}) {
  return (
    <div className="p-5 border border-primary rounded-sm bg-gray-100 flex flex-col gap-5">
      <h1 className="text-sm">{name}</h1>
      <h1 className="text-6xl font-bold text-center">
        {showCurrency && "$"}
        {value}
      </h1>
    </div>
  );
}

export default ReportCard;
