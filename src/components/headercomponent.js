import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import ControlledCarousel from "./ControlledCarousel"    
import { NavLink } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
    
     //   this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isMODALOpen:false
        };
        this.toggleMODAL=this.toggleMODAL.bind(this);
         this.toggleModal = this.toggleModal.bind(this);
           this.handleLogin = this.handleLogin.bind(this);
             this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignup=this.handleSignup.bind(this);
      }

      // alert("Username: " + this.USERname.value + " Password: " + this.PASSword.value
         //   + " Remember: " + this.REMember.checked);
       handleLogin(event) {
        this.toggleModal(); 
       this.props.loginUser({username: this.USERname.value, password: this.PASSword.value});
        event.preventDefault();

    }
      toggleNav=()=> {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
        toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
       toggleMODAL() {
        this.setState({
          isMODALOpen: !this.state.isMODALOpen
        });
      }
      handleSignup(event){
        this.toggleMODAL(); 
        console.log(this.USERname.value,  this.PASSword.value)
       this.props.signupUser({username: this.USERname.value, password: this.PASSword.value});
      event.preventDefault();
      }

     handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return(
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src='/assests/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                       {/* //navbar togler for displaying button
                        //collapse isopen if true then opens after collapse esle false then not shows
                         */}
                        <Collapse isOpen={this.state.isNavOpen} navbar>                        
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                             <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                           
                             <NavItem>
                                    <NavLink className="nav-link" to="/favorites">
                                        <span className="fa fa-heart fa-lg"></span> My Favorites
                                    </NavLink>
                                </NavItem>
                            
                              
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav> 
                              <Nav className="ml-auto" navbar>
                                <NavItem>
                                        { !this.props.auth.isAuthenticated ?
                                          <>
                                        <Button outline onClick={this.toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isLoading ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        <Button outline onClick={this.toggleMODAL}>
                                            <span className="fas fa-user-plus"></span> SIGNUP
                                            {this.props.auth.isLoading ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </>
                                                                                :
                                        <div>
                                        <div className="navbar-text mr-3">
                                        {this.props.auth.user.username}
                                        </div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isLoading ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>  
                        </Collapse>
                    </div>
                </Navbar>
      <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-8">
                    <h1>Ristorante con Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
        </Jumbotron>
       <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                     <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.USERname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.PASSword = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.REMember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                 <Modal isOpen={this.state.isMODALOpen} toggle={this.toggleMODAL}>
                    <ModalHeader toggle={this.toggleMODAL}>Signup NEW User!</ModalHeader>
                    <ModalBody>
                     <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.USERname = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.PASSword = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">SIGNUP</Button>
                        </Form>
                    </ModalBody>
                </Modal>
    </>
    );
  }
}

//<ControlledCarousel /> 

export default Header;