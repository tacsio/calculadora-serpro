import CardHeader from "../card-header";
import CardItem from "../card-item";

export default function Deducoes({ deducoes }) {
  return (
    <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
      <CardHeader title="Deduções" subtitle="Detalhes das deduções" />

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <CardItem
            title="IRPF:"
            value={`R$ ${deducoes.irpf}`}
            colorClass="text-red-600"
          />

          <CardItem
            title="Alimentacao:"
            value={`R$ ${deducoes.deducaoAlimentacao}`}
            colorClass="text-red-600"
          />

          <CardItem
            title="INSS:"
            value={`R$ ${deducoes.inss}`}
            colorClass="text-red-600"
          />

          <CardItem
            title="Plano Saude:"
            value={`R$ ${deducoes.planoSaude}`}
            colorClass="text-red-600"
          />
        </dl>
      </div>
    </div>
  );
}
