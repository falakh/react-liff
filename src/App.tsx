import React from "react";
import { Container, Card, CardContent, TextField, Button } from "@material-ui/core";
import liffHelper from '../src/util/lineliffhelper';


function App() {
  var [profile,setProffile] = React.useState<any>();

  liffHelper.init()

  return <Container>
    <Card>
      <CardContent>
        <Button onClick={liffHelper.init}> Login </Button>
      </CardContent>
    </Card>
  </Container>
}


export default App;
