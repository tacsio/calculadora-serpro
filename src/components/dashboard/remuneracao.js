import CardHeader from "../card-header";
import CardItem from "../card-item";

export default function Remuneracao({ remuneracao }) {

    return ( <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
    <CardHeader title="Remuneração" subtitle="Detalhes da remuneração" />

    <div className="mt-6 border-t border-gray-100">
      <dl className="divide-y divide-gray-100">
        <CardItem
          title="Total Bruto:"
          value={`R$ ${remuneracao.totalBruto}`}
          colorClass="text-emerald-600"
        />

        <CardItem
          title="Vencimento Base:"
          value={`R$ ${remuneracao.base}`}
          colorClass="text-emerald-600"
        />

        <CardItem
          title={`Gratificação (${remuneracao.gratificacaoPerc}%):`}
          value={`R$ ${remuneracao.gratificao}`}
          colorClass="text-emerald-600"
        />

        <CardItem
          title={`GFE:`}
          value={`R$ ${remuneracao.gfe}`}
          colorClass="text-emerald-600"
        />

        <CardItem
          title={`GFC:`}
          value={`R$ ${remuneracao.gfc}`}
          colorClass="text-emerald-600"
        />
      </dl>
    </div>
  </div>
  );
}