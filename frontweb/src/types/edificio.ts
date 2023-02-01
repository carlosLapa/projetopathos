import { Anomalia } from './anomalia';

export type Edificio = {
  id: number;
  localizacao: string;
  tipologia: string;
  name: string;
  utilizacao: string;
  arquitetura: string;
  piso: number;
  fracao: string;
  imgUrl: string;
  date: string;
  createdAt: string;
  anomalias: Anomalia[];
};

/*
Os "types" servem para definir a estrutura de um objeto, isto quando fazemos uma chamada a uma API, neste caso ao nosso backend, 
que devolverá um objecto que corresponderá a esta estrutura.
*/ 
