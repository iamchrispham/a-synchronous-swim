(function() {

  const serverUrl = 'http://127.0.0.1:3000';
  // const serverUrl2 = 'http://127.0.0.1:8080';
  //
  // TODO: build the swim command fetcher here
  //
  const ajaxCommandFetch = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
       console.log('Successful swim command fetch!', data);
        SwimTeam.move(data);
        //setInterval(ajaxCommandFetch(), 2000);
        // if (data !== '') {
        //   console.log('Empty st')
        //   //window.location = window.location.href;
        //   setTimeout(function() { window.location = window.location.href } , 5000);
        // } ** setTimeout function in an ajax call confirms for us async problems
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
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };


  $('form').on('submit', function(e) {
    e.preventDefault();

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