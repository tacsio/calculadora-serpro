import { Calculadora } from "./calc";

export class PGCS {
  constructor() {
    this.niveis = Array.from({ length: 22 }, (x, i) => i + 101);
    this.degraus = ["A", "B"];
    this.gratificaoes = ["Classe I", "Classe II", "Classe III"];

    this.calculadora = new Calculadora();
  }

  calculate({ nivel, classe, degrau, reajuste }) {
    let base = this.calculadora.calcularBase(this.niveis[0], nivel, degrau);
    let alimentacao = this.calculadora.alimentacao;

    if (reajuste) {
      base = this.calculadora.aplicarReajuste(base, reajuste);
      alimentacao = this.calculadora.aplicarReajuste(alimentacao, reajuste);
    }

    const gratificao = this.calculadora.calcularGratificacao(classe, base);
    const gratificacaoPerc = this.calculadora.p_gratificacao[classe];
    const totalBruto = base + gratificao;

    const fgts = this.calculadora.calcularFGTS(totalBruto);

    //DEDUCOES
    const irpf = this.calculadora.calcularIRPF(totalBruto);
    const deducaoAlimentacao = this.calculadora.calcularDeducaoAlimentacao(alimentacao);
    const inss = this.calculadora.inss;

    const liquido = totalBruto - irpf - deducaoAlimentacao - inss;

    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

    return {
      remuneracao: {
        totalBruto: totalBruto.toLocaleString("pt-BR", options),
        base: base.toLocaleString("pt-BR", options),
        liquido: liquido.toLocaleString("pt-BR", options),
        gratificao: gratificao.toLocaleString("pt-BR", options),
        gratificacaoPerc: gratificacaoPerc * 100,
      },

      deducoes: {
        irpf: irpf.toLocaleString("pt-BR", options),
        deducaoAlimentacao: deducaoAlimentacao.toLocaleString("pt-BR", options),
        inss: inss.toLocaleString("pt-BR", options),
      },

      outros: {
        alimentacao: alimentacao.toLocaleString("pt-BR", options),
        fgts: fgts.toLocaleString("pt-BR", options),
        fgtsPerc: this.calculadora.p_fgts * 100,
      },
    };
  }
}
