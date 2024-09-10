"use client";

import { PGCS } from "@/service/pgcs";
import { useEffect, useState } from "react";
import PlanoSaudeForm from "./plano-saude-form";
import SerprosForm from "./serpros-form";

const pgcs = new PGCS();

export default function CalcForm({ setData }) {
  const [nivel, setNivel] = useState(101);
  const [degrau, setDegrau] = useState("A");
  const [classe, setClasse] = useState("Classe I");
  const [gfeIndex, setGfeIndex] = useState(0);
  const [gfcIndex, setGfcIndex] = useState(0);
  const [checkAlimentacao, setChekAlimentacao] = useState(true);

  const [idade, setIdade] = useState(undefined);
  const [percentualSerpros, setPercentualSerpros] = useState(undefined);
  const [idadeSerpros, setIdadeSerpros] = useState(undefined);

  const [reajuste, setReajuste] = useState("");

  useEffect(() => {
    const result = pgcs.calculate({
      nivel,
      degrau,
      classe,
      reajuste,
      gfeIndex,
      gfcIndex,
      idade,
      percentualSerpros,
      idadeSerpros,
      checkAlimentacao,
    });
    setData(result);
  }, [
    nivel,
    degrau,
    classe,
    setData,
    reajuste,
    gfeIndex,
    gfcIndex,
    idade,
    percentualSerpros,
    idadeSerpros,
    checkAlimentacao,
  ]);

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            SERPRO - Analista PGCS (8h)
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
          <p>
            <a
              className="text-xs text-blue-500"
              target="_blank"
              href="https://www.transparencia.serpro.gov.br/acesso-a-informacao/servidores/carreiras"
            >
              https://www.transparencia.serpro.gov.br/acesso-a-informacao/servidores/carreiras
            </a>
          </p>
          <p>
            <a
              className="text-xs text-blue-500"
              target="_blank"
              href="https://www.passerpro.qualirede.com.br/regulamentos/"
            >
              https://www.passerpro.qualirede.com.br/regulamentos/
            </a>
          </p>
          <p>
            <a
              className="text-xs text-blue-500"
              target="_blank"
              href="https://semprecomvoce.serpros.com.br/"
            >
              https://semprecomvoce.serpros.com.br/
            </a>
          </p>
        </div>

        {/* Carreira */}
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
                  onChange={(event) => setNivel(event.target.value)}
                  value={nivel}
                >
                  {pgcs.niveis.map((value, index) => (
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
                  onChange={(event) => setDegrau(event.target.value)}
                  value={degrau}
                >
                  {pgcs.degraus.map((value, index) => (
                    <option className="text-center" key={index}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="classe"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gratificação
              </label>
              <div className="mt-2">
                <select
                  id="classe"
                  name="classe"
                  autoComplete="classe-name"
                  className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(event) => setClasse(event.target.value)}
                  value={classe}
                >
                  {pgcs.gratificaoes.map((value, index) => (
                    <option className="text-center" key={index}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Extras */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Extras
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Configurações de parâmetros extras
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <label
                htmlFor="gfe"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                GFE
              </label>
              <div className="mt-2">
                <select
                  id="gfe"
                  name="gfe"
                  autoComplete="gfe-name"
                  className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(event) => setGfeIndex(event.target.value)}
                  value={gfeIndex}
                >
                  {pgcs.gfe.map((value, index) => (
                    <option className="text-center" key={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="gfc"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                GFC
              </label>
              <div className="mt-2">
                <select
                  id="gfc"
                  name="gfc"
                  autoComplete="gfc-name"
                  className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(event) => setGfcIndex(event.target.value)}
                  value={gfcIndex}
                >
                  {pgcs.gfc.map((value, index) => (
                    <option className="text-center" key={index}>
                      {index}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="alimentacao"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Alimentação
              </label>
              <div className="mt-2 w-24">
                <input
                  id="alimentacao"
                  type="checkbox"
                  checked={checkAlimentacao}
                  value={checkAlimentacao}
                  onChange={(e) => setChekAlimentacao(!checkAlimentacao)}
                />
              </div>
            </div>
          </div>
        </div>

        <PlanoSaudeForm idade={idade} setIdade={setIdade} />

        <SerprosForm
          percentualSerpros={percentualSerpros}
          setPercentualSerpros={setPercentualSerpros}
          idadeSerpros={idadeSerpros}
          setIdadeSerpros={setIdadeSerpros}
        />

        {/* Simulacao */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Simulação
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Configurações de parâmetros de simulação
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <label
                htmlFor="reajuste"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Reajuste (%)
              </label>
              <div className="mt-2 w-24">
                <input
                  id="reajuste"
                  name="reajuste"
                  type="number"
                  min={0}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(event) => setReajuste(Number(event.target.value))}
                  value={reajuste}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
