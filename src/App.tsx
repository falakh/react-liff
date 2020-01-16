import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Container
} from "@material-ui/core";
import liffHelper from "../src/util/lineliffhelper";
import Firebase from "firebase";

var initilized = false;
function EditCard() {
  var [currentNote, setNote] = React.useState(String);
  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  liffHelper.init();

  if (!initilized) {
    initApp();
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <TextField onChange={handleNoteChange} fullWidth />
        </CardContent>
        <CardContent>
          <Button onClick={() => AddNote(currentNote)}> Add Note </Button>
        </CardContent>
      </Card>
     
    </Container>
  );
}

function App(){
  return <Container>
    <EditCard/>
    <List>
      <NoteList/>
      </List>
  </Container>
}


function NoteList(){
  var [noteItem, setNoteItem] = React.useState<any>()

  var db = Firebase.database()
    .ref()
    .child("note");
    liffHelper.init();
 liffHelper.getProfile().then(proffile => {
    console.log(proffile);
    db.child(proffile.userId).on('value',function(snapshoot){
      console.log(snapshoot)
      setNoteItem(snapshoot)
    }
    )
  });

  if(!noteItem){
    return <Container></Container>
  }else{
    var listItem = noteItem.map(function (item : any,index : number){
       return     <ListItem>
       <ListItemText>
       <div>  item.note </div>
       </ListItemText>
     </ListItem>
    })
    return listItem;
  }


}

function initApp() {
  var firebaseConfig = {
    apiKey: "AIzaSyB9BW4nyLKdZJsoBhCyJqq4kPW2DJ63lwM",
    authDomain: "chat-app-16877.firebaseapp.com",
    databaseURL: "https://chat-app-16877.firebaseio.com",
    projectId: "chat-app-16877",
    storageBucket: "chat-app-16877.appspot.com",
    messagingSenderId: "561022543563",
    appId: "1:561022543563:web:0cd5700ff682e5cdbb5d4e",
    measurementId: "G-04TWBFWGHL"
  };
  initilized = true;
  Firebase.initializeApp(firebaseConfig);
}

declare type empetyCallback = () => void;
async function AddNote(note: String) {
  var db = Firebase.database()
    .ref()
    .child("note");
  var newPostKey = db.push().key;
  //  var id = 1;
  var profile = liffHelper.getProfile().then(proffile => {
    var id = proffile.userId;
    console.log(profile);
    db.child(id.toString() + "/" + newPostKey).set({
      note
    });
  });

  // return Firebase.database().ref().update({"/"+});
}

export default App;
