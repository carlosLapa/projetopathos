class AddAnomaliaRequest {
  consequente: string;
  inconsequente: string;
  date: number;
  tipologia: string;
  descricao: string;
  img?: string;

  constructor(
    consequente: string,
    inconsequente: string,
    date: number,
    tipologia: string,
    descricao: string,
    img?: string
  ) {
    this.consequente = consequente;
    this.inconsequente = inconsequente;
    this.date = date;
    this.tipologia = tipologia;
    this.descricao = descricao;
  }
}

export default AddAnomaliaRequest;
