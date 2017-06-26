var update = document.getElementById('update')

update.addEventListener('click', function () {
  //  2 parameter pd fetch
  // 1. resuqet pada quotes
  // 2. untuk object yang diperlukan untuk mengontrol setting (method, header, body)
  fetch('quotes', {
    method  : 'put',
    headers : {'Content-Type' : 'application/json'},
    body    : JSON.stringify({
      'name'  : 'mon',
      'quote' : 'crot'
    })
  })
})
