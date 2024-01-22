"use client";

import Deducoes from "./dashboard/deducoes";
import Remuneracao from "./dashboard/remuneracao";
import Resumo from "./dashboard/resumo";

export default function Dashboard({ data }) {
  return (
    <div className="flex flex-wrap align-center justify-center mt-4">
      <Remuneracao remuneracao={data.remuneracao} />
      <Deducoes deducoes={data.deducoes} />
      <Resumo data={data} />
    </div>
  );
}
