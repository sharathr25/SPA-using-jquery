$(document).ready(() => {
  let id;
  $.get('/authors', (data, status) => {
    console.log(status);
    console.log(data);
    for (let i = 0; i < data.length; i += 1) {
      const content = `<tr>
        <td id="id">${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].about}</td>
        <td>${data[i].place}</td>
        <td><button type="button" class="btn btn-info">Edit</button></td>
        <td><button type="button" class="btn btn-danger">Delete</button></td>
        </tr>`;
      $('#table-body').append(content);
    }
    $('.btn-info').click((event) => {
      $('#form').css('display', 'block');
      $('#heading').css('display', 'none');
      console.log($(event.target).closest('tr').find('#id').text());
      id = $(event.target).closest('tr').find('#id').text();
    });
    $('#discard').click(() => {
      $('#form').css('display', 'none');
      $('#heading').css('display', 'block');
    });
    $('#submit').click(() => {
      alert('you clicked submit button');
      alert(id);
    });
  });
});
