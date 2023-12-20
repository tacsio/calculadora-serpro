export default function Dashboard({ data }) {
  return (
    <div className="flex flex-wrap align-center justify-center mt-4">
      <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Remuneração
          </h3>
          <p className="mt-1 max-w-2xl w-64 text-sm text-gray-500">
            Detalhes da remuneração
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Vencimento Base:
              </dt>
              <dd className="mt-1 text-emerald-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.base}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Total Bruto:
              </dt>
              <dd className="mt-1 text-emerald-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.totalBruto}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Gratificação ({data.gratificacaoPerc}%):
              </dt>
              <dd className="mt-1 text-emerald-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.gratificao}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Deduções
          </h3>
          <p className="mt-1 max-w-2xl w-64 text-sm text-gray-500">
            Detalhes das deduções
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                IRPF:
              </dt>
              <dd className="mt-1 text-red-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.irpf}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Alimentacao:
              </dt>
              <dd className="mt-1 text-red-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.deducaoAlimentacao}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                INSS:
              </dt>
              <dd className="mt-1 text-red-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.inss}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="py-2 px-4 m-2 border-2 rounded-lg border-slate-300">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Resumo
          </h3>
          <p className="mt-1 max-w-2xl w-64 text-sm text-gray-500">
            Vencimentos a receber
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Líquido:
              </dt>
              <dd className="mt-1 text-sky-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.liquido}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Alimentação:
              </dt>
              <dd className="mt-1 text-sky-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.alimentacao}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-rows-2 sm:gap-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                FGTS ({data.fgtsPerc}%):
              </dt>
              <dd className="mt-1 text-sky-600 font-semibold text-sm leading-6 sm:col-span-2 sm:mt-0">
                R$ {data.fgts}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
