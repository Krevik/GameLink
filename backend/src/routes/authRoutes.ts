import { Router } from 'express';
import { register, login } from '../controllers/authController';
import passport from 'passport';
import { body } from 'express-validator';

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').not().isEmpty().withMessage('Username is required'),
    register);

router.post('/login',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').not().isEmpty().withMessage('Password is required'),
    login);

router.get('/steam', passport.authenticate('steam'));
router.get('/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

export default router;
