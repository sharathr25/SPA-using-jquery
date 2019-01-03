$(document).ready(() => {
  let isbn;
  let newBook;

  function setFormValues(book) {
    $('#isbnno').val(book[0].isbn).attr('disabled', true);
    $('#title').val(book[0].title);
    $('#subtitle').val(book[0].subtitle);
    $('#publisher').val(book[0].publisher);
    $('#pages').val(book[0].pages);
    $('#description').val(book[0].description);
    $('#author-select').hide();
  }

  function unSetFormValues() {
    $('#isbnno').val('').attr('disabled', false);
    $('#title').val('');
    $('#subtitle').val('');
    $('#publisher').val('');
    $('#pages').val('');
    $('#description').val('');
    $('#author-select').show();
  }

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
      newBook = false;
      $('#form').css('display', 'block');
      $('#heading').css('display', 'none');
      isbn = $(event.target).closest('tr').find('#isbn').text();
      $.get(`/books/${isbn}`, (book) => {
        setFormValues(book);
      });
    });

    $('.btn-danger').click((event) => {
      isbn = $(event.target).closest('tr').find('#isbn').text();
      $.ajax({
        url: `/books/${isbn}`,
        type: 'DELETE',
        success: (responce) => {
          console.log(responce);
        },
      });
    });

    $('.btn-success').click(() => {
      newBook = true;
      let author;
      $.get('/authors', (responce) => {
        author = responce;
        console.log(author);
        for (let i = 0; i < author.length; i += 1) {
          const content = `<option value="${author[i].id}">${author[i].name}</option>`;
          $('#selector').append(content);
        }
      });
      $('#form').css('display', 'block');
      $('#heading').css('display', 'none');
      unSetFormValues();
    });
  });

  $('#discard').click(() => {
    $('#form').css('display', 'none');
    $('#heading').css('display', 'block');
  });

  $('#submit').click(() => {
    const authorId = $('#selector').children('option:selected').attr('value');
    console.log(authorId);
    const book = {
      title: $('#title').val(),
      subtitle: $('#subtitle').val(),
      publishedOn: $('#publishedon').val(),
      publisher: $('#publisher').val(),
      pages: $('#pages').val(),
      description: $('#description').val(),
      id: authorId,
    };
    if (newBook) {
      book.isbn = $('#isbnno').val();
      $.post('/books', (responce) => {
        console.log(responce);
      });
    } else {
      $.ajax({
        url: `/books/${isbn}`,
        type: 'PUT',
        success: (responce) => {
          console.log(responce);
        },
      });
    }
    console.log(book);
    console.log();
  });
});
