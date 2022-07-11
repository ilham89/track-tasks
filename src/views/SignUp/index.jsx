import { useState } from "react";
import { auth, db } from "../../firebase";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./styles.scss";

export default function SignUp() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    error: null,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const { fullName, email, password } = userDetails;

    return auth
      .doCreateUserWithEmailAndPassword(email, password, fullName)
      .then((authUser) => {
        db.doCreateUser(authUser.user.uid, fullName, email);
        history.push("/boards");
      })
      .catch((error) =>
        setUserDetails((prevState) => ({ ...prevState, error: error.message }))
      );
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    setUserDetails((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="sign-up-container">
      <Form>
        <h1>Sign up</h1>

        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            onChange={(e) => handleOnChange(e)}
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="text"
            name="email"
            autoComplete="off"
            placeholder="Enter your email address"
            onChange={(e) => handleOnChange(e)}
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            name="password"
            autoComplete="off"
            type="password"
            placeholder="Enter a password"
            onChange={(e) => handleOnChange(e)}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            name="confirmPassword"
            autoComplete="off"
            type="password"
            placeholder="Confirm password"
            onChange={(e) => handleOnChange(e)}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block onClick={(e) => handleOnSubmit(e)}>
            Sign up
          </Button>
        </Form.Item>
        {userDetails.error && (
          <div style={{ color: "red", fontSize: "0.75rem" }}>
            {userDetails.error}
          </div>
        )}
        <Form.Item>
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
