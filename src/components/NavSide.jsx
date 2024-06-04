import React from 'react'
import { Col,Row,Card,Container } from 'react-bootstrap';


function NavSide() {

    const items = [
        { id: 1, title: 'Dashboard', link: '/dashboard' },
        { id: 2, title: 'Products', link: '/products' },
       {id: 3, title: 'Products', link: '/AddProduct'}
      ];
    
      return (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              {/* Sidebar content */}
              {items.map(item => (
                <Card key={item.id}>
                  <Card.Body>
                    <Card.Link href={item.link}>{item.title}</Card.Link>
                  </Card.Body>
                </Card>
              ))}
            </Col>
            <Col md={10} className="main-content">
              {/* Main content area */}
              {/* Add your page content here */}
            </Col>
          </Row>
        </Container>
      );
    }


export default NavSide