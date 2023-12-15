import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const params = useParams();

  const navigate = useNavigate();
  //GETTING SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://alive-hare-cape.cyclic.app/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setWeight(data.product.weight);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
     
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);



  //FOR UPDATING PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("weight", weight);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      image && productData.append("image", image);

      const { data } = axios.put(
        `https://alive-hare-cape.cyclic.app/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        alert("Product Updated Successfully..😃");
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Wrong");
    }
  };
  //FOR DELETEING
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this Product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `https://alive-hare-cape.cyclic.app/api/api/v1/product/delete-product/${id}`
      );
      toast.success("Product has been deleted");
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-4 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              
              <div className="md-3">
                <label className="btn btn-primary">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                {image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="product-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`https://alive-hare-cape.cyclic.app/api/api/v1/product/product-photo/${id}`}
                      alt="product-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={name}
                  placeholder="Write Name Here"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={weight}
                  placeholder="Write Author Name Here"
                  className="form-control"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <textarea
                  type="text"
                  value={description}
                  placeholder="Add Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Price Here"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Quantity Here"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select md-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
