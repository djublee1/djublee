import { Router } from 'express';
const tahun = require('../controllers/tahun.controller');
const router = Router();

router.get('/', tahun.Tahuns);

router.get('/create', tahun.getCreate);

router.post('/create', tahun.postCreate);

router.get('/delete/:id', tahun.delete);

// router.get('/edit/:id', tahun.getEdit);

// router.post('/edit/', tahun.postEdit);


export default router;