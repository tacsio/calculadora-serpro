import { Calculadora } from "./calc";
import { PlanoSaude } from "./plano-saude";

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

    this.gfc = [
      0, 3630.8, 4290.93, 4951.06, 6601.43, 6931.5, 7261.6, 7591.62, 9242.04,
      9902.17, 10562.29, 12542.75, 12872.81, 13202.89, 15513.39, 17493.78,
    ];

    this.calculadora = new Calculadora();
    this.planoSaude = new PlanoSaude();
  }

  calculate({
    nivel,
    classe,
    degrau,
    gfeIndex = 0,
    gfcIndex = 0,
    reajuste,
    idade,
    contribuicaoSerpros,
    checkAlimentacao,
  }) {
    let base = this.calculadora.calcularBase(this.niveis[0], nivel, degrau);
    let gfe = this.gfe[gfeIndex];
    let gfc = this.gfc[gfcIndex];
    let decontoPlanoSaude = 0;
    let descontoSerpros = 0.0;
    let alimentacao = 0;
    let deducaoAlimentacao = 0.0;

    //alimentacao
    if (checkAlimentacao) {
      alimentacao = this.calculadora.alimentacao;
      deducaoAlimentacao =
        this.calculadora.calcularDeducaoAlimentacao(alimentacao);
    }

    //Plano saude
    if (idade) {
      const dadosPlano = this.planoSaude.calculate({ idade, nivel });
      decontoPlanoSaude = dadosPlano.desconto;
    }

    //SERPROS
    if (contribuicaoSerpros) {
      descontoSerpros = contribuicaoSerpros;
    }
    
    //REAJUSTE
    if (reajuste) {
      base = this.calculadora.aplicarReajuste(base, reajuste);
      alimentacao = this.calculadora.aplicarReajuste(alimentacao, reajuste);
      gfe = this.calculadora.aplicarReajuste(gfe, reajuste);
      gfc = this.calculadora.aplicarReajuste(gfc, reajuste);
    }

    const gratificao = this.calculadora.calcularGratificacao(classe, base);
    const gratificacaoPerc = this.calculadora.p_gratificacao[classe];
    const totalBruto = base + gratificao + gfe + gfc;

    const fgts = this.calculadora.calcularFGTS(totalBruto);

    //DEDUCOES
    const irpf = this.calculadora.calcularIRPF(totalBruto, descontoSerpros);
    const inss = this.calculadora.inss;

    const liquido =
      totalBruto -
      irpf -
      deducaoAlimentacao -
      inss -
      decontoPlanoSaude -
      descontoSerpros;

    return {
      remuneracao: {
        totalBruto: this._formatNumber(totalBruto),
        base: this._formatNumber(base),
        liquido: this._formatNumber(liquido),
        gratificao: this._formatNumber(gratificao),
        gratificacaoPerc: gratificacaoPerc * 100,
        gfe: this._formatNumber(gfe),
        gfeIndex: gfeIndex,
        gfc: this._formatNumber(gfc),
        gfcIndex: gfcIndex,
      },

      deducoes: {
        irpf: this._formatNumber(irpf),
        deducaoAlimentacao: this._formatNumber(deducaoAlimentacao),
        inss: this._formatNumber(inss),
        planoSaude: this._formatNumber(decontoPlanoSaude),
        serpros: this._formatNumber(descontoSerpros),
      },

      outros: {
        alimentacao: this._formatNumber(alimentacao),
        fgts: this._formatNumber(fgts),
        fgtsPerc: this.calculadora.p_fgts * 100,
      },
    };
  }

  _formatNumber(value) {
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return value.toLocaleString("pt-BR", options);
  }
}
