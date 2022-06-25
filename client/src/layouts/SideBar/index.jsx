import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { ProSidebar, Menu, MenuItem, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { EmprestimoIcon, LivroIcon, LeitorIcon, RelatorioIcon } from '~/assets/icons';
import { Auth as authContext } from '~/auth';
import { PageContext } from '~/App';
import { Container } from './styled';
import './custom.scss';

export function SideBar ({ menuClose }) {
  const [auth, setAuth] = useContext(authContext);
  const [page,] = useContext(PageContext);

  const logout = () => { 
    window.sessionStorage.setItem('authToken', null);
    setAuth(false);
    window.location.reload();
  }
  
  return (
    auth &&
      <Container>
        <ProSidebar collapsed={ menuClose } >
          <SidebarContent>
            <Menu></Menu>
            <Menu></Menu>
            { page == 1 ? 
              <Menu iconShape="square" className='active'>
                <MenuItem icon={ <EmprestimoIcon width='35rem' /> } > Empréstimos </MenuItem>
              </Menu> 
              :
              <Menu iconShape="square" >
                <MenuItem icon={ <EmprestimoIcon width='35rem' /> } >
                  Empréstimos  
                  <Link to='/'/> 
                </MenuItem>
              </Menu> 
            }
            <Menu></Menu>
            { page == 2 ? 
              <Menu iconShape="square" className='active'>
                <MenuItem icon={ <LivroIcon width='32rem'/> }>Livros</MenuItem>
              </Menu>
              :
              <Menu iconShape="square">
                <MenuItem icon={ <LivroIcon width='32rem'/> }>
                  Livros
                  <Link to='/livros'/>
                </MenuItem>
              </Menu>
            }
            <Menu></Menu>
            { page == 3 ? 
              <Menu iconShape="square" className='active'>
                <MenuItem icon={ <LeitorIcon width='34rem'/> } >Leitores</MenuItem>
              </Menu>
              :
              <Menu iconShape="square">
                <MenuItem icon={ <LeitorIcon width='34rem'/> } >
                  Leitores
                  <Link to='/leitores'/>
                </MenuItem>
              </Menu>
            }
            <Menu></Menu>
            {/* { page == 4 ? 
              <Menu iconShape="square" className='active'>
                <MenuItem icon={ <RelatorioIcon width='34rem'/> }>Relatorios</MenuItem>
              </Menu>
              :
              <Menu iconShape="square">
                <MenuItem icon={ <RelatorioIcon width='34rem'/> }>Relatorios</MenuItem>
              </Menu>
            } */}
          </SidebarContent>
          <SidebarFooter>
              <Menu iconShape="square">
                <MenuItem icon={ <RiLogoutBoxFill fontSize='3rem'/> } onClick={ logout } > Sair </MenuItem>
              </Menu> 
          </SidebarFooter>
        </ProSidebar>
      </Container>

  );
}