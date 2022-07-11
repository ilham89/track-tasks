import { useEffect, useState } from "react";
import { firebase } from "../../firebase/";
import { Input, Form, Button } from "antd";
import { doPasswordUpdate } from "../../firebase/auth";
import { useHistory } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import "./styles.scss";

export default function Account() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      authUser ? setUser(authUser) : setUser(null);
    });
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (password === passwordTwo) {
      return doPasswordUpdate(password)
        .then(() => {
          setPassword("");
          setPasswordTwo("");
          setError(null);
          alert("Password was changed successfully");
          history.push("/boards");
        })
        .catch((err) => setError(err.message));
    } else {
      setError("Passwords do not match");
    }
  };
  return (
    <div className="account-container">
      <div className="account-details">
        <h2>Account: {user && user.email}</h2>
        <p>Want to reset your password?</p>
      </div>
      <form className="account-form">
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            name="password"
            type="password"
            value={password}
            autoComplete="off"
            placeholder="Enter a new password"
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            name="confirmPassword"
            type="password"
            value={passwordTwo}
            autoComplete="off"
            placeholder="Confirm new password"
            onChange={(e) => setPasswordTwo(e.target.value)}
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block onClick={(e) => handleOnSubmit(e)}>
            Reset your password
          </Button>
        </Form.Item>
        {error && (
          <div style={{ color: "red", fontSize: "0.75rem" }}>{error}</div>
        )}
      </form>
    </div>
  );
}
