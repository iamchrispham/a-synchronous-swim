// readURL to read target
const serverUrl = 'http://127.0.0.1:3000';
const ajaxSwimmerToServer = (move) => {
  $.ajax({
    type: 'GET',
    data: move,
    dataType: 'text',
    url: `${serverUrl}/`,
    success: (data) => {
      SwimTeam.move(data);
    }
  })
}


$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    ajaxSwimmerToServer(direction.toLowerCase());
  }
});

console.log('Client is running in the browser!');
