import React, { Component,useEffect,useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import './NavMenu.css';

const NavMenu = (props) => {
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/Account')
                if (response.status === 200) {
                    setIsLogin(true)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])
    const logout = async () => {
        const response = await axios.get('/Account/logout')
        console.log(response)
        window.location.reload()
    }
    return (
        <header >
            <Navbar  className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-0" container light>
                <NavbarBrand>Buymefood
                </NavbarBrand> 

                <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                    </NavItem>
                    {isLogin ?
                        <div className="d-flex">                 
        
                            <NavItem>
                                <div ><NavLink tag={Link} className="text-dark" to="/myorder"  >My Order</NavLink></div>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/mycard">MyCard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <div onClick={logout}><NavLink tag={Link} className="text-dark" to="/"  >Logout</NavLink></div>
                            </NavItem>
                        </div>
                        : <NavLink tag={Link} className="text-dark" to="/login">Log In</NavLink>
                            
                            

                    }


                </ul>
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
