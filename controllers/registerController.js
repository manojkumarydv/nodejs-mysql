import pool from '../config/db.js'

// Create a new registration
export const createRegistration = async (req, res) => {
    const { Name, Email, DateOfBirth, PhoneNumber, Address } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Registration (Name, Email, DateOfBirth, PhoneNumber, Address) VALUES (?, ?, ?, ?, ?)',
            [Name, Email, DateOfBirth, PhoneNumber, Address]
        );
        res.status(201).json({ message: 'Registration created', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read all registrations
export const getRegistrations = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Registration');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read a single registration by ID
export const getRegistrationById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Registration WHERE ID = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a registration
export const updateRegistration = async (req, res) => {
    const { id } = req.params;
    const { Name, Email, DateOfBirth, PhoneNumber, Address } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Registration SET Name = ?, Email = ?, DateOfBirth = ?, PhoneNumber = ?, Address = ? WHERE ID = ?',
            [Name, Email, DateOfBirth, PhoneNumber, Address, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json({ message: 'Registration updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a registration
export const deleteRegistration = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Registration WHERE ID = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json({ message: 'Registration deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
