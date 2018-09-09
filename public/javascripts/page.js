_$.select('#screenshot-form').submit(function (e) {
    e.preventDefault();
    const data = {
        url: _$.select('#input-screenshot').val()
    }
    const options = {
        method: 'POST',
        url: '/api/screenshot',
        data: data,
        headers: {
            contentType: 'application/json; charset=utf-8',
            accept: 'application/json'
        }
    };

    _$.ajax(options)
        .then(response => {
            if (response.error) {
                console.log(response.message);
            } else {
                _$.select('#download-button').removeClass('hidden');
                _$.select('#download-image').attr('value', response.data.hash);
            }
        }).catch(err => console.log(err));
});

