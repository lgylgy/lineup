import React from 'react';
import { Droppable, Direction } from 'react-beautiful-dnd';
import Card from './Card';
import { ICategory, IPlayer } from '../type';

interface IProps {
  readonly category: ICategory;
  readonly players: IPlayer[];
  readonly direction: Direction;
  readonly isDropDisabled: boolean;
}

const verticalStyles = {
  background: 'lightgrey',
  padding: 4,
  width: 250,
  minHeight: 500,
};

const horizontalStyles = {
  background: 'lightgrey',
  padding: 4,
  minHeight: 100,
  display: 'flex',
};

export default class List extends React.Component<IProps, {}> {
  public render() {
    const { players, category, direction, isDropDisabled } = this.props;
    return (
      <>
        <h2>{category.title}</h2>
        <div style={{ margin: 8 }}>
          <Droppable
            droppableId={category.id}
            key={category.id}
            direction={direction}
            isDropDisabled={isDropDisabled}
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={
                  direction === 'vertical'
                    ? { ...verticalStyles }
                    : { ...horizontalStyles }
                }
              >
                {players.map((value: any, index: any) => {
                  return <Card key={value.id} player={value} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </>
    );
  }
}
