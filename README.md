­# AJAX-ицирование Hacker News

## Краткое описание

В данном задании Вы будете ­AJAX-ицировать [модифицировать для использования AJAX] работу приложения на Express. К концу дня ваш клон Hacker News позволит пользователям голосовать за сообщения, удалять сообщения, создавать новые сообщения и сортировать все сообщения, не обновляя страницу.

Чтобы начать работу, загрузите «скелет» программы, установите свои зависимости и создайте и заполните Вашу базу данных.

## Releases

### Release 0 : Голосование

Нажмите кнопку голосования рядом с сообщением. Вы заметите, что страница обновится и количество очков в столбце увеличилось. Вы также заметите в своем окне дробовика, что Ваш сервер должен был выполнить 21 SQL-запрос, когда страница обновилась! Ваша задача - ускорить время загрузки с помощью AJAX. Если все сделано правильно, действие нажатия кнопки голосования не приведет к обновлению всей страницы, а вместо этого обновит только цвет кнопки вЂ”В при обновлении базы данных.

Вот основной поток такого конкретного запроса AJAX:

1. Вы должны привязать получателя событий к любому тегу кнопки, принадлежащей к классу кнопок для голосования
2. Чтобы помешать обновлению клиента, предоставляемая функция обратного вызова должна предотвращать по умолчанию нажатие ссылки.
3. Затем должен последовать запрос AJAX на сервер нажатием маршрута сообщения '/posts/:id/vote' с правильным значением идентификатора.
4. Сервер должен обновить общее голосование по данному сообщению в базе данных.
5. Ответ сервера должен включать всё, что клиент (ваша функция обратного вызова JS) должен обновить в DOM.
6. Клиент, получив уведомление об успешном ответе сервера, должен обновить подсчет голосов и изменить цвет данной кнопки голосования на красный.

Вам нужно будет изменить маршрут сообщения '/posts/:id/vote' и написать некоторые пользовательские JavaScript и jQuery, чтобы это заработало. Вот основной синтаксис запроса AJAX с помощью jQuery.

не переводить
```javascript
  // $.ajax takes a hashmap of options as an argument.
  var ajaxRequest = $.ajax({
    // these two attributes determine which route in your controller will be called.
    url: "/foo",
    type: 'POST',
    // атрибут 'data' определяет, какие данные отправляются на сервер.
    // Сервер сможет получить доступ к этим значениям с помощью хэша params [параметры].
    // Если на сервер необходимо отсылать только информацию, переданную в URL, этот атрибут не требуется.
    data: { bar: 'baz' }
  })

  // функция .done выполняет обратный вызов, который запускается только в том случае, если сервер отвечает
  // с помощью идентификатора состояния удачного завершения. Обратный вызов будет принимать параметры, соответствующие
  // запросу объекта, статуса и данных, отправленных с сервера.
  ajaxRequest.done(someCallbackFunction)

  // как и функция .done, функция .fail отключит обратный вызов, если сервер отвечает
  // с кодом состояния ошибки.
  ajaxRequest.fail(someOtherCallbackFunction)
```

Какая информация должна поступать на сервер, чтобы обновить итоговое количество голосов? Что нужно знать клиенту для обновления DOM? Как клиент получает доступ к данным, отправленным с сервера, и наоборот? Вам нужно будет все это понять, чтобы все это работало.


### Release 1 : Оценки

Несомненно, успешное голосование заставляет стрелку, голосующую за то, что понравилось, менять цвет вЂ”, но количество оценок по сообщению не обновилось! Ваша задача в этом release - асинхронно обновлять значение оценок сообщения на странице всякий раз, когда кто-то нажимает кнопку голосования

В release 0 Вам было предложено отправить данные с сервера клиенту, который определил, какую кнопку голосования обновить. Вы отправили эти данные как неформатированную строку. Это эффективное решение, когда у Вас есть одна часть информации для передачи, но оно становится несостоятельным, когда Вам необходимо отправить более одной части информации - например, идентификатор сообщения и общее количество голосов. Для этой версии вы должны отправить строку, отформатированную в JSON. Ваш код будет выглядеть примерно так:

не переводить
```ruby
  post '/posts/:id/vote' do
    ##logic for adding a vote to a post.

    content_type :json
    { foo: 'bar', baz: 'qux' }.to_json
  end
```

Обратный вызов `.done ()` теперь будет иметь доступ к данным, переданным с сервера, к которым можно получить доступ в качестве хэш-карты JavaScript.

### Release 2 : Удаление

Теперь, когда у Вас есть голосование и управление, Вы должны сделать функциональной ссылку «удалить это сообщение». При щелчке по ссылке следует удалить связанное сообщение из базы данных и, следовательно, удалить сообщение из DOM.

Мы уже создали для Вас «скелет» маршрута. Вам нужно будет написать текст этого маршрута, получателя событий и функции обратного вызова, чтобы он заработал.

### Release 3 : Создание

После того как сделано удаление, Вам предстоит сложнейшая задача: получить работающую форму создания сообщения в нижней части страницы. Ваша первая задача - отправить правильные данные на сервер. Посмотрите на использование функции .serialize () jQuery - это полезный способ получать данные из форм.

У Вас уже был ответ маршрутов с неформатированной строкой и строкой, форматированной как JSON. Для этого release вы должны вернуть на сервер строку, отформатированную в HTML, как частичную. Затем Вы можете добавить часть строки прямо на страницу.

### Release 4 : Вы уверены, что все работает?

Отлично, Вы создали новое сообщение! Работает ли кнопка голосования? Удаляется ли ссылка? Возможно, нет. Заставьте их заработать.

Существует много способов решить эту задачу. Способ [Реализации делегирования событий jQuery] (https://learn.jquery.com/events/event-delegation/) может оказаться полезным.

### Release 5 : Проверка данных

На данный момент пользователи могут создавать сообщения, оставляя названия пустыми. Вы должны предотвратить это, используя проверки ActiveRecord. Если сообщение не удается создать, сервер должен сообщить клиенту и клиент должен сообщить об этом пользователю, обновив DOM.

Серверы предоставляют простой способ для устранения ошибок - коды состояния HTTP. Коды состояния 200 соответствуют успешным запросам, тогда как коды 400 и 500 соответствуют ошибкам. Функция `$.ajax()` будет определять, какой обратный вызов срабатывает на основе кода ошибки, возвращаемого сервером. Вы можете установить коды ошибок, подобные этому в Sinatra::

```
```





# AJAXifying Hacker News

## Summary

In this challenge, you'll be AJAX-ifying a working Sinatra app. By the end of
today, your Hacker News clone will allow users to vote on posts, delete posts,
create new posts, and sort all posts without ever refreshing the page.

To get started, download the skeleton, install your dependencies, and create
and seed your database.

## Releases

### Release 0 : Voting

Press the vote button next to a post. You'll notice the page refreshes, and the
points count of the post has increased. You'll also notice in your shotgun
window that your server had to make 21 SQL queries when the page refreshed!
Your job is to speed up the load time by using AJAX. If done correctly, the act
of clicking a vote button will not cause the entire page to refresh, but
instead only update the color of the button — while still updating the
database.

Here's the basic flow of this particular AJAX request:

1. You should bind an event listener to any button tag of the vote-button class
2. To stop a client refresh from occuring, the provided callback function should prevent the default behavior of clicking a link.
3. It should then make an AJAX request to the server, hitting the post '/posts/:id/vote' route with the right id value.
4. The server should update the vote total of the given post in the database.
5. The server response should include everything the client (your JS callback function) needs to update the DOM..
6. The client, after being notified of a successful response by the server, should update the vote count and change the color of the given vote button to red.

You'll need to alter the post '/posts/:id/vote' route  and write some custom JavaScript and jQuery to get this working. Here's the basic syntax for an AJAX request using jQuery.

```javascript
  // $.ajax takes a hashmap of options as an argument.
  var ajaxRequest = $.ajax({
    // these two attributes determine which route in your controller will be called.
    url: "/foo",
    type: 'POST',
    // the 'data' attribute determines what data is sent to the server.
    // The server will be able to access these values using the params hash.
    // If the server only needs to know information passed in the URL, this attribute is not necessary.
    data: { bar: 'baz' }
  })

  // the .done function takes a callback, which will only be fired if the server responds
  // with a success status code. the callback will receive arguments corresponding to the
  // request object, status, and data sent from the server.
  ajaxRequest.done(someCallbackFunction)

  // like the .done function, the .fail function will fire off a callback if the server responds
  // with an error status code.
  ajaxRequest.fail(someOtherCallbackFunction)
```

What does the server need to know to update a given vote total? What does the
client need to know to update the DOM? How does the client get access to data
sent from the server, and vice versa? You'll need to figure this all out to
make this functional.


### Release 1 : Points

Sure, a successful vote causes the upvote arrow to change color — but the point
score of the post hasn't been updated! Your task in this release is to
asynchronously update a post's points value on the page whenever someone clicks
the vote button

In release 0, you were asked to send data from the server to the client that
identified which vote button to update. You sent this data as an unformatted
string. That is a viable solution when you have a single piece of information
to transmit, but becomes untenable when you need to send more than one piece of
information -- like a post ID and a vote total. For this release, you should
send back a string formatted in JSON. Your code will look something like this:

```ruby
  post '/posts/:id/vote' do
    ##logic for adding a vote to a post.

    content_type :json
    { foo: 'bar', baz: 'qux' }.to_json
  end
```

The `.done()` callback will now have access to the data passed from the server,
which can be accessed as a JavaScript hashmap.

### Release 2 : Deleting

Now that you've got voting up and running, you should make the "delete this
post" link functional. Clicking the link should delete the associated post from
the database and consequently remote the post from the DOM.

We've already created a skeleton route for you to use. You'll need to write the
body of that route, an event listener, and callback functions to make this
work.

### Release 3 : Creating

With deletion done, you're on to your hardest challenge yet — getting the
creation form at the bottom of the page to work. Your first challenge will be
to send the the right data to the server. Look into using jQuery's .serialize()
function -- its a useful way to get data out of forms.

You've already had routes respond with an unformatted string and with a string
formatted as JSON. For this release, you should have your server return a
string formatted in HTML, a.k.a. a partial. You can then append the partial
directly to the page.

### Release 4 : Are you sure everything works?

Great, you've created a new post! Does its vote button work? its delete link?
Probably not. Get them working.

There are many ways to solve this problem. [jQuery's implementation of event
delegation](https://learn.jquery.com/events/event-delegation/) may prove to be
useful.

### Release 5 : Validations

Users can currently create posts with blank titles. You should prevent that
from happening using ActiveRecord validations. If a post fails to create,
the server must let the client know, and the client should let the user know by
updating the DOM.

Servers provide an easy way for surfacing errors -- HTTP status codes. Codes in
the 200's correspond to successful requests, while  codes in the 400's and
500's correspond to errors. The `$.ajax()` function will decide which callback to
fire based on the error code returned by the server. You can set error codes
like this in Sinatra:

```ruby
  post '/posts' do
    #logic for attempting to save a post.
    if @post.save
      status 200
      erb :_post, :layout => false
    else
      status 422
    end
  end
```



