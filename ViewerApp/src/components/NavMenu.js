import React, { Component,useEffect,useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './NavMenu.css';

const NavMenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/Account')
                if (response.status === 200) {
                    setIsLogin(true)
                }
            
            } catch (error) {
               
            }
        }

        fetchData()
    }, [])
    const logout = async () => {
        try {
            const response = await axios.get('/Account/logout')
            console.log(response)
            window.location.reload()
        }
        catch {

            window.location.reload()
        }

    }

    return (
        <header style={{ zIndex: '1' }}>
            <Navbar style={{ zIndex: '1' ,width: '100%', backgroundColor: '#FE9F60'}} className="navbar-expand-sm navbar-toggleable-lg border-bottom box-shadow mx-0 px-5 position-fixed "  light>
                <NavbarBrand className='p-0 text-light' href="/">Buymefood</NavbarBrand>
                <NavbarToggler onClick={toggle} className="me-2" />
                <Collapse isOpen={isOpen} navbar>
                {isLogin ?
                    
                        <Nav className="navItem navbar-nav flex-grow ms-auto" navbar>
                            <NavItem>
                                <div ><NavLink tag={Link} className="navtext" to="/myorder"  >My Order</NavLink></div>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="navtext" to="/mycard">MyCard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="navtext" to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <div onClick={logout}><NavLink tag={Link} className="navtext" to="/"  >Logout</NavLink></div>
                            </NavItem>
                    </Nav>
                        : <NavLink tag={Link} className=" ms-auto button-log mt-0" to="/login">Log In</NavLink>
                    }
                </Collapse>
            </Navbar>
        </header>
    );
}
export default NavMenu
//export class NavMenu extends Component {
//  static displayName = NavMenu.name;

//  constructor (props) {
//    super(props);

//    this.toggleNavbar = this.toggleNavbar.bind(this);
//    this.state = {
//      collapsed: true
//    };
//  }

//  toggleNavbar () {
//    this.setState({
//      collapsed: !this.state.collapsed
//    });
//  }

//  render() {
//    return (
//      <header>
//        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
//          <NavbarBrand tag={Link} to="/">BuyMeFood</NavbarBrand>
//          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
//            <ul className="navbar-nav flex-grow">
//              <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/">Profile</NavLink>
//              </NavItem>
//              <NavItem>
//                <NavLink tag={Link} className="text-dark" to="/counter">Logout</NavLink>
//              </NavItem>
//              {/*<NavItem>*/}
//              {/*  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>*/}
//              {/*</NavItem>*/}
//            </ul>
//          </Collapse>
//        </Navbar>
//      </header>
//    );
//  }
//}
