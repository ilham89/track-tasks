import Routes from "./routes";
import UserProvider from "./providers/UserProvider";
import { Button } from "antd";

function App() {
  return (
    <>
      <UserProvider>
        <Routes />
      </UserProvider>
      <div
        style={{
          marginBottom: "16px",
          textAlign: "right",
          marginRight: "16px",
        }}
      >
        Built with <span style={{ marginRight: 4 }}>❤️</span> by
        <Button type="link" style={{ padding: 0, marginLeft: 4 }}>
          <a
            rel="noreferrer"
            href="https://www.ilhamkukuh.space/"
            target="_blank"
          >
            Ilham Kukuh Prakosa
          </a>
        </Button>
      </div>
    </>
  );
}

export default App;
