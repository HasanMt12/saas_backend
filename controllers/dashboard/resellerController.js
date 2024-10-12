
const resellerModel = require('../../models/resellerModel')
const { responseReturn } = require('../../utiles/response')

class resellerController {
    
    get_reseller_request = async (req, res) => {
        const { page, searchValue, parPage } = req.query
        const skipPage = parseInt(parPage) * (parseInt(page) - 1)
        try {
            if (searchValue) {
                //const seller
            } else {
                const resellers = await resellerModel.find({ status: 'pending' }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })
                const totalSeller = await resellerModel.find({ status: 'pending' }).countDocuments()
                responseReturn(res, 200, { totalSeller, resellers })
            }
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }
    get_reseller = async (req, res) => {
        const { resellerId } = req.params

        try {
            const resellers = await resellerModel.findById(resellerId)
            responseReturn(res, 200, { resellers })
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }

    reseller_status_update = async (req, res) => {
        const { sellerId, status } = req.body
        try {
            await resellerModel.findByIdAndUpdate(sellerId, {
                status
            })
            const seller = await resellerModel.findById(sellerId)
            responseReturn(res, 200, { seller, message: 're seller status update success' })
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }

    get_active_resellers = async (req, res) => {
        try {
            const resellers = await resellerModel.find(); // Fetch all resellers
            const totalReSeller = await resellerModel.countDocuments(); // Count total resellers
    
            return res.status(200).json({
                resellers,
                totalReSeller,
            });
        } catch (error) {
            console.error('Error fetching resellers:', error); // Log detailed error
            return res.status(500).json({
                message: 'Error fetching resellers',
                error: error.message || error,
            });
        }
    };
    

   

    get_deactive_resellers = async (req, res) => {
        let { page, searchValue, parPage } = req.query
        page = parseInt(page)
        parPage = parseInt(parPage)

        const skipPage = parPage * (page - 1)

        try {
            if (searchValue) {
                const sellers = await resellerModel.find({
                    $text: { $search: searchValue },
                    status: 'deactive'
                }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })

                const totalSeller = await resellerModel.find({
                    $text: { $search: searchValue },
                    status: 'deactive'
                }).countDocuments()

                responseReturn(res, 200, { totalSeller, sellers })
            } else {
                const sellers = await resellerModel.find({ status: 'deactive' }).skip(skipPage).limit(parPage).sort({ createdAt: -1 })
                const totalSeller = await resellerModel.find({ status: 'deactive' }).countDocuments()
                responseReturn(res, 200, { totalSeller, sellers })
            }

        } catch (error) {
            console.log('active seller get ' + error.message)
        }
    }
}

module.exports = new resellerController()