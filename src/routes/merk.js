import { Router } from 'express';
const merk = require('../controllers/merk.controller');
const router = Router();

router.get('/', merk.Merks);

router.get('/create', merk.getCreate);

router.post('/create', merk.postCreate);

router.get('/delete/:id', merk.delete);

router.get('/edit/:id', merk.getEdit);

router.post('/edit/', merk.postEdit);


export default router;