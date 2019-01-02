$(document).ready(() => {
  let isbn;
  $.get('/books', (data, status) => {
    console.log(status);
    console.log(typeof data);
    for (let i = 0; i < data.length; i += 1) {
      const content = `<tr>
      <td>${i + 1}</td>
      <td><img src="images/${data[i].isbn}.jpeg"></td>
      <td id="isbn">${data[i].isbn}</td>
      <td>${data[i].title}</td>
      <td>${data[i].name}</td>
      <td><button type="button" class="btn btn-info">Edit</button></td>
      <td><button id="delete" type="button" class="btn btn-danger">Delete</button></td>
      </tr>`;
      $('#table-body').append(content);
    }
    $('.btn-info').click((event) => {
      $('#form').css('display', 'block');
      $('#heading').css('display', 'none');
      isbn = $(event.target).closest('tr').find('#isbn').text();
      $.get(`/books/${isbn}`, (book) => {
        $('#isbnno').val(book[0].isbn).attr('disabled', true);
        $('#title').val(book[0].title);
        $('#subtitle').val(book[0].subtitle);
        $('#publisher').val(book[0].publisher);
        $('#pages').val(book[0].pages);
        $('#description').val(book[0].description);
      });
    });
    $('.btn-success').click(() => {
      $('#form').css('display', 'block');
      $('#heading').css('display', 'none');
      $('#isbnno').val('').attr('disabled', false);
      $('#title').val('');
      $('#subtitle').val('');
      $('#publisher').val('');
      $('#pages').val('');
      $('#description').val('');
    });
  });
  $('#discard').click(() => {
    $('#form').css('display', 'none');
    $('#heading').css('display', 'block');
  });
  $('#submit').click(() => {
    console.log($('#isbnno').attr('disabled'));
  });
});
