import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createListing, deleteListing } from '../controllers/listing.controller.js'


const listingRouter=express.Router()
listingRouter.post('/create', verifyToken, createListing)
listingRouter.delete('/delete/:id', verifyToken, deleteListing)

export default listingRouter 