const router = require('express').Router()
const resellerController = require('../../controllers/dashboard/resellerController')
const { authMiddleware } = require('../../middlewares/authMiddleware')


router.get('/request-reseller-get',resellerController.get_reseller_request)

router.get('/get-resellers' , resellerController.get_active_resellers)
router.get('/get-deactive-resellers',resellerController.get_deactive_resellers)

router.get('/get-reseller/:resellerId',resellerController.get_reseller)
router.post('/reseller-status-update',resellerController.reseller_status_update)

module.exports = router