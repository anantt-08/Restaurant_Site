import React ,{useState}from "react";
import {Carousel} from 'react-bootstrap'    

const ControlledCarousel=() => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg"
          alt="First slide"
          style={{height:"330px"}}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-75 ml-5"
          src="/assests/images/4.jpg"
          alt="Second slide"
           style={{height:"330px",marginLeft:"100px",marginRight:"100px"}}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block d-flex w-75 "
          src="/assests/images/5.jpg"
          alt="Third slide"
           style={{height:"330px",marginLeft:"100px",marginRight:"100px"}}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;