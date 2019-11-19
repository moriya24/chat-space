$(function(){


  function buildMessage(message){
    var image=message.image!= null ? `<img class="lower-message__image" src="${message.image}">`:""
    var html=`<div class="message" data-messages_id="${message.id}">
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
                  </p>
                  ${image}
                </div>`

 

    return html;
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
  if(document.URL.match(/messages/)){

  var reloadMessages = function() {
      
  url1=location.href;
  created_url=url1.replace("messages",'api/messages');
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".message").last().data("messages_id");
  //   var buildMessageHTML = function(message) {
      
  //   var image=message.image!= null ? `<img class="lower-message__image" src="${message.image}">`:""
  //   var html=`<div class="message" data-messages_id="${message.id}">
  //               <div class="upper-message">
  //                 <div class="upper-message__user-name">
  //                   ${message.name}
  //                 </div>
  //                 <div class="upper-message__date">
  //                 ${message.created_at}
  //                 </div>
  //               </div>
  //               <div class="lower-message">
  //                 <p class="lower-message__content">
  //                 ${message.content}
  //                 </p>
  //                 ${image}
  //               </div>`
  //   return html;
  // }
     
   
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: created_url,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
      
    })
    .done(function(messages) {
      var part_html = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      for (var i=0; i<messages.length;i++){
      //メッセージが入ったHTMLを取得
        part_html=part_html+buildMessage(messages[i]);
      //メッセージを追加
      
        $('.messages').append(part_html);
      }
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("fail");
    });
  }
  setInterval(reloadMessages, 7000);
 }
 
});

  
