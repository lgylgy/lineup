import React from 'react';
import { Droppable, Direction } from 'react-beautiful-dnd';
import Card from './Card';
import './List.css';
import { ICategory, IPlayer } from '../type';

interface IProps {
  readonly category: ICategory;
  readonly players: IPlayer[];
  readonly direction: Direction;
  readonly isDropDisabled: boolean;
}

export default class List extends React.Component<IProps, {}> {
  public render() {
    const { players, category, direction, isDropDisabled } = this.props;
    return (
      <div style={{ margin: 4 }}>
        <Droppable
          droppableId={category.id}
          key={category.id}
          direction={direction}
          isDropDisabled={isDropDisabled}
        >
          {(provided) => (
            <div
              className={direction === 'vertical' ? 'list vlist' : 'list hlist'}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {players.map((value: any, index: any) => {
                return <Card key={value.id} player={value} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
