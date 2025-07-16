export class Serpros {
    constructor() {
        this.vrs = 521.39;
        this.pa = [0,        // 18...
                   0,
                   0,
                   0.0201,
                   0.0822,
                   0.1575,
                   0.2281,
                   0.2677,
                   0.2757,
                   0.3027,
                   0.3170,
                   0.3551,
                   0.3729,
                   0.3964,
                   0.4298,
                   0.4704,
                   0.5071,
                   0.5408,
                   0.5581,
                   0.6367,
                   0.6434,
                   0.6286,
                   0.5764,
                   0.5704,
                   0.4944,
                   0.4706,
                   0.4685,
                   0.3208,
                   0.3319,
                   0.2709,
                   0.2555,
                   0.1502,
                   0.1078,
                   0.0890,
                   0.0821,
                   0.0679,
                   0.0669,
                   0.0483,
                   0.0670,
                   0.1149,
                   0.1139,
                   0.0953,
                   0.0705,
                   0.1267,
                   0.1189,
                   0.0660,
                   0.2158,
                   0.2158 ]; // ... 65
        this.pg = [0.0526,   // 18...
                   0.0526,
                   0.0526,
                   0.0475,
                   0.0456,
                   0.0444,
                   0.0502,
                   0.0635,
                   0.0966,
                   0.1116,
                   0.1397,
                   0.1348,
                   0.1553,
                   0.1587,
                   0.1697,
                   0.1465,
                   0.1402,
                   0.1131,
                   0.1090,
                   0.0893,
                   0.1120,
                   0.1185,
                   0.1366,
                   0.1374,
                   0.1668,
                   0.1613,
                   0.1434,
                   0.1272,
                   0.1097,
                   0.0845,
                   0.0455,
                   0.0291,
                   0.0151,
                   0.0101,
                   0.0036,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027,
                   0.0027 ]; // ... 65
    }

    calculate({idadeSerpros, percentualSerpros, salarioContribuicao}) {
        const index = this._parseIndex(idadeSerpros);
        const contribuicaoBasica = salarioContribuicao * 0.01;
        const contribuicaoVariavel = ((salarioContribuicao - (8 * this.vrs)) * (percentualSerpros / 100));

        return {
            contribuicaoBasica: contribuicaoBasica,
            contribuicaoVariavel: contribuicaoVariavel,
            desconto: contribuicaoBasica + contribuicaoVariavel
        }
    }

    _parseIndex(idade) {
        return Math.min(idade - 18, 47);
    }
}