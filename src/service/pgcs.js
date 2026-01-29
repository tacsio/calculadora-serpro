import { Calculadora } from "./calc";
import { PlanoSaude } from "./plano-saude";
import { Serpros } from "./serpros";

export class PGCS {
  constructor() {
    this.niveis = Array.from({ length: 22 }, (x, i) => i + 101);
    this.degraus = ["A", "B"];
    this.gratificaoes = ["Classe I", "Classe II", "Classe III"];
    this.gfe = [
      0, 493.81, 535.3, 580.26, 629.01, 681.83, 739.13, 801.18, 868.49, 941.46,
      1020.52, 1106.28, 1199.18, 1299.93, 1409.12, 1527.43, 1655.76, 1794.85,
      1945.63, 2109.08, 2286.25, 2478.26, 2686.46, 2912.1, 3156.7, 3421.92,
      3709.32, 4020.93, 4358.69, 4724.82, 5121.68, 5551.92, 6018.26, 6523.83,
      7071.8, 7665.86, 8309.75, 9007.78, 9764.45, 10584.65, 11473.74,
    ];

    this.gfc = [
      0, 4023.55, 4755.1, 5486.63, 7315.53, 7681.3, 8047.12, 8412.84, 10241.78,
      10973.32, 11704.84, 13899.54, 14265.31, 14631.09, 17191.53, 19386.14,
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
      const dadosSerpros = this.serpros.calculate({
        idadeSerpros,
        percentualSerpros,
        salarioContribuicao,
      });
      descontoSerpros = dadosSerpros.desconto;
    }

    const gratificacaoPerc = this.calculadora.p_gratificacao[classe];
    const totalBruto = base + gratificao + gfe + gfc;

    const fgts = this.calculadora.calcularFGTS(totalBruto);

    //DEDUCOES
    const irpf = this.calculadora.calcularIRPF(totalBruto, descontoSerpros);
    const inss = this.calculadora.inss;
    const totalDeducoes =
      irpf + deducaoAlimentacao + inss + decontoPlanoSaude + descontoSerpros;

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
