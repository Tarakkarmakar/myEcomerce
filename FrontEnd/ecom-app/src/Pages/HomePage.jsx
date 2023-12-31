import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import "../Style/homepage.css";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
import Avatar from "../Components/Avatar";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //For get all the categories

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((ele) => ele !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //GETTING all Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://alive-hare-cape.cyclic.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotalCount(); //for getting total product
  }, []);

  //DOING FILTER OPERATION
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://alive-hare-cape.cyclic.app/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  //GET TOTAL COUNT
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        "https://alive-hare-cape.cyclic.app/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
    }
  };

  //LOAD MORE FUNCTIONALITY
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://alive-hare-cape.cyclic.app/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"My store"}>
      <div className="row ms-3 mt-4">
        <div className="col-md-2">
          {/* Price Filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((ele) => (
                <div key={ele._id}>
                  <Radio value={ele.array}>{ele.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-2"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <div
            className="d-flex flex-wrap ms-3"
            style={{
              border: "0px solid green",
              margin: "auto",
              paddingLeft: "30px",
            }}
          >
            {products?.map((ele) => (
              <div
                className="card m-2"
                style={{
                  width: "18rem",
                  border: "0px solid red",
                  margin: "auto",
                }}
              >
                <img
                  src={`https://alive-hare-cape.cyclic.app/api/v1/product/product-photo/${ele._id}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <p className="card-text">
                    {ele.description.substring(0, 35)}...
                  </p>
                  <h5 className="card-text" style={{ color: "green" }}>
                    Price : ₹{ele.price}
                  </h5>
                  <div className="btn_div">
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${ele.slug}`)}
                    >
                      See Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      style={{ backgroundColor: "tomato" }}
                      onClick={() => {
                        setCart([...cart, ele]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, ele])
                        );
                        toast.success("Item added successfully");
                      }}
                    >
                      ADD TO CARD 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3" style={{ textAlign: "center" }}>
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading........" : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
