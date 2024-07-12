import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import { IProduct } from "./interface/Product";
import { useForm } from "react-hook-form";

function App() {
  type formType = Pick<IProduct, "title" | "price" | "image" | "category">;
  const [products, setProducts] = useState<IProduct[]>([]);
  const { register, handleSubmit, reset } = useForm<formType>({});
  const [flag, setFlag] = useState<string | number>(0); //
  //hien thi
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    })();
  }, []);
  //delete
  const onDelete = async (id: number) => {
    try {
      if (confirm("Are you sure you want to delete")) {
        await axios.delete(`http://localhost:3000/products/${id}`);
        alert("Xóa thành công");
        setProducts(products.filter((product: IProduct) => product.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitUpdate = async (formData: any) => {
    // console.log(data);
    try {
      const { data } = await axios.put(
        "http://localhost:3000/products/" + flag,
        formData
      );
      //  console.log(data);
      console.log(flag);
      const newproduct = products.map((product: IProduct) => {
        if (product.id == flag) {
          product = data;
        }
        return product;
      });
      setProducts(newproduct);
      setFlag(0);
      alert("Cập nhật thành công");
      // reset()
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = (id: number | string) => {
    setFlag(id);
    const product = products.filter((p: IProduct) => p.id === id);
    reset({
      title: product[0].title,
      image: product[0].image,
      price: product[0].price,
      category: product[0].category,
    });
  };
  // add

  const onAddSP = async (dataproduct: formType) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/products",
        dataproduct
      );
      setProducts([...products, data]);
      alert("Thêm mới thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      <AddProduct title="thêm sản phẩm mới" onAdd={onAddSP} />
      <div className="div2">
        <h2 className=" flex justify-center text-3xl mb-4">
          {" "}
          Danh sách sản phẩm
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Title</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: IProduct, index) =>
              product.id === flag ? (
                <tr key={product.id}>
                  <td colSpan={6}>
                    <EditProduct
                      product={product}
                      onUpdate={onSubmitUpdate}
                      setFlag={setFlag}
                    />
                  </td>
                </tr>
              ) : (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>
                    <img width={100} src={product.image} alt="image" />
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => onEdit(product.id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(product.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
