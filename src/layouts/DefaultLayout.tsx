import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { LayoutContainer } from './DefaultLayout/styles';

const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
};

export default DefaultLayout;
