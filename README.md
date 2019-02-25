# AJAX-ицирование Hacker News

## Краткое описание

В данном задании Вы будете ­AJAX-ицировать работу приложения на Express. К концу дня ваш клон Hacker News позволит пользователям голосовать за сообщения, удалять сообщения, создавать новые сообщения и сортировать все сообщения, не обновляя страницу.

Чтобы начать работу, загрузите «скелет» программы, установите зависимости и создайте и заполните Вашу базу данных (Mongo).


```bash
npm install
node seed/post-seeder.js
npm start
```

## Releases

### Release 0 : Голосование

Нажмите кнопку голосования рядом с сообщением. Вы заметите, что страница обновится и количество очков в столбце увеличилось. Ваша задача - ускорить время загрузки с помощью AJAX. Если все сделано правильно, действие нажатия кнопки голосования не приведет к обновлению всей страницы, а вместо этого обновит только цвет кнопки при обновлении базы данных.

1. Вы должны привязать event listener к кнопкам, принадлежащим к классу кнопок для голосования
2. Чтобы помешать обновлению клиента, не забудьте про preventDefault.
3. Затем надо отправить запрос AJAX на сервер по адресу '/posts/:id/vote' с правильным значением идентификатора.
4. Сервер должен обновить общее голосование по данному сообщению в базе данных.
5. Ответ сервера должен включать всё, что клиент должен обновить в DOM.
6. Клиент, получив уведомление об успешном ответе сервера, должен обновить подсчет голосов и изменить цвет данной кнопки голосования на красный.

Вам нужно будет изменить маршрут '/posts/:id/vote' и написать некоторый клиентский JavaScript, чтобы это заработало.


### Release 1 : Оценки

Несомненно, успешное голосование заставляет стрелку, голосующую за то, что понравилось, менять цвет, но количество оценок по сообщению не обновилось! Ваша задача в этом release - асинхронно обновлять значение оценок сообщения на странице всякий раз, когда кто-то нажимает кнопку голосования

В release 0 Вам было предложено отправить данные с сервера клиенту, который определил, какую кнопку голосования обновить. Вы отправили эти данные как неформатированную строку. Это эффективное решение, когда у Вас есть одна часть информации для передачи, но оно становится несостоятельным, когда Вам необходимо отправить более одной части информации - например, идентификатор сообщения и общее количество голосов. Для этой версии вы должны отправить строку, отформатированную в JSON. Ваш код будет выглядеть примерно так:

```js
  app.post('/posts/:id/vote' (req, res) => {
    res.json({ foo: 'bar', baz: 'qux' });
  })
```

### Release 2 : Удаление

Теперь, когда у Вас есть голосование и управление, Вы должны сделать функциональной ссылку «удалить это сообщение». При щелчке по ссылке следует удалить связанное сообщение из базы данных и, следовательно, удалить сообщение из DOM.

Мы уже создали для Вас «скелет» маршрута. Вам нужно будет написать текст этого маршрута, получателя событий и функции обратного вызова, чтобы он заработал.

### Release 3 : Создание

После того как сделано удаление, Вам предстоит сложнейшая задача: получить работающую форму создания сообщения в нижней части страницы. Ваша первая задача - отправить правильные данные на сервер.

У Вас уже был ответ маршрутов с неформатированной строкой и строкой, форматированной как JSON. Для этого release вы должны вернуть на сервер строку, отформатированную в HTML, как частичную. Затем Вы можете добавить часть строки прямо на страницу.

### Release 4 : Вы уверены, что все работает?

Отлично, Вы создали новое сообщение! Работает ли кнопка голосования? Удаляется ли ссылка? Возможно, нет. Заставьте их заработать.


### Release 5 : Проверка данных

На данный момент пользователи могут создавать сообщения, оставляя названия пустыми. Вы должны предотвратить это. Если сообщение не удается создать, сервер должен сообщить клиенту и клиент должен сообщить об этом пользователю, обновив DOM.

Серверы предоставляют простой способ для устранения ошибок - коды состояния HTTP. Коды состояния 200 соответствуют успешным запросам, тогда как коды 400 и 500 соответствуют ошибкам. Клиентский js будет определять, какой обратный вызов срабатывает на основе кода ошибки, возвращаемого сервером.


