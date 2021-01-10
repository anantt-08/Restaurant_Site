    /*
         //    <div key={dish.id} className="mt-5 col-12">
         //      <Media tag="li">
         //    <Media left middle>
         //    <Media object src={dish.image} alt={dish.name} />
          //    </Media>
           //     <Media body className="ml-5">
            //      <Media heading>{dish.name}</Media>
           //       <p>{dish.description}</p>
            //    </Media>
              //   </Media>
            // </div>
             in VIEWS RENDER DOWN :
              <Media list>
                {menu}
          </Media>      
          */
import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import  Loading  from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
//function Menu(){
//return(    ......   )
//}
//onClick={() => onCl(dish.id)}
//import {Media} from 'reactstrap';

//active or current classname or custom class name!!  when active it shows
  
    function RenderMenuItem ({dish}) {
        return (
          <Link to={`/menu/${dish._id}`} // activeClassName="active"
          >
            <Card> 
                 <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
            </Link>
        );
    }
  
   	 const Menu = (props) =>  {

        if (props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else{
        return (
            <div className="container">
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>

                <div className="row">
                    {props.dishes.dishes.map((a) => 
               {
               return( 
                <div className="col-12 col-md-5 m-1"  key={a.id}>
                    <RenderMenuItem dish={a}/>
                </div>
                );
        })
      }
                </div>
            </div>
        );
 }
        }
export default Menu;
