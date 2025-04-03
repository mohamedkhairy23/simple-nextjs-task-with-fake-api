"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const openDialog = (id) => {
    setSelectedProductId(id);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProductId(null);
  };

  const handleDelete = async () => {
    if (!selectedProductId) return;

    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/${selectedProductId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProductId)
        );
        closeDialog();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between p-4">
        <Head>
          <title>Products List</title>
          <meta name="description" content="Browse our product catalog" />
        </Head>

        <Link
          href="/product"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Add New Product
        </Link>
      </div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Image</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border">
                  <td className="border p-2 text-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="mx-auto"
                    />
                  </td>
                  <td className="border p-2 text-center text-sm">
                    {product.title}
                  </td>
                  <td className="border p-2 text-green-600 font-bold">
                    LE {product.price}
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-4 md:gap-6">
                      <Link href={`/product/${product.id}`}>
                        <FaEye color="#1864ab" className="cursor-pointer" />
                      </Link>
                      <Link href={`/product/edit/${product.id}`}>
                        <FaRegEdit color="#1864ab" className="cursor-pointer" />
                      </Link>
                      <button onClick={() => openDialog(product.id)}>
                        <MdDeleteOutline
                          color="#c92a2a"
                          size={20}
                          className="cursor-pointer"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={closeDialog}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
