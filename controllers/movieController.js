const pool = require('../database/index');

const movieController = {
    getAll: async (req, res) => {
        try {
            const { page, limit, sort_title_fa } = req.query;
            let data; // Declare the 'data' variable here

            if (page && limit) {
                const offset = (page - 1) * limit;
                let query;

                if (sort_title_fa) {
                    const sortOrder = sort_title_fa === 'desc' ? 'DESC' : 'ASC';
                    query = `SELECT * FROM movies ORDER BY CONVERT(title_fa USING utf8mb4) COLLATE utf8mb4_persian_ci ${sortOrder} LIMIT ? OFFSET ?`;
                } else {
                    query = 'SELECT * FROM movies LIMIT ? OFFSET ?';
                }

                const [result] = await pool.query(query, [+limit, +offset]);
                data = result; // Assign the result to 'data'

                const [totalPageData] = await pool.query('SELECT COUNT(*) AS count FROM movies');
                const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

                res.json({
                    data: data,
                    pagination: {
                        page: +page,
                        limit: +limit,
                        totalPage
                    }
                });
            } else {
                if (sort_title_fa) {
                    const sortOrder = sort_title_fa === 'desc' ? 'DESC' : 'ASC';
                    query = `SELECT * FROM movies ORDER BY CONVERT(title_fa USING utf8mb4) COLLATE utf8mb4_persian_ci ${sortOrder}`;
                } else {
                    query = 'SELECT * FROM movies';
                }
                const [result, fields] = await pool.query(query);
                data = result; // Assign the result to 'data'

                res.json({
                    data: data,
                    pagination: {
                        page: +page,
                        limit: +limit,
                        totalPage: 1 // You might want to set a default value for totalPage when 'page' and 'limit' are not provided
                    }
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: 'error'
            });
        }
    },
    getById: async (req, res) => {
        try {
            const {id} = req.params
            const [movie, fields] = await pool.query("SELECT * FROM movies where id = ?", [id]);
            res.json({
                data: movie
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
};

module.exports = movieController;