$(function(){
  function buildMessage(message){
    var image=message.image!= null ? `<img class="lower-message__image" src="${message.image}">`:""
    
    
    var html=`<div class="message">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.name}
                  </div>
                  <div class="upper-message__date">
                  ${message.created_at}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                  ${message.content}
                  ${image}
                  </p>
                </div>`

 

    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData=new FormData(this);
    var url = $(this).attr('action');
    
    
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html=buildMessage(message);
      $('.messages').append(html);   
      $(".form__submit").prop("disabled", false);
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
     
    })

    .fail(function(){
      alert("メッセージの送信に失敗しました。");
    })

  });
});



  
