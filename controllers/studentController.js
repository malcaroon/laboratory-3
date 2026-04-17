import pool from '../config/db.js';

export const getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.status(200).json({students: rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const getStudentById = async (req, res) => {
  const {id} = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [
      id
    ]);

    if (rows.length === 0) {
      return res.status(404).json({error: 'Student not found'});
    }

    res.status(200).json({student: rows[0]});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const createStudent = async (req, res) => {
  const {firstName, lastName, age, course} = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO students (firstName, lastName, age, course) VALUES (?, ?, ?, ?)',
      [firstName, lastName, age, course]
    );

    res.status(201).json({
      message: 'Student created successfully',
      student: {
        id: result.insertId,
        firstName,
        lastName,
        age,
        course
      }
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const updateStudent = async (req, res) => {
  const {id} = req.params;
  const {firstName, lastName, age, course} = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE students SET firstName = ?, lastName = ?, age = ?, course = ? WHERE id = ?',
      [firstName, lastName, age, course, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({error: 'Student not found'});
    }

    res.status(200).json({message: 'Student updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const patchStudent = async (req, res) => {
  const {id} = req.params;
  const {firstName, lastName, age, course} = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE students SET firstName = COALESCE(?, firstName), lastName = COALESCE(?, lastName), age = COALESCE(?, age), course = COALESCE(?, course) WHERE id = ?',
      [firstName, lastName, age, course, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({error: 'Student not found'});
    }

    res.status(200).json({message: 'Student updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const deleteStudent = async (req, res) => {
  const {id} = req.params;

  try {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({error: 'Student not found'});
    }

    res.status(200).json({message: 'Student deleted successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};