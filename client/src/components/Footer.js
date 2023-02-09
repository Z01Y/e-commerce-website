import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container bg="dark">
        <Row>
          <Col className="text-left py-3">
            {' '}
            &copy; 2022 All Rights Reserved.{' '}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
