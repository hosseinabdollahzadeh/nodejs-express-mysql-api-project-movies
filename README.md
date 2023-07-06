## Installation

1. Download the archive or clone the project using git
2. Create database schema (You can use the same database as the previous project.)
3. Create `.env` file from `.env.example` file and adjust database parameters (including schema name)
4. Run `npm install`
5. Run `npm start`
6. Open in browser or postman `GET http://127.0.0.1:3000/api/v1/movies` for get all movies or `GET http://127.0.0.1:3000/api/v1/movies/1` for get details of a specific movie
7. For pagination, you can use this format
8. For sort ASC or DESC according to persian title you can use `sort_title_fa=asc` or `sort_title_fa=desc` for example  `GET http://localhost:3000/api/v1/movies?page=1&limit=10&sort_title_fa=asc`