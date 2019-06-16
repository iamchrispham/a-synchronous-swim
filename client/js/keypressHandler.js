// readURL to read target
const serverUrl = 'http://127.0.0.1:3000';
const ajaxSwimmerToServer = (move) => {
  $.ajax({
    type: 'POST',
    data: move,
    dataType: 'text',
    url: `${serverUrl}/moves-post`,
    success: () => {
      console.log('Successful Post to server');
     // ajaxCommandFetch();
    }
  })
}


$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    //SwimTeam.move(direction.toLowerCase());
    ajaxSwimmerToServer(direction.toLowerCase());
  }
});

console.log('Client is running in the browser!');
