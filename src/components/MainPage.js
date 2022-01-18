import UserCard from "./UserCard";
import { Layout } from 'antd';
import CreateEditModal from "./CreateEditModal";

const { Header, Content } = Layout;

function MainPage() {

    const user = {
      "id": null,
      "name": "",
      "username": "",
      "email": "",
      "address": {
        "street": "",
        "suite": "",
        "city": "",
      }}

    return (
      <Layout>
          <Header className="page-header">
            <CreateEditModal user={user} useFor={"Create User"}></CreateEditModal>
          </Header>
          <Content>
            <UserCard></UserCard>
          </Content>
      </Layout>
    );
  }
  export default MainPage;
  