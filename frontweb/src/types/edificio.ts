import { Anomalia } from './anomalia';

export type Edificio = {
  id: number;
  localizacao: string;
  tipologia: string;
  nome: string;
  utilizacao: string;
  arquitetura: string;
  piso: number;
  fracao: string;
  imgUrl: string;
  date: string;
  createdAt: string;
  anomalias: Anomalia[];
};
