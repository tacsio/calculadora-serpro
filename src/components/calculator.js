"use client";

import { useState } from "react";
import Dashboard from "./dashboard";
import CalcForm from "./form";
import Image from "next/image";
import Link from "next/link";

export default function Calculator() {
  const [data, setData] = useState(null);

  return (
    <div>
      <Link
        href={"https://github.com/tacsio/calculadora-serpro"}
        className="github_banner"
      >
        View on GitHub
      </Link>

      <CalcForm setData={setData} />
      {data && <Dashboard data={data} />}
    </div>
  );
}
