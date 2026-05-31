// ajax requests for POST and DELETE methods

$(document).ready(function(){
  console.log('todo-list.js loaded, jQuery version:', $.fn && $.fn.jquery);

  $('form').on('submit', function(e){
    e.preventDefault();
    const item = $('form input');
    const todo = {item: item.val()};
    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function(data){
        // navigate to GET /todo to avoid "resend form data" on reload
        window.location.href = '/todo';
      },
      error: function(xhr, status, err){
        console.error('POST error', status, err, xhr.responseText);
      }
    });
    return false;
  });

  // narrow selector if your list has an id/class, e.g. '#todo-list li'
  $(document).on('click', 'li', function(e){
    e.preventDefault();
    const text = $(this).text().trim();

    // normalize to match server normalization (lowercase + hyphens)
    const raw = text.replace(/ /g, '-').toLowerCase();
    const item = encodeURIComponent(raw);

    $.ajax({
      type: 'DELETE',
      url: '/todo/' + item,
      success: function(data){
        // navigate to GET /todo to avoid reload prompting resubmit
        window.location.href = '/todo';
      },
      error: function(xhr, status, err){
        console.error('DELETE failed', status, err, xhr.responseText);
      }
    });
  });

});
