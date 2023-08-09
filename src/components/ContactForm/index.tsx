import React from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import axios from "axios";

const Contact = ({ title, content, id, t }: ContactProps) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "contact") {
      setContact(value);
    } else if (name === "organization") {
      setOrganization(value);
    } else if (name === "message") {
      setMessage(value);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inquiry={
      email: email,
      name: name,
      contact: contact,
      role: organization,
      message: message,
    };
    console.log(inquiry);
    axios.post("http://13.200.102.72:8000/user/inquiry/", inquiry);
  };



  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={name || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  value={email || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="number"
                  name="contact"
                  placeholder="Your Contact"
                  value={contact || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="organization"
                  placeholder="Your Organization Type"
                  value={organization || ""}
                  onChange={handleChange}
                />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder="Your Message"
                  value={message || ""}
                  name="message"
                  onChange={handleChange}
                />
              </Col>
              <ButtonContainer>
                <Button name="submit">{t("Submit")}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
