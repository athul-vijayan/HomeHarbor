import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createListing, deleteListing, getListing, updateListing } from '../controllers/listing.controller.js'


const listingRouter=express.Router()
listingRouter.post('/create', verifyToken, createListing)
listingRouter.delete('/delete/:id', verifyToken, deleteListing)
listingRouter.post('/update/:id',verifyToken, updateListing)
listingRouter.get('/get/:id', verifyToken, getListing)
export default listingRouter 