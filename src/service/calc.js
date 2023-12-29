export class Calculadora {
  constructor() {
    //BASE
    this.base = 8230.68;
    this.alimentacao = 1180.67;

    //PERCENTUAIS
    this.p_alimentacao = 0.08;
    this.p_progressao = 0.045;
    this.p_degrau = 0.0225;
    this.p_fgts = 0.08;

    //IRPF
    this.inss = 876.97;
    this.alicotaIR = 0.275;
    this.baseDeducao = 884.96;

    //GRATIFICACAO
    this.p_gratificacao = {
      "Classe I": 0.15,
      "Classe II": 0.2,
      "Classe III": 0.25,
    };
  }

  calcularBase(nivelInicial, nivelAtual, degrauAtual) {
    const steps = nivelAtual - nivelInicial;
    const txJurosNivel = (1 + this.p_progressao) ** steps;

    let baseReajustado = this.base * txJurosNivel;

    if (degrauAtual === "B") {
      const txJurosDegrau = 1 + this.p_degrau;
      baseReajustado = baseReajustado * txJurosDegrau;
    }

    return baseReajustado;
  }

  calcularGratificacao(classe, base) {
    return base * this.p_gratificacao[classe];
  }

  calcularDeducaoAlimentacao(alimentacao) {
    return alimentacao * this.p_alimentacao;
  }

  /** IRPF **/
  calcularIRPF(totalBruto) {
    let result = totalBruto - this.inss;
    result *= this.alicotaIR;
    result -= this.baseDeducao;

    return result;
  }

  calcularFGTS(totalBruto) {
    return totalBruto * this.p_fgts;
  }

  aplicarReajuste(valor, percentual) {
    return valor * (1 + percentual / 100);
  }
}
