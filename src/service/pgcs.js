import { Calculadora } from "./calc";
import { PlanoSaude } from "./plano-saude";
import { Serpros } from "./serpros";

export class PGCS {
  constructor() {
    this.niveis = Array.from({ length: 22 }, (x, i) => i + 101);
    this.degraus = ["A", "B"];
    this.gratificaoes = ["Classe I", "Classe II", "Classe III"];
    this.gfe = [
      0, 464.46, 503.48, 545.77, 591.62, 641.30, 695.19, 753.56, 816.86, 885.50,
      959.86, 1040.52, 1127.90, 1222.66, 1325.36, 1436.63, 1557.34, 1688.16,
      1829.98, 1983.71, 2150.35, 2330.94, 2526.77, 2739.00, 2969.06, 3218.51,
      3488.83, 3781.91, 4099.60, 4443.96, 4817.23, 5221.90, 5660.52, 6136.03,
      6651.43, 7210.18, 7815.79, 8472.33, 9184.02, 9955.46, 10791.70,
    ];

    this.gfc = [
      0, 3784.38, 4472.44, 5160.49, 6880.67, 7224.70, 7568.77, 7912.75, 9632.98,
      10321.03, 11009.07, 13073.31, 13417.33, 13761.37, 16169.61, 18233.77,
    ];

    this.calculadora = new Calculadora();
    this.planoSaude = new PlanoSaude();
    this.serpros = new Serpros();
  }

  calculate({
    nivel,
    classe,
    degrau,
    gfeIndex = 0,
    gfcIndex = 0,
    reajuste,
    idade,
    percentualSerpros,
    idadeSerpros,
    checkAlimentacao,
  }) {
    let base = this.calculadora.calcularBase(this.niveis[0], nivel, degrau);
    let gratificao = this.calculadora.calcularGratificacao(classe, base);
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

    //REAJUSTE
    if (reajuste) {
      base = this.calculadora.aplicarReajuste(base, reajuste);
      alimentacao = this.calculadora.aplicarReajuste(alimentacao, reajuste);
      deducaoAlimentacao =
        this.calculadora.calcularDeducaoAlimentacao(alimentacao);
      gfe = this.calculadora.aplicarReajuste(gfe, reajuste);
      gfc = this.calculadora.aplicarReajuste(gfc, reajuste);
      gratificao = this.calculadora.calcularGratificacao(classe, base);
    }

    //SERPROS
    if (idadeSerpros) {
      const salarioContribuicao = base + gratificao + gfe + gfc;
      const dadosSerpros = this.serpros.calculate({idadeSerpros, percentualSerpros, salarioContribuicao});
      descontoSerpros = dadosSerpros.desconto;
    }

    const gratificacaoPerc = this.calculadora.p_gratificacao[classe];
    const totalBruto = base + gratificao + gfe + gfc;

    const fgts = this.calculadora.calcularFGTS(totalBruto);

    //DEDUCOES
    const irpf = this.calculadora.calcularIRPF(totalBruto, descontoSerpros);
    const inss = this.calculadora.inss;
    const totalDeducoes = irpf+deducaoAlimentacao+inss+decontoPlanoSaude+descontoSerpros;

    const liquido =
      totalBruto -
      irpf -
      deducaoAlimentacao -
      inss -
      decontoPlanoSaude -
      descontoSerpros;

    return {
      remuneracao: {
        base: this._formatNumber(base),
        liquido: this._formatNumber(liquido),
        gratificao: this._formatNumber(gratificao),
        gratificacaoPerc: gratificacaoPerc * 100,
        gfe: this._formatNumber(gfe),
        gfeIndex: gfeIndex,
        gfc: this._formatNumber(gfc),
        gfcIndex: gfcIndex,
        resumo: this._formatNumber(totalBruto),
      },

      deducoes: {
        irpf: this._formatNumber(irpf),
        deducaoAlimentacao: this._formatNumber(deducaoAlimentacao),
        inss: this._formatNumber(inss),
        planoSaude: this._formatNumber(decontoPlanoSaude),
        serpros: this._formatNumber(descontoSerpros),
        resumo: this._formatNumber(totalDeducoes),
      },

      outros: {
        alimentacao: this._formatNumber(alimentacao),
        fgts: this._formatNumber(fgts),
        fgtsPerc: this.calculadora.p_fgts * 100,
      },

      totais: this._formatNumber(liquido + alimentacao),
    };
  }

  _formatNumber(value) {
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return value.toLocaleString("pt-BR", options);
  }
}
