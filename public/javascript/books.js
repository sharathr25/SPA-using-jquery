$(document).ready(() => {
  let isbn;
  let newBook;
  let row;
  // let count;

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

  function loadBooks() {
    $.get('/books', (data) => {
      let i = 0;
      for (; i < data.length; i += 1) {
        const content = `<tr>
        <td>${i + 1}</td>
        <td><img src="images/${data[i].isbn}.jpeg" alt="BOOK" id="img"></td>
        <td id="isbn">${data[i].isbn}</td>
        <td id="title">${data[i].title}</td>
        <td id="name">${data[i].name}</td>
        <td><button type="button" class="btn btn-info">Edit</button></td>
        <td><button id="delete" type="button" class="btn btn-danger">Delete</button></td>
        </tr>`;
        $('#table-body').append(content);
      }
      // count = i;
      $('.btn-info').click((event) => {
        newBook = false;
        $('#form').css('display', 'block');
        $('#heading').css('display', 'none');
        isbn = $(event.target).closest('tr').find('#isbn').text();
        row = $(event.target).closest('tr');
        $.get(`/books/${isbn}`, (book) => {
          setFormValues(book);
        });
      });
      $('#delete').click((event) => {
        isbn = $(event.target).closest('tr').find('#isbn').text();
        row = $(event.target).closest('tr');
        $.ajax({
          url: `/books/${isbn}`,
          type: 'DELETE',
          success: (responce) => {
            console.log(responce);
            window.location.reload();
          },
        });
      });
      $('#add-book').click(() => {
        newBook = true;
        let author;
        $.get('/authors', (responce) => {
          author = responce;
          console.log(author);
          for (let j = 0; j < author.length; j += 1) {
            const content = `<option value="${author[j].id}">${author[j].name}</option>`;
            $('#selector').append(content);
          }
        });
        $('#form').css('display', 'block');
        $('#heading').css('display', 'none');
        unSetFormValues();
      });
    });
  }

  loadBooks();

  $('#discard').click(() => {
    $('#form').css('display', 'none');
    $('#heading').css('display', 'block');
  });

  $('#submit').click(() => {
    const authorId = $('#selector').children('option:selected').attr('value');
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
      $.ajax({
        url: '/books',
        type: 'POST',
        data: JSON.stringify(book),
        contentType: 'application/json',
        success: (responce) => {
          console.log(responce);
        },
      });
      window.location.reload();
    } else {
      $.ajax({
        url: `/books/${isbn}`,
        type: 'PUT',
        data: JSON.stringify(book),
        contentType: 'application/json',
        success: (responce) => {
          console.log(responce);
        },
      });
      $.get(`books/${isbn}`, (data) => {
        console.log(data);
        row.find('#title').text(data[0].title);
        row.find('#name').text(data[0].name);
      });
    }
    $('#form').css('display', 'none');
    $('#heading').css('display', 'block');
    console.log(book);
  });
});
