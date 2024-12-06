import {db} from '../database/db.js';

export const getAllShoppingCarts = (req, res) => {
    const query = `
        SELECT cart_id, user_id, created_at, admin_id
        FROM ShoppingCart
    `;

    // Execute the query
    db.execute(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No shopping carts found' });
        }

        res.status(200).json(results);
    });
};

export const getShoppingCartById = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT sc.cart_id, sc.user_id, sc.created_at, sc.admin_id, u.first_name AS user_name, a.first_name AS admin_name
        FROM ShoppingCart sc
        LEFT JOIN Users u ON sc.user_id = u.user_id
        LEFT JOIN Admins a ON sc.admin_id = a.admin_id
        WHERE sc.cart_id = ?;
    `;

    db.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Shopping cart not found' });
        }

        res.status(200).json(results[0]);
    });
};

export const createShoppingCart = async (req, res) => {
    const { admin_id } = req.body;
    const {userId} = req.params;

    // Fetch user data from the /get_user/:id API
    try {
        // const userResponse = await fetch(`http://your-api-url/api/v1/get_user/${user_id}`);

        // if (!userResponse.ok) {
        //     console.error('Failed to fetch user data');
        //     return res.status(404).json({ error: 'User not found' });
        // }

        // const userData = await userResponse.json();
        // const user_id_from_api = userData.user_id;  // Extract the user_id from the API response

        // Proceed to create the shopping cart using the fetched user_id
        const query = `
            INSERT INTO ShoppingCart (user_id, admin_id)
            VALUES (?, ?);
        `;

        db.execute(query, [userId, admin_id || 1], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to create shopping cart' });
            }

            res.status(201).json({
                message: 'Shopping cart created successfully',
                cart_id: results.insertId,
            });
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ error: 'Failed to retrieve user data' });
    }
};




export const updateShoppingCart = (req, res) => {
    const { id } = req.params;
    const { user_id, admin_id } = req.body;

    const query = `
        UPDATE ShoppingCart
        SET user_id = ?, admin_id = ?
        WHERE cart_id = ?;
    `;

    db.execute(query, [user_id || null, admin_id || null, id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Shopping cart not found' });
        }

        res.status(200).json({ message: 'Shopping cart updated successfully' });
    });
};

export const deleteShoppingCart = (req, res) => {
    const { id } = req.params;

    const query = `
        DELETE FROM ShoppingCart
        WHERE cart_id = ?;
    `;

    db.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Shopping cart not found' });
        }

        res.status(200).json({ message: 'Shopping cart deleted successfully' });
    });
};