import React from 'react';
import { IPlayer } from '../type';
import { Draggable } from 'react-beautiful-dnd';

interface IState {}

interface IProps {
  readonly player: IPlayer;
  readonly index: number;
}

export default class Card extends React.Component<IProps, IState> {
  public render() {
    const { player, index } = this.props;
    return (
      <Draggable key={player.id} draggableId={player.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              padding: 16,
              margin: '8px 8px 8px 8px',
              height: '50px',
              width: '200px',
              color: 'white',
              backgroundColor: '#456C86',
              ...provided.draggableProps.style,
            }}
          >
            {this.props.player.name}
          </div>
        )}
      </Draggable>
    );
  }
}
