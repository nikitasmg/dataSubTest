# Запуск проекта

## Бэк
``` javascript
 cd backend
 yarn install
 //Для запуска контейнера Redis 
 docker run -d --name dataSubRedis -p 127.0.0.1:6379:6379 redis
 yarn start
```

## Фронт

``` javascript
cd frontend
yarn install 
yarn dev
```

## Пример правильных данных 
```javascript
{
    "cardNumber" : '4917881439840940',
    "expDate" : '20/2022',
    "cvv" : '123',
    "amount" : '1234'
}

```