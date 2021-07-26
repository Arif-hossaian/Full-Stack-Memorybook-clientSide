import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Auth, NavBar, Layout } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
