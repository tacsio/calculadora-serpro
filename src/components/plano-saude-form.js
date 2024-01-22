import { useState } from "react";

export default function PlanoSaudeForm({ idade, setIdade }) {
  const [checkPlano, setCheckPlano] = useState(false);

  function togglePlano() {
    if (checkPlano) {
      setIdade(undefined);
    } else {
      setIdade(36);
    }
    setCheckPlano(!checkPlano);
  }

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Plano de Saúde
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Configurações de Plano de Saúde
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-1">
          <label
            htmlFor="plano_saude"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Utiliza plano
          </label>
          <div className="mt-2 w-24">
            <input
              id="plano_saude"
              type="checkbox"
              value={checkPlano}
              onChange={(e) => togglePlano()}
            />
          </div>
        </div>

        {checkPlano && (
          <div className="sm:col-span-1">
            <label
              htmlFor="idade"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Idade
            </label>
            <div className="mt-2 w-24">
              <input
                id="idade"
                name="idade"
                type="number"
                min={0}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(event) => setIdade(event.target.value)}
                value={idade}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
