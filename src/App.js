
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import OneQuestion from './components/OneQuestion';
import NewQuestion from './components/NewQuestion';
import NewReply from './components/NewReply';
import HotQuestions from './components/HotQuestions';
import HotUsers from './components/HotUsers';
import QuestionsByUser from './components/QuestionsByUser';
import EditQuestion from './components/EditQuestion';
import EditReply from './components/EditReply';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <main className="">
          <Route path="/login" component={Login} />   

          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/onequestion/:id" component={OneQuestion} />
          <Route path="/newquestion" component={NewQuestion} />
          <Route path="/editquestion/:pk_QuestionId" component={EditQuestion} />
          <Route path="/newreply/:id" component={NewReply} />
          <Route path="/hotquestions" component={HotQuestions}/>
          <Route path="/hotusers" component={HotUsers} />
          <Route path="/questionsbyuser/:id" component={QuestionsByUser} />
          <Route path="/editreply/:pk_ReplyId" component={EditReply} />

        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
