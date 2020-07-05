export class Categoria {

    id: number;
    nome: string;
}

export class Pessoa {

    id: number;
    cpf: String;
    nome: string;
    telefone: string;
    endereco = new Endereco();

}

export class Endereco {

    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade = new Cidade();
}

export class Cidade {

    id: number;
    nome: string;
    estado = new Estado();

}

export class Estado {

    id: number;
    nome: string;
}

export class Status {

    id: number;
    descricao: string;
}

export class OrdemServico {

    os: number;
    pessoa = new Pessoa();
    categoria = new Categoria();
    status = new Status();
    servicos = new Array<Servico>();

    equipamento: string;
    descricao: string;
    defeito: string;
    dataRecebimento: Date;
    dataEntrega: Date;
    valor: number;
    laudoTecnico: string;
    garantia: string;
}

export class Servico {

    id: number;
    descricao: string;
    valor: number;

    constructor(id?: number, descricao?: string, valor?: number) {

        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
    }

}