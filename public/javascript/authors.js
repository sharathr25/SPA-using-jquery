$(document).ready(() => {
  let id;
  let newAuthor;
  function setFormValues(author) {
    $('#id').val(author[0].id).attr('disabled', true);
    $('#name').val(author[0].name);
    $('#about').val(author[0].about);
    $('#place').val(author[0].place);
  }

  function unSetFormValues() {
    $('#id').val('').attr('disabled', false);
    $('#name').val('');
    $('#about').val('');
    $('#place').val('');
  }

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
      newAuthor = false;
      $('#form').css('display', 'block');
      $('#heading').css('display', 'none');
      console.log($(event.target).closest('tr').find('#id').text());
      id = $(event.target).closest('tr').find('#id').text();
      $.get(`/authors/${id}`, (author) => {
        console.log(author);
        setFormValues(author);
      });
    });

    $('.btn-danger').click((event) => {
      id = $(event.target).closest('tr').find('#id').text();
      $.ajax({
        url: `/authors/${id}`,
        type: 'DELETE',
        success: (responce) => {
          console.log(responce);
        },
      });
    });

    $('.btn-success').click(() => {
      newAuthor = true;
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
    const author = {
      name: $('#name').val(),
      about: $('#about').val(),
      place: $('#place').val(),
    };
    if (newAuthor) {
      author.id = $('#id').val();
      $.ajax({
        url: '/authors',
        type: 'POST',
        data: JSON.stringify(author),
        contentType: 'application/json',
        success: (responce) => {
          console.log(responce);
        },
      });
    } else {
      $.ajax({
        url: `/authors/${id}`,
        type: 'PUT',
        data: JSON.stringify(author),
        contentType: 'application/json',
        success: (responce) => {
          console.log(responce);
        },
      });
    }
    console.log(author);
  });
});
