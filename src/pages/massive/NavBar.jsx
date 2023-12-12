import React from "react";
import { Item, NavBarStyle } from "./style/NavBarStyles"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHistory, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


export const Navbar = () => {
  return (
    <NavBarStyle>
      <Item>
          <FontAwesomeIcon icon={faHome} size="2x" />
      </Item>

      <Item>
          <FontAwesomeIcon icon={faHistory} size="2x" />
      </Item>

      <Item >
        <FontAwesomeIcon icon={faSignOutAlt} size="2x" alth/>
      </Item>
    </NavBarStyle>
  );
};
    
