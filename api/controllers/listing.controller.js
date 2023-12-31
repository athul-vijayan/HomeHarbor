import listingModel from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await listingModel.create(req.body);
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await listingModel.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "listing not found"));
  if (req.user.id !== listing.userRef) return 401, "cant delete others listing";

  try {
    await listingModel.findByIdAndDelete(req.params.id);
    res.status(200).json("listing deleted");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = listingModel.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found"));
  if (listing.userRef !== req.user.id)
    return next(errorHandler(401, "unauthorised"));
  try {
    const updatedListing = await listingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "listing not found"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    let furnished = req.query.furnished;
    let parking = req.query.parking;
    let type = req.query.type;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false] };
    }

    if (parking === undefined || parking === "false") {
      parking = { $in: [true, false] };
    }

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [true, false] };
    }

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const listings = await listingModel
      .find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
