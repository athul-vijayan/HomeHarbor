import React, { useEffect, useState } from "react";
import { FaAndroid } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    seachTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListngs] = useState([]);
  console.log(listings);

  

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlSearchParams.get("searchTerm");
    const typeFromUrl = urlSearchParams.get("type");
    const parkingFromUrl = urlSearchParams.get("parking");
    const furnishedFromUrl = urlSearchParams.get("furnished");
    const offerFromUrl = urlSearchParams.get("offer");
    const sortFromUrl = urlSearchParams.get("sort");
    const orderFromUrl = urlSearchParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    )
      setSidebarData({
        seachTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });

      const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlSearchParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListngs(data);
        setLoading(false);
      };

    fetchListings();
    console.log("listing fetched from useEffect hook");
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    )
      setSidebarData({ ...sidebarData, type: e.target.id });
    if (e.target.id === "searchTerm")
      setSidebarData({ ...sidebarData, seachTerm: e.target.value });
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    )
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    if (e.target.id === "sort_order") {
      const sortAndOrderArray = e.target.value.split("_");
      const sort = sortAndOrderArray[0] || "createdAt";
      const order = sortAndOrderArray[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("searchTerm", sidebarData.seachTerm);
    urlSearchParams.set("type", sidebarData.type);
    urlSearchParams.set("parking", sidebarData.parking);
    urlSearchParams.set("furnished", sidebarData.furnished);
    urlSearchParams.set("offer", sidebarData.offer);
    urlSearchParams.set("sort", sidebarData.sort);
    urlSearchParams.set("order", sidebarData.order);
    const searchQuery = urlSearchParams.toString();
    navigate(`/search?${searchQuery}`);
    console.log("listing fetched from handleSubmit");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              onChange={handleChange}
              value={sidebarData.seachTerm}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
      </div>
    </div>
  );
}
