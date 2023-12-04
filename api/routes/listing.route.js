import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createListing, deleteListing, getListing, getListings, updateListing } from '../controllers/listing.controller.js'


const listingRouter=express.Router()
listingRouter.post('/create', verifyToken, createListing)
listingRouter.delete('/delete/:id', verifyToken, deleteListing)
listingRouter.post('/update/:id',verifyToken, updateListing)
listingRouter.get('/get/:id', getListing)
listingRouter.get('/get', getListings)
export default listingRouter 