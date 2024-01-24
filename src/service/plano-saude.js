export class PlanoSaude {
  constructor() {
    this.faixas = [
      "0 – 18",
      "19 – 23",
      "24 – 28",
      "29 – 33",
      "34 – 38",
      "39 – 43",
      "44 – 48",
      "49 – 53",
      "54 – 58",
      "59 ou mais",
    ];
    this.mensalidades = [
      541.2, 568.52, 640.13, 746.38, 808.26, 825.62, 977.44, 1017.62, 1145.22,
      1765.49,
    ];

    //101-8A - 104-8B => [0]
    //105-8A - 122-8B => [1]
    this.participacao = [355.51, 284.95];
  }

  calculate({ nivel, idade }) {
    const participacao =
      nivel < 105 ? this.participacao[0] : this.participacao[1];

    const faixaIndex = this._parseFaixa(idade);
    const mensalidade = this.mensalidades[faixaIndex];

    return {
      mensalidade: mensalidade,
      participacao: participacao,
      desconto: mensalidade - participacao,
    };
  }

  _parseFaixa(idade) {
    const faixa = Math.min(Math.ceil((idade - 18) / 5), 9);
    return Math.max(faixa, 0);
  }

  faixas() {
    return this.faixas;
  }
}
