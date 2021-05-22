import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function Home() {

  return (
    <Container className="bg-white p-5 mt-5 shadow-sm rounded">
      <h1 className=" mb-5">How to recall previous request in Axios</h1>
      <p><strong>Somehow your app session expired and you are doing some activity in the app.</strong> </p><p>It can be many actions like add, edit etc.</p><p>Whatever data you want to save or update it will not update and the application give you an error message. </p><p><strong>Session or token is expired. you have to log in first. so if you want to remove this kind of problem this video for you. you can maintain your session always without disturbing the user interface.</strong></p>
    </Container>
  );
}

export default Home;
