import React from "react";

import { Link } from "react-router-dom";
import { IProduct } from "../interface/Product";

type Props = {
  products: IProduct[];
  onDelete: (id: number | string) => void;
};

const ProductList = ({ products, onDelete }: Props) => {
  return (
    <>
      <h1>Danh sách sản phẩm</h1>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh SP</th>
            <th>Tên SP</th>
            <th>Giá tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <img width={90} src={product.image} />
              </td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/product/edit/${product.id}`}>Sửa</Link>
                <button onClick={() => onDelete(product.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
