const router = require('express').Router()
const { authMiddleware } = require('../middlewares/authMiddleware')
const authControllers = require('../controllers/authControllers')
const resellerModel = require('../models/resellerModel')
router.post('/admin-login', authControllers.admin_login)
router.get('/get-user', authMiddleware, authControllers.getUser)
router.post('/seller-register', authControllers.seller_register)
router.post('/seller-login', authControllers.seller_login)
router.post('/reseller-register', async (req, res) => {
  try {
      const { name, email, password, shopName, contactNumber } = req.body;

      if (!name || !email || !password) {
          return res.status(400).json({ error: 'Name, email, and password are required.' });
      }

      if (!/.+\@.+\..+/.test(email)) {
          return res.status(400).json({ error: 'Invalid email format.' });
      }

      if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      }

      const existingReseller = await resellerModel.findOne({ email });
      if (existingReseller) {
          return res.status(400).json({ error: 'Reseller with this email already exists.' });
      }

      const reseller = new resellerModel({
          name,
          email,
          password,
          shopInfo: {
              shopName,
              contactNumber
          },
      });

      await reseller.save();
      res.status(201).json({ message: 'Reseller created successfully', reseller });
  } catch (error) {
      console.error('Error creating reseller:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/reseller-login', authControllers.reseller_login)
router.post('/profile-image-upload',authMiddleware, authControllers.profile_image_upload)
router.post('/profile-info-add',authMiddleware, authControllers.profile_info_add)

router.get('/logout',authMiddleware,authControllers.logout)

module.exports = router