"use client";

import CardHeader from "./card-header";
import CardItem from "./card-item";

export default function Dashboard({ data }) {
  return (
    <div className="flex flex-wrap align-center justify-center mt-4">
      <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
        <CardHeader title="Remuneração" subtitle="Detalhes da remuneração" />

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <CardItem
              title="Total Bruto:"
              value={`R$ ${data.remuneracao.totalBruto}`}
              colorClass="text-emerald-600"
            />

            <CardItem
              title="Vencimento Base:"
              value={`R$ ${data.remuneracao.base}`}
              colorClass="text-emerald-600"
            />

            <CardItem
              title={`Gratificação (${data.remuneracao.gratificacaoPerc}%):`}
              value={`R$ ${data.remuneracao.gratificao}`}
              colorClass="text-emerald-600"
            />

            <CardItem
              title={`GFE:`}
              value={`R$ ${data.remuneracao.gfe}`}
              colorClass="text-emerald-600"
            />
          </dl>
        </div>
      </div>
      <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
        <CardHeader title="Deduções" subtitle="Detalhes das deduções" />

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <CardItem
              title="IRPF:"
              value={`R$ ${data.deducoes.irpf}`}
              colorClass="text-red-600"
            />

            <CardItem
              title="Alimentacao:"
              value={`R$ ${data.deducoes.deducaoAlimentacao}`}
              colorClass="text-red-600"
            />

            <CardItem
              title="INSS:"
              value={`R$ ${data.deducoes.inss}`}
              colorClass="text-red-600"
            />
          </dl>
        </div>
      </div>
      <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
        <CardHeader title="Resumo" subtitle="Valores a receber" />

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <CardItem
              title="Líquido:"
              value={`R$ ${data.remuneracao.liquido}`}
              colorClass="text-sky-600"
            />

            <CardItem
              title="Alimentação:"
              value={`R$ ${data.outros.alimentacao}`}
              colorClass="text-sky-600"
            />

            <CardItem
              title={`FGTS (${data.outros.fgtsPerc}%):`}
              value={`R$ ${data.outros.fgts}`}
              colorClass="text-sky-600"
            />
          </dl>
        </div>
      </div>
    </div>
  );
}
