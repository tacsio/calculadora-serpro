import { useState } from "react";

export default function SerprosForm({ contribuicaoSerpros, setContribuicaoSerpros }) {
  const [checkSerpros, setCheckSerpros] = useState(false);

  function toggle() {
    if (checkSerpros) {
      setContribuicaoSerpros(undefined);
    } else {
      setContribuicaoSerpros(443.78);
    }
    setCheckSerpros(!checkSerpros);
  }

  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Serpos PS-II
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Configurações de Serpros
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-1">
          <label
            htmlFor="serpros"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Utiliza Serpros
          </label>
          <div className="mt-2 w-24">
            <input
              id="serpros"
              type="checkbox"
              value={checkSerpros}
              onChange={(e) => toggle()}
            />
          </div>
        </div>

        {checkSerpros && (
          <div className="sm:col-span-1">
            <label
              htmlFor="contribuicao"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contribução Participante
            </label>
            <div className="mt-2 w-24">
              <input
                id="contribuicao"
                name="contribuicao"
                type="number"
                min={0}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(event) => setContribuicaoSerpros(Number(event.target.value))}
                value={contribuicaoSerpros}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
