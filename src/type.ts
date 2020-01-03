export interface IPlayer {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  title: string;
  playerIds: string[];
}
