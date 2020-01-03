import React from 'react';
import data from './data.json';
import List from './view/List';
import { IPlayer, ICategory } from './type';
import './App.css';
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
  Direction,
} from 'react-beautiful-dnd';

interface IPlayerMap {
  [id: string]: IPlayer;
}

interface ICategoryMap {
  [id: string]: ICategory;
}

interface IState {
  categories: ICategoryMap;
  categoryNames: string[];
  players: IPlayerMap;
}

interface IProps {}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      categories: data.categories,
      categoryNames: data.categoryNames,
      players: data.players,
    };
  }

  private onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.state.categories[source.droppableId];
    const end = this.state.categories[destination.droppableId];
    if (start === end) {
      const list = Array.from(start.playerIds);
      list.splice(source.index, 1);
      list.splice(destination.index, 0, draggableId);
      this.setState({
        ...this.state,
        categories: {
          ...this.state.categories,
          [start.id]: {
            ...start,
            playerIds: list,
          },
        },
      });
    } else {
      const lastList = Array.from(start.playerIds);
      lastList.splice(source.index, 1);
      const newList = Array.from(end.playerIds);
      newList.splice(destination.index, 0, draggableId);

      this.setState({
        ...this.state,
        categories: {
          ...this.state.categories,
          [start.id]: {
            ...start,
            playerIds: lastList,
          },
          [end.id]: {
            ...end,
            playerIds: newList,
          },
        },
      });
    }
  };

  private renderList(name: string, direction: Direction) {
    const category = this.state.categories[name];
    const players = category.playerIds.map(
      (playerId: string) => this.state.players[playerId],
    );
    return (
      <List
        key={category.id}
        category={category}
        players={players}
        direction={direction}
      />
    );
  }

  public render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="nav">{this.renderList('unassigned', 'vertical')}</div>
        <div className="content">
          {this.state.categoryNames
            .filter((value) => value !== 'unassigned')
            .map((value: string) => {
              return this.renderList(value, 'horizontal');
            })}
        </div>
      </DragDropContext>
    );
  }
}
