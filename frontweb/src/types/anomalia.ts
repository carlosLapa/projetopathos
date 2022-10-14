import { Edificio } from './edificio';

export type Anomalia = {
  id: number;
  consequente: string;
  inconsequente: string;
  date: string;
  descricao: string;
  edificios: Edificio[];
};
