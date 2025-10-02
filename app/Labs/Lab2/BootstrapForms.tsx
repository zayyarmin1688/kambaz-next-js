"use client";

import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  InputGroup,
  Row,
  Col,
  Button,
  
} from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>
      <Form>
        <FormLabel>Email address</FormLabel>
        <FormControl type="email" placeholder="name@example.com" />
        <FormLabel>Example textarea</FormLabel>
        <FormControl as="textarea" rows={3} />
      </Form>

      <div id="wd-css-styling-dropdowns" style={{ marginTop: 30 }}>
        <h3>Dropdowns</h3>
        <FormSelect defaultValue="0">
          <option value="0">Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </FormSelect>
      </div>

      <div id="wd-css-styling-switches" style={{ marginTop: 30 }}>
        <h3>Switches</h3>
        <FormCheck type="switch" defaultChecked={false} label="Unchecked switch checkbox input" />
        <FormCheck type="switch" defaultChecked={true} label="Checked switch checkbox input" />
        <FormCheck type="switch" defaultChecked={false} label="Unchecked disabled switch checkbox input" disabled />
        <FormCheck type="switch" defaultChecked={true} label="Checked disabled switch checkbox input" disabled />
      </div>

      <div id="wd-css-styling-range-and-sliders" style={{ marginTop: 30 }}>
        <h3>Range</h3>
        <FormLabel>Example range</FormLabel>
        <Form.Range min="0" max="5" step="0.5" />
      </div>
      <div id="wd-css-styling-addons" style={{ marginTop: 30 }}>
        <h3>Addons</h3>

        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
          <FormControl />
        </InputGroup>

        <InputGroup>
          <FormControl />
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
      </div>

      <div id="wd-css-responsive-forms-1" style={{ marginTop: 30 }}>
        <h3>Responsive forms</h3>
        <Form>
          <Row className="mb-3" controlId="email1">
            <FormLabel column sm={2}>
              Email
            </FormLabel>
            <Col sm={10}>
              <FormControl type="email" defaultValue="email@example.com" />
            </Col>
          </Row>

          <Row className="mb-3" controlId="password1">
            <FormLabel column sm={2}>
              Password
            </FormLabel>
            <Col sm={10}>
              <FormControl type="password" />
            </Col>
          </Row>

          <Row className="mb-3" controlId="textarea1">
            <FormLabel column sm={2}>
              Bio
            </FormLabel>
            <Col sm={10}>
              <FormControl as="textarea" style={{ height: "100px" }} />
            </Col>
          </Row>
        </Form>
      </div>


      <div id="wd-css-responsive-forms-2" style={{ marginTop: 30 }}>
        <h3>Responsive forms</h3>
        <Form>
          <Row className="mb-3" controlId="formHorizontalEmail">
            <FormLabel column sm={2}>
              Email
            </FormLabel>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </Row>

          <Row className="mb-3" controlId="formHorizontalPassword">
            <FormLabel column sm={2}>
              Password
            </FormLabel>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </Row>

          <fieldset>
            <Row className="mb-3">
              <FormLabel as="legend" column sm={2}>
                Radios
              </FormLabel>
              <Col sm={10}>
                <FormCheck
                  type="radio"
                  label="First radio"
                  name="formHorizontalRadios"
                  defaultChecked
                />
                <FormCheck
                  type="radio"
                  label="Second radio"
                  name="formHorizontalRadios"
                />
                <FormCheck
                  type="radio"
                  label="Third radio"
                  name="formHorizontalRadios"
                />
                <FormCheck
                  type="radio"
                  label="Remember me"
                  name="formHorizontalRadios"
                />
              </Col>
            </Row>
          </fieldset>

          <Row>
            <Col>
              <Button type="submit">Sign in</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
