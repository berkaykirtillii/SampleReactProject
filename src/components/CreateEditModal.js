import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import useForm from "../hooks/useForm";

//id increment 
let counter = 11;

function CreateEditModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { form, onChangeHandler } = useForm(props.user);

  //Modal hide and show functions
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //user update
  const userUpdate = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${props.user.id}`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        handleCancel();
      });
  };

  //user create
  
  const userCreate = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        id: counter,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      counter++;
      console.log(counter);
  };

  return (
    <>
      {props.useFor == "Edit User" ? (
        <Button type="primary" onClick={showModal}>
          Edit
        </Button>
      ) : (
        <Button className="btn-create-user" onClick={showModal}>
          Create New User
        </Button>
      )}

      <Modal
        title={props.useFor}
        visible={isModalVisible}
        className="edit-modal"
        footer={null}
        onCancel={handleCancel}
      >
        <Form className="form-info" >
          <Form.Item label="Username" name="username">
            <Input
              name="username"
              defaultValue={props.user.username || ""}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input
              name="name"
              defaultValue={props.user.name || ""}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              name="email"
              defaultValue={props.user.email || ""}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input
              name="city"
              defaultValue={props.user.address.city || ""}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Item>
          <Form.Item label="Street" name="street">
            <Input
              name="street"
              defaultValue={props.user.address.street || ""}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Item>
          <Form.Item label="Suite" name="suite">
            <Input
              name="suite"
              defaultValue={props.user.address.suite || ""}
              onChange={(e) => onChangeHandler(e)}
            />
          </Form.Item>
          <Form.Item className="modal-footer-btns">
            <Button type="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={props.user.id ? () => userUpdate(): () =>  userCreate()}> 
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateEditModal;
