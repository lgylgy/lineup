export interface IPlayer {
  id: string;
  name: string;
  type: string;
}

export interface ICategory {
  id: string;
  title: string;
  type?: string;
  playerIds: string[];
  limit: number;
}
