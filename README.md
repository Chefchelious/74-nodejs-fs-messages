# Работа с модулем Node.js `fs` (File System)

## Шаги для запуска проекта:

1. **Клонируйте репозиторий:**

   `git clone https://github.com/Chefchelious/74-nodejs-fs-messages.git`

2. **В корневой папке выполните команду для установки зависимостей:**

   `npm install`

3. **Запустите проект:**

   `npm run dev`

## API для работы с сообщениями:

### Базовый URL: `http://localhost:8000/messages`

- **POST** - Создание сообщения
  - **Описание:** Создает папку `messages`, если она не существует, или записывает текстовый файл с данными из тела запроса.
  - **Пример тела запроса:**
    ```json
    {
      "message": "hello"
    }
    ```

- **GET** - Получение сообщений
  - **Описание:** Читает директорию `messages` и возвращает последние пять сообщений.

# Work with Node.js `fs` (File System) Module

## Steps to Run the Project:

1. **Clone the repository:**

     `git clone https://github.com/Chefchelious/74-nodejs-fs-messages.git`

2. **In the root folder, run the command to install dependencies:**

   `npm install`

3. **Start the project:**

   `npm run dev`

## API for Handling Messages:

### Base URL: `http://localhost:8000/messages`

- **POST** - Create a message
  - **Description:** Creates a `messages` folder if it does not exist or writes a text file with the data from the request body.
  - **Example Request Body:**
    ```json
    {
      "message": "hello"
    }
    ```

- **GET** - Retrieve messages
  - **Description:** Reads the `messages` directory and returns the last five messages.
