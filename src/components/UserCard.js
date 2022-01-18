import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useFetchData from "../hooks/useFetchData";
import CreateEditModal from "./CreateEditModal";
import useForm from "../hooks/useForm";
const { confirm } = Modal;

const UserCard = () => {
  const { users, setUsers } = useFetchData();

  // useEffect(()=>{
  //  const nonChangeUser = users.filter(user => user.id !==selectedUser.id)
  //   setUsers(
  //     ...nonChangeUser,
  //     selectedUser
  //   )
  // },[selectedUser])

  const showDeleteConfirm = (e) => {
    const deleteId = e.target.parentElement.getAttribute("value");
    confirm({
      title: "Are you sure delete this task?",
      icon: <DeleteOutlined />,
      content: "Once deleted, it cannot be recovered.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setUsers(users.filter((user) => user.id !== parseInt(deleteId)));
      },
    });
  };

  const sortedUserList = users.sort(function (a, b) {
    if (a.username < b.username) {
      return -1;
    }
    if (a.username > b.username) {
      return 1;
    }
    return 0;
  });

  const usersCards = sortedUserList.map((user) => (
    <Col
      className="gutter-row"
      key={user.id}
      xs={24}
      sm={12}
      md={12}
      lg={8}
      xl={8}
    >
      <Card
        title={user.username}
        className="custom-card"
        extra={
          /* I use "value" attribute 2 times, I know its confusing.
                Ant design button, create a span element for "delete" text
                if I click the text, id returns null because of span element
                doesn't have "value" attribute. So I check the parent element "value".
                If I click outer side of text, this time I get user.id from div element.
             */
          <div value={user.id} className="card-header-btns">
            <CreateEditModal user={user} useFor={"Edit User"}></CreateEditModal>
            <Button type="danger" onClick={showDeleteConfirm} value={user.id}>
              Delete
            </Button>
          </div>
        }
      >
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>
          Address: {user.address.city}, {user.address.street},{" "}
          {user.address.suite}
        </p>
      </Card>
    </Col>
  ));

  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ width: "100%", paddingLeft: "3%" }}
      >
        {usersCards}
      </Row>
    </>
  );
};

export default UserCard;
