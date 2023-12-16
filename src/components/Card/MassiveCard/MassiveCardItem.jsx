import React from 'react';
import IconButton from '@mui/material/IconButton';
import MassiveCard from './MassiveCard';

const MassiveCardItem = ({ card, onDelete }) => {
  return (
    <MassiveCard card={card}>
      <IconButton onClick={() => onDelete(card.id)} aria-label="delete">
        <CloseSharpIcon />
      </IconButton>
    </MassiveCard>
  );
};

export default MassiveCardItem;
