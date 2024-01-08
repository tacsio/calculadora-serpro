import { Calculadora } from "./calc";

export class PGCS {
  constructor() {
    this.niveis = Array.from({ length: 22 }, (x, i) => i + 101);
    this.degraus = ["A", "B"];
    this.gratificaoes = ["Classe I", "Classe II", "Classe III"];
    this.gfe = [
      0, 445.61, 483.05, 523.62, 567.61, 615.27, 666.98, 722.98, 783.71, 849.56,
      920.91, 998.29, 1082.13, 1173.04, 1271.57, 1378.33, 1494.14, 1619.65,
      1755.71, 1903.2, 2063.08, 2236.34, 2424.23, 2627.84, 2848.57, 3087.89,
      3347.24, 3628.43, 3933.22, 4263.61, 4621.73, 5009.98, 5430.8, 5887.01,
      6381.49, 6917.57, 7498.6, 8128.49, 8811.3, 9551.43, 10353.74,
    ];

    this.calculadora = new Calculadora();
  }

  calculate({ nivel, classe, degrau, gfeIndex = 0, reajuste }) {
    let base = this.calculadora.calcularBase(this.niveis[0], nivel, degrau);
    let alimentacao = this.calculadora.alimentacao;

    if (reajuste) {
      base = this.calculadora.aplicarReajuste(base, reajuste);
      alimentacao = this.calculadora.aplicarReajuste(alimentacao, reajuste);
    }

    const gratificao = this.calculadora.calcularGratificacao(classe, base);
    const gratificacaoPerc = this.calculadora.p_gratificacao[classe];
    const gfe = this.gfe[gfeIndex];
    const totalBruto = base + gratificao + gfe;

    const fgts = this.calculadora.calcularFGTS(totalBruto);

    //DEDUCOES
    const irpf = this.calculadora.calcularIRPF(totalBruto);
    const deducaoAlimentacao =
      this.calculadora.calcularDeducaoAlimentacao(alimentacao);
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
        gfe: gfe.toLocaleString("pt-BR", options),
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
