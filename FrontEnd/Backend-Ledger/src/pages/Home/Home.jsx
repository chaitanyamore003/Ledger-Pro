import { useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();
  return (
    <>
      <h1>Home Page</h1>
      <button onClick={() => Navigate("/dashboard")}>See DashBoard Page</button>
      <button onClick={() => Navigate("/login")}>See Login Page</button>
      <button onClick={() => Navigate("/register")}>
        See Registration Page
      </button>
    </>
  );
}

export default Home;
