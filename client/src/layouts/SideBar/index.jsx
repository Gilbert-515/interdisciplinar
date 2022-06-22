import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { RiMenuLine } from 'react-icons/ri';
import { EmprestimoIcon, LivroIcon, LeitorIcon, RelatorioIcon } from '~/assets/icons';
import { Auth as authContext } from '~/auth';
import { PageContext } from '~/App';
import { Container } from './styled';
import './custom.scss';

export function SideBar () {
  const [auth,] = useContext(authContext);
  const [page,] = useContext(PageContext);

  const [menuOpen, setMenuOpen] = useState(true);

  return (
    auth &&
      <Container>
        <ProSidebar collapsed={ menuOpen } >
          <SidebarHeader>
            <Menu>
              <MenuItem icon={ <RiMenuLine fontSize='1.9rem'/> } onClick={ () => setMenuOpen(state => !state) } ></MenuItem>
            </Menu>
          </SidebarHeader>
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

          </SidebarFooter>
        </ProSidebar>
      </Container>

  );
}