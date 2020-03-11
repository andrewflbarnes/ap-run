var fetchSweepstakeEntries = function() {
  var resOk = false
  var resStatus = 0
  fetch('{{API_URL}}/sweepstake', {
    method: 'GET'
  }).then(function(res) {
    resOk = res.ok
    resStatus = res.status
    return res.json();
  }).then(function(res) {
    if (!resOk) {
      throw new Error(`Unable to retrieve sweepstakes (${resStatus}): ${JSON.stringify(res)}`)
    }

    sorted = res.sort(function(a,b) {
      return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
    })

    $('#sweepstake-entries').children('tr').remove()

    sorted.forEach(function(entry) {
      $('#sweepstake-entries').append(`
        <tr>
          <td scope="row">${entry.name}</td>
          <td>${entry.runner}</td>
          <td>${entry.time}</td>
          <td class="d-none d-md-flex justify-content-center">${entry.message}</td>
        </tr>`
      )
    })
  }).catch(function(error) {
    $('.error-text').text(error)
    $('#error-modal').modal('toggle')
  })
}

function submitSweepstake() {
  var formData = $("#sweepstake-form").serializeArray();

  var jsonData = {}
  formData.forEach(function(entry) {
    jsonData[entry.name] = entry.value
  })

  var resOk = false
  var resStatus = 0
  fetch('{{API_URL}}/sweepstake', {
    method: 'POST',
    body: JSON.stringify(jsonData),
    headers: {
      'content-type': 'application/json'
    }
  }).then(function(res) {
    resOk = res.ok
    resStatus = res.status
    return res.json()
  }).then(function(res) {
    if (!resOk) {
      throw new Error(`Unable to submit sweepstake (${resStatus}): ${JSON.stringify(res)}`)
    }
    $("#sweepstake-modal").modal('toggle')
    fetchSweepstakeEntries()
    console.log(res)
  }).catch(function(error) {
    $('.error-text').text(error)
    $('#error-modal').modal('toggle')
  })

}
