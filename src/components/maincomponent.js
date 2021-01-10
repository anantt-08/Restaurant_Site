//use of prev STATE IN TOODO LIST items=[] inn state
//this.setState=prevState => {
  //return { 
 //   items: prevState.items.concat(newItem) 
 // };
//};
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import React, { Component } from 'react';
import Menu from './menucomponent';
import DishDetail from './dishdetail';
import Header from './headercomponent';
import Footer from './footercomponent';
import Favorites from './FavoriteComponent';
import Home from './homecomponent';
import Contact from './ContactComponent';
import About from "./aboutcomponent";
import { addComment, postFeedback, fetchDishes, fetchComments, fetchPromos,fetchLeaders,fetchFavorites, signupUser,
  clear,postFavorite, deleteFavorite,loginUser ,logoutUser  } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter,IndexRoute ,useParams} from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
//IMP IF WE WANT TO ACCESS ANY STATE FROM STORE IN COMPONENT THEN PASS IT TO MAPSTATETOPROPS!!
//EG mapstatetoprops=state=({
// todos:state.todos.data where todos is state and inside that we need to access data!
//})
import PropTypes from 'prop-types'; 

//this.props avalible from here mapstatetoprops
//const mapStateToProps = (state, ownProps) => ({
 // active: ownProps.filter === state.visibilityFilter
//})
//ownprops when we need to filter store state and get single value like here we want only one of COMPLETED OR NOTCOMPLETED OR SHOWALL

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth,
    alert:state.alert
  }
}
//dispatch passes info to REDUCER FUNC and takes input of ACTIONCREATER which eturns action object!!
 const mapDispatchToProps = dispatch => ({
    //dpatch takes action cretator type! and values to pass to reducer func
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    //inbuiltt ations and reducer func
    resetFeedbackForm: () => { dispatch(actions.reset('FEEDback'))},
    fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
   postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ) ,
   fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
    loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  signupUser:(creds)=> dispatch(signupUser(creds)),
  clearAlerts: () => dispatch(clear())
  });

class Main extends Component {
/*
  onDishSelect(dishId)
  {
  this.setState({ selectedDish: dishId});
  }
   onDishSelect= (dishId) => {
    this.setState({ selectedDish: dishId});
  }
OR AS this when not using class so instead of componentDidmount etc....

useEffect(function(){
fetchDishes()
 },[])

*/

//dispatch avalible as props

//shouldComponentUpdate(nextProps, nextState) { 
   // if (nextState.value !== 3) { 
   //   return false;
  //  }
  //  return true;
 // }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
     this.props.fetchFavorites();
  }

 ///componentDidUpdate(prevProps) {
  //  if (this.props.location !== prevProps.location) {
 //console.log("hi")
 //   }
//  }

  render() {
       const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leaders={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}
          />
                );
}
// as if not authenticated no such favorite.dishes present!
// or may use let { dishIDD } = useParams();
// THEN comment.dish == {dishIDD} 
      const DishWithId = ({match,location}) => {
     //   let  dishIDD  = useParams();
       //console.log(dishIDD)
      return(
          this.props.auth.isAuthenticated
          ?
        <DishDetail Detail={this.props.dishes.dishes.filter((dish) => dish._id == match.params.dishId)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dish == match.params.dishId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.addComment}
          favorite={this.props.favorites.favorites.dishes.some((dish) => dish._id == match.params.dishId)}
          postFavorite={this.props.postFavorite}
          />
        :
        <DishDetail Detail={this.props.dishes.dishes.filter((dish) => dish._id == match.params.dishId)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dish == match.params.dishId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.addComment}
          favorite={false}
          postFavorite={this.props.postFavorite}
          />
      );
    };

 const PrivateRoutee = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        this.props.auth.isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/menu', state: { from: props.location } }} />
    )} />
)

        const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
    );
        const alert=this.props.alert;
    return (
      <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          signupUser={this.props.signupUser} 
          /> 

       {alert.message &&
                            <div className={`alert ${alert.type} alert-dismissible fade show`}>{alert.message}
                             <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={()=>{this.props.clearAlerts()} }>
    <span aria-hidden="true">&times;</span>
  </button>
  </div>
                        }
            {/*   so / will give home and /menu will also give home so we need to specify exact and /menu/name also same      
                <Switch>
              <Route path='/' component={HomePage} />
                <Route exact path='/menu' component={() =><> <Menu dishes={this.state.dishes} onCl={this.onDishSelect}/> <DishDetail Detail={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> </>} />
          </Switch>
        //transition group automativally manages so each list item
        */}
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
         <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} 
              postFeedback={this.props.postFeedback} />} />
             // <Route exact path='/contactus' component={Contact} />

               <Route path='/menu/:dishId' component={DishWithId} />
              <Route path="/aboutus" component={()=> <About lead={this.props.leaders.leaders} leadersLoading={this.props.leaders.isLoading}
               leadersErrMess={this.props.leaders.errMess} />} />
               <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
              <Redirect to="/home" />
          </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
      </div>
    );
  }
}
Main=withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
export default Main;
/*
 //  <Route path='manage/:roomId' component={RoomsManagerManageRoom} onEnter={requireAuth}>
   //                     <IndexRedirect to="sessions"/>  normally redirect to seesion!
     //                   <Route path='sessions' component={RoomSessions} onEnter={requireAuth} />
       //               <Route path='meetings' component={RoomMeetings} onEnter={requireAuth} />
        //                <Route path='files' component={RoomFiles} onEnter={requireAuth} />
          //              <Route path='recordings' component={RoomRecordings} onEnter={requireAuth} />
        //                <Route path='sections' component={RoomSections} onEnter={requireAuth} />
            //            <Route path='hosts' component={RoomHosts} onEnter={requireAuth} />
              //      </Route>
*/
