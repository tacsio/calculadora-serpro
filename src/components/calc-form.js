export default function CalcForm({ pgps }) {
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            SERPRO - Analista PGPS
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Simulador de salário
          </p>
          <p className="mt-1 text-xs text-red-500">
            Os valores calculados aqui não podem ser considerados 100% corretos
            devido a possíveis erros nos cálculos, arrendodamentos, mudanças nas
            fórmulas e nos valores de alíquotas de impostos e gratificações.
          </p>
          <p className="text-xs text-red-500">
            Não me responsabilizo por eventuais diferenças entre a simulação e
            os valores reais.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Carreira
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Configurações de parâmetros do cálculo
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <label
                htmlFor="nivel"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nível
              </label>
              <div className="mt-2">
                <select
                  id="nivel"
                  name="nivel"
                  autoComplete="nivel-name"
                  className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {pgps.niveis.map((value, index) => (
                    <option className="text-center" key={index}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="degrau"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Degrau
              </label>
              <div className="mt-2">
                <select
                  id="degrau"
                  name="degrau"
                  autoComplete="degrau-name"
                  className="block w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {pgps.degraus.map((value, index) => (
                    <option className="text-center" key={index}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="classe"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Classe
              </label>
              <div className="mt-2">
                <select
                  id="classe"
                  name="classe"
                  autoComplete="classe-name"
                  className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {pgps.gratificaoes.map((value, index) => (
                    <option className="text-center" key={index}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
