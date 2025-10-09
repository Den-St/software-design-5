import { Router } from 'express';

import { ParentController } from '../controllers/parent.controller';

const router = Router();
const controller = new ParentController();

router.post('/', controller.create.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findOne.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));

export default router;
