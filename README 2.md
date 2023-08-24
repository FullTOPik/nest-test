Backend приложение для Тех-чеков.
Данное backend приложение представляет собой API-сервер, разработанный с использованием фреймворка NestJS и базы данных PostgreSQL с помощью TypeORM. Здесь представлены инструкции для установки, запуска и разработки данного приложения.

1) Установка
Для установки необходимо склонировать данный репозиторий на ваше устройство:
git clone https://github.com/Fortech-Nvch/fortech-qs-api

2) Создать и заполнить файл .env.

3) Установить зависимости командой: 
  -> npm i 

4) Запуск: 
  - Для разработки приложения в режиме "watch", который автоматически перезапускает сервер при изменениях в коде, выполните команду:
     -> npm run start:dev
  - Для запуска приложения в production режиме, выполните команду:
    -> npm run start:prod
  - Вы также можете запустить приложение с помощью Docker, используя docker-compose. Предварительно установите Docker на свой компьютер.
    Для запуска приложения с помощью Docker, выполните следующую команду:
    -> docker-compose -f docker-compose.yml up

5) Запуск миграций:
  - Для применения миграций в базе данных, выполните следующую команду:
    -> npm run migration:up
  - Для отмены миграций в базе данных, выполните следующую команду:
    -> npm run migration:down
  - Для генерации миграций, выполните следующую команду:
    -> npm run migration:generate --name=NameOfMigration
  