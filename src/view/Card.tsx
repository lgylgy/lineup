import React from 'react';
import { IPlayer } from '../type';
import { Draggable } from 'react-beautiful-dnd';
import './Card.css';

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
            className="pcard vcard"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
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
