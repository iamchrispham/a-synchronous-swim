(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  const ajaxCommandFetch = () => {
    $.ajax({
      type: 'GET',
      url: `${serverUrl}/moves`,
      success: (data) => {
      SwimTeam.move(data);
      if (data !== ''){
        setTimeout(x => {ajaxCommandFetch()}, 199);
        }
      }
    })
  }
  
  ajaxCommandFetch();
  
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl + '/background.jpeg',
      cache: false,
      contentType: 'multipart/form',
      processData: false,
      success: () => {
        // reload the page
        console.log('success');
        window.location = window.location.href;
      },
      error: (err) => {console.error(err)}
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();
// ↜
    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    } 

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    } 

    ajaxFileUplaod(file);
    
  });

})();