import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { FiAlignJustify } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { loggedInNavbarItems, loggedOutNavbarItems, listInterface } from 'Components/Navbar/Components/Navbar.Items';
import { AuthContext } from 'Contexts/Auth.Context';

export interface NavlistInterface { };

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const NavMobile: React.FunctionComponent<NavlistInterface> = (props) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const Logout = () => {

        auth.authenticated = false;
        auth.refreshToken = null;
        auth.accessToken = null;
        auth.userData = {
            email: '',
            permissionLevel: {
                level: 0
            }
        }

        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');

        navigate('/log');

    }

    var items: listInterface[] = [];

    if (!auth.authenticated) {
        items = loggedOutNavbarItems;
    } else {
        items = loggedInNavbarItems;
    }

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer('right', false)}
      onKeyDown={toggleDrawer('right', false)}
    >
    <List>
            {items.map((menu, index) => {
                    if (menu.icon && menu.url) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <li className="w-full">
                                <Link className="flex items-center gap-1 font-medium text-2xl hover:bg-[#e7e7e7]" to={menu.url} key={index}>{icon}{menu.title}</Link>
                            </li>
                        )
                    } else if (menu.url) {
                        return (
                            <li className="w-full">
                                <Link className="flex items-center gap-1 font-medium text-lg hover:bg-[#e7e7e7]" to={menu.url} key={index}>{menu.title}</Link>
                            </li>
                        )
                    } else if (menu.for === 'logout' && menu.icon) {
                        const icon = React.createElement(menu.icon);
                        return (
                            <li className="w-full flex items-center gap-1 font-medium text-2xl hover:bg-[#e7e7e7]" key={index} onClick={Logout} >{icon}{menu.title}</li>
                        )
                    }
                })}
      </List>
    </Box>
  );

  return (
    <div className="md:hidden w-full flex justify-end items-right">
        <React.Fragment>
          <Button onClick={toggleDrawer('right', true)}><FiAlignJustify size="2em"/></Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default NavMobile;