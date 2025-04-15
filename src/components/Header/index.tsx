import { HeaderContianer } from './styles';
import logoIginite from '../../assets/logo-ignite.svg';
import { Timer, Scroll } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderContianer>
      <img src={logoIginite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContianer>
  );
};

export default Header;
