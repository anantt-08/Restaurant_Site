import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col,Label} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button} from 'reactstrap';
   import { baseUrl } from '../shared/baseUrl'; 
import { Link } from 'react-router-dom';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import  Loading  from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

     //avaliable as props  <classname a={..} /> as this.props.a in classname
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // propTypes: {
   //   message: React.PropTypes.string.isRequired
   //   id: React.PropTypes.number.isRequired
   // }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
  console.log(this.props.dishId, values.rating, values.author, values.comment)
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div>
      <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> SUBMIT comment</Button>   
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={{ size: 12 }}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control" 
                  defaultValue="1"
                    >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows={5}
                    className="form-control"
                    defaultValue="good"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}    

    function RenderDish({dish,favorite,postFavorite}){
        if (dish != null)
            return(

            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card key={dish.id}>
                      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardImgOverlay>
                                <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(dish._id)}>
                                    {favorite ?
                                        <span className="fa fa-heart"></span>
                                        : 
                                        <span className="fa fa-heart-o"></span>
                                    }
                                </Button>
                            </CardImgOverlay>
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                 </FadeTransform>
            );
        else
            return(
                <div></div>
            );
    }    

  function RenderComment({a,addComment, dishId}){
   if(a!=null){
    return(
     <div  className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                   <ul className="list-unstyled">
                    <Stagger in>  
             {a.map((commentt)=> {
              return(
                 <Fade in>
                  <li key={commentt._id} >
                        <div>
                            <p>{commentt.comment}</p>
                            <p>--{commentt.author.firstname} {commentt.author.lastname},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(commentt.updatedAt)))}</p>
                        </div>
                     </li>
                     </Fade>
                 )
               }) 
              }  
               </Stagger>
                      </ul> 
                     <CommentForm dishId={dishId} addComment={addComment} />  
                </div>
  )  
   } 
   else{
   return(<div></div>);
}
 }

  const  Dishdetail = (props) => {
         
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

   else if(props.Detail!=null)
   return ( 
   <div className="container"> 
   <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.Detail.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.Detail.name}</h3>
                        <hr />
                    </div>                
                </div>
    <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                   <RenderDish dish={props.Detail}  favorite={props.favorite} postFavorite={props.postFavorite}  /> </div>
             <RenderComment a={props.comments}
        addComment={props.postComment}
        dishId={props.Detail._id}
      />
      
    </div>     
    </div>
    );    
    else 
      return(<div></div>);
}

export default Dishdetail;  
