import { resolve } from "inversify-react";
import { ChangeEvent, Component } from "react";
import { Container, Row, Col, Form, Button, } from "react-bootstrap";
import { IoMegaphoneOutline } from "react-icons/io5";
import { Fade, Zoom } from "react-awesome-reveal";

import { Profile } from "../../model/CVModel";
import { IContactService } from "../../services/ContactService";
import { DevIconName } from "../shared/DevIcon";

import "./Contact.scss";

type ContactProps = {
  profiles: Profile[];
};

type ContactState = {
  status: boolean;
};

export class Contact extends Component<ContactProps, ContactState> {
  @resolve("ContactService") private readonly contactService!: IContactService;

  componentWillMount() {
    this.setState({ status: false });
  }

  render(): JSX.Element {
    return (
      <Fade triggerOnce direction="up">
        <section id="contact" className="section contact">
          <Container>
            <Row>
              <Col>
                <h2 className="section-title">Contact</h2>
                <div className="centered line" />
              </Col>
            </Row>

            <Row className="section-content socials">
              {this.props.profiles.map(
                (p: Profile): JSX.Element => (
                  <Col md="auto" className="social-platform">
                    <a href={p.url} rel="noopener noreferrer" target="_blank">
                      <DevIconName icon={p.brand} />
                    </a>
                  </Col>
                )
              )}
            </Row>

            <div className="centered long-line" />

            <Row className="section-content">
              <div className="contact-form centered">
                <Row className="form-title">
                  <Col>
                    <h3>Get in touch!</h3>
                  </Col>
                </Row>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <Form.Group controlId="formEmail">
                    <Form.Control
                      type="email"
                      name="email"
                      className="contact-input"
                      placeholder="Your email"
                    />
                  </Form.Group>
                  <Form.Group controlId="formMessage">
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      className="contact-input"
                      placeholder="Your Message"
                    />
                  </Form.Group>
                  <Button variant="outline-dark" type="submit">
                    Send
                  </Button>
                </Form>
              </div>
            </Row>

            {this.state.status && (<Zoom>
              <div className="contact-response">Thanks!</div>
            </Zoom>)}
          </Container>

          <div className="centered short-line" />
          <IoMegaphoneOutline className="section-icon" />
        </section>
      </Fade>
    );
  }

  private handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    this.contactService.submit(
      new FormData(event.target),
      (success: boolean) => {
        event.target.reset();
        this.setState({ status: success });
      });
  }
}
