"use client";

import { useState } from "react";
import Dashboard from "./dashboard";
import CalcForm from "./form";

export default function Calculator() {
  const [data, setData] = useState(null);

  return (
    <div>
      <CalcForm setData={setData} />
      {data && <Dashboard data={data} />}
    </div>
  );
}
