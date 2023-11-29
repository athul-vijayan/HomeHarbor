import listingModel from "../models/listing.model.js"

export const createListing =async (req, res, next)=>{

    try {
        const listing = await listingModel.create(req.body)
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}

