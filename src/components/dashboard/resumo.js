import CardHeader from "../card-header";
import CardItem from "../card-item";

export default function Resumo({ data }) {
  return (
    <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
      <CardHeader title="Resumo" subtitle="Valores a receber" info="Não adicionado fgts" />
      <dd className="mt-1 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0 text-sky-600 italic">
        {`R$ ${data.totais}`}
      </dd>

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
  );
}
