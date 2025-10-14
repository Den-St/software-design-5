import { Router } from 'express';

import { catchAsync } from 'utils/catchAsync';

import { createStudent } from '../controllers/students/createStudent';
import { deleteStudent } from '../controllers/students/deleteStudent';
import { findAllStudents } from '../controllers/students/findAllStudents';
import { findOneStudent } from '../controllers/students/findOneStudent';
import { updateStudent } from '../controllers/students/updateStudent';
import { validateCreateStudent } from '../middleware/validation/students/validateCreateStudent';

const router = Router();

router.post('/', validateCreateStudent, catchAsync(createStudent));
router.get('/', catchAsync(findAllStudents));
router.get('/:id', catchAsync(findOneStudent));
router.put('/:id', catchAsync(updateStudent));
router.delete('/:id', catchAsync(deleteStudent));

export { router as studentRoutes };
