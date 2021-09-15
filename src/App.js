
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import OneQuestion from './pages/OneQuestion';
import NewQuestion from './pages/NewQuestion';
import NewReply from './pages/NewReply';
import HotQuestions from './pages/HotQuestions';
import HotUsers from './pages/HotUsers';
import QuestionsByUser from './pages/QuestionsByUser'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav /> 

        <main className="">

          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/onequestion/:id" component={OneQuestion} />
          <Route path="/newquestion" component={NewQuestion} />
          <Route path="/newreply" component={NewReply} />
          <Route path="/hotquestions" component={HotQuestions}/>
          <Route path="/hotusers" component={HotUsers} />
          <Route path="/questionsbyuser" component={QuestionsByUser} />

        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
