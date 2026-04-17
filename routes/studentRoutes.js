import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  patchStudent,
  deleteStudent
} from '../controllers/studentController.js'; 
import express from 'express';

const router = express.Router();

router.get('/students', getStudents);
router.post('/students', createStudent);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.patch('/students/:id', patchStudent);
router.delete('/students/:id', deleteStudent);

export default router;