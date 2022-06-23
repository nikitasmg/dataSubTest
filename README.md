# Запуск проекта

## Бэк
``` javascript
 cd backend
 yarn install
 //Для запуска контейнера Redis 
 docker run -d --name dataSubRedis -p 127.0.0.1:6379:6379 redis
```

## Фронт

``` javascript
cd frontend
yarn install 
yarn dev
```