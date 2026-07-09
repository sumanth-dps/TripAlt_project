
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

export default function Customizations() {
  /* ---------------- BANNERS ---------------- */
  const [banners, setBanners] = useState([
    {
      id: uuidv4(),
      title: "Summer Special",
      image: "",
      link: "/offers/summer",
    },
  ]);

  const [bannerForm, setBannerForm] = useState({
    id: null,
    title: "",
    image: "",
    link: "",
  });

  const handleBannerImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setBannerForm((p) => ({ ...p, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveBanner = () => {
    if (!bannerForm.title || !bannerForm.image) {
      alert("Banner title & image required");
      return;
    }

    if (bannerForm.id) {
      setBanners((p) =>
        p.map((b) => (b.id === bannerForm.id ? bannerForm : b))
      );
    } else {
      setBanners((p) => [...p, { ...bannerForm, id: uuidv4() }]);
    }

    setBannerForm({ id: null, title: "", image: "", link: "" });
  };

  const editBanner = (b) => setBannerForm(b);
  const deleteBanner = (id) =>
    setBanners((p) => p.filter((b) => b.id !== id));

  /* ---------------- COUPONS ---------------- */
  const [coupons, setCoupons] = useState([
    {
      id: uuidv4(),
      code: "KEYO200",
      discount: 200,
      minAmount: 1500,
      expiry: "2025-12-31",
      active: true,
    },
  ]);

  const [couponForm, setCouponForm] = useState({
    id: null,
    code: "",
    discount: "",
    minAmount: "",
    expiry: "",
    active: true,
  });

  const saveCoupon = () => {
    if (!couponForm.code || !couponForm.discount) {
      alert("Coupon code & discount required");
      return;
    }

    if (couponForm.id) {
      setCoupons((p) =>
        p.map((c) => (c.id === couponForm.id ? couponForm : c))
      );
    } else {
      setCoupons((p) => [...p, { ...couponForm, id: uuidv4() }]);
    }

    setCouponForm({
      id: null,
      code: "",
      discount: "",
      minAmount: "",
      expiry: "",
      active: true,
    });
  };

  const editCoupon = (c) => setCouponForm(c);
  const deleteCoupon = (id) =>
    setCoupons((p) => p.filter((c) => c.id !== id));

  return (
    <div className="space-y-6 p-3 lg:p-6">

      <h1 className="text-3xl font-bold text-[#0A1C4F]">
        Customizations
      </h1>

      {/* ================= BANNERS ================= */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-[#003566]">
          Homepage Banners
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            className="custom-input"
            placeholder="Banner Title"
            value={bannerForm.title}
            onChange={(e) =>
              setBannerForm({ ...bannerForm, title: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleBannerImage(e.target.files[0])}
            className="custom-input"
          />

          <input
            className="custom-input"
            placeholder="Redirect Link"
            value={bannerForm.link}
            onChange={(e) =>
              setBannerForm({ ...bannerForm, link: e.target.value })
            }
          />

          <button
            onClick={saveBanner}
            className="bg-[#0A1C4F] text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus /> {bannerForm.id ? "Update" : "Add"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {banners.map((b) => (
            <div key={b.id} className="border border-gray-100 shadow-md rounded-xl overflow-hidden">
              {b.image && (
                <img
                  src={b.image}
                  alt=""
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 space-y-2">
                <p className="font-semibold text-[#003566]">{b.title}</p>
                <p className="text-sm  text-blue-600">{b.link || "-"}</p>

                <div className="flex gap-3">
                  <button onClick={() => editBanner(b)} className="text-orange-600 p-2 shadow-sm bg-orange-100 rounded-full cursor-pointer hover:bg-orange-200 hover:text-orange-800 duration-300">
                    <MdEdit />
                  </button>
                  <button onClick={() => deleteBanner(b.id)} className="text-red-600 p-2 shadow-sm bg-red-100 b rounded-full cursor-pointer hover:bg-red-200 hover:text-red-800 duration-300">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COUPONS ================= */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-[#003566]">
          Coupon Codes
        </h2>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <input className="custom-input" placeholder="Coupon Code"
            value={couponForm.code}
            onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
          />
          <input className="custom-input" placeholder="Discount ₹"
            value={couponForm.discount}
            onChange={(e) => setCouponForm({ ...couponForm, discount: e.target.value })}
          />
          <input className="custom-input" placeholder="Min Amount"
            value={couponForm.minAmount}
            onChange={(e) => setCouponForm({ ...couponForm, minAmount: e.target.value })}
          />
          <input type="date" className="custom-input"
            value={couponForm.expiry}
            onChange={(e) => setCouponForm({ ...couponForm, expiry: e.target.value })}
          />
          <select className="custom-input"
            value={couponForm.active}
            onChange={(e) =>
              setCouponForm({ ...couponForm, active: e.target.value === "true" })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button onClick={saveCoupon} className="bg-[#0A1C4F] text-white rounded-lg">
            {couponForm.id ? "Update" : "Add"}
          </button>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0A1C4F] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Code</th>
                <th className="px-4 py-3 text-left">Discount</th>
                <th className="px-4 py-3 text-left">Min Amount</th>
                <th className="px-4 py-3 text-left">Expiry</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="px-4 py-3 font-semibold">{c.code}</td>
                  <td className="px-4 py-3">₹{c.discount}</td>
                  <td className="px-4 py-3">₹{c.minAmount || "-"}</td>
                  <td className="px-4 py-3">{c.expiry || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs
                      ${c.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <MdEdit className="text-blue-600 cursor-pointer" onClick={() => editCoupon(c)} />
                    <MdDelete className="text-red-600 cursor-pointer" onClick={() => deleteCoupon(c.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">
          {coupons.map((c) => (
            <div key={c.id} className="border border-[#f5cc00] rounded-xl p-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#003566]">{c.code}</p>
                <span className={`px-3 py-1 rounded-full text-xs
                  ${c.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {c.active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                <div>
                  <p className="text-gray-500">Discount</p>
                  <p className="font-semibold">₹{c.discount}</p>
                </div>
                <div>
                  <p className="text-gray-500">Min Amount</p>
                  <p>₹{c.minAmount || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Expiry</p>
                  <p>{c.expiry || "-"}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button onClick={() => editCoupon(c)} className="text-blue-600">Edit</button>
                <button onClick={() => deleteCoupon(c.id)} className="text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
