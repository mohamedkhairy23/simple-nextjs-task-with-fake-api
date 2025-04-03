"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateNew = () => {
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const { files } = e.target;

    if (files.length === 0) return;

    const newImage = files[0];

    setFields((prevFields) => ({
      ...prevFields,
      image: newImage,
    }));
  };

  const handleSubmitAddProduct = async (e) => {
    try {
      const formData = new FormData(e.target);
      formData.append("title", fields.title);
      formData.append("description", fields.description);
      formData.append("price", fields.price);
      formData.append("category", fields.category);
      formData.append("image", image);

      const res = await fetch(`https://fakestoreapi.com/products`, {
        method: "POST",
        body: formData,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Product added successfully");
        setFields({
          title: "",
          description: "",
          price: "",
          category: "",
          image: "",
        });
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <section className="bg-blue-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form action={handleSubmit(handleSubmitAddProduct)}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Product
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Enter Product Title"
                  value={fields.title}
                  {...register("title", {
                    required: true,
                    minLength: 3,
                    maxLength: 100,
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm font-bold">
                    {errors.title.type === "minLength" &&
                      "Product name must be at least 3 characters long"}
                    {errors.title.type === "maxLength" &&
                      "Product name must be less than 100 characters long"}
                    {errors.title.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3"
                  rows={4}
                  placeholder="Add an optional description of your product"
                  value={fields.description}
                  {...register("description", {
                    required: true,
                    minLength: 20,
                    maxLength: 300,
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm font-bold">
                    {errors.description.type === "minLength" &&
                      "Product description must be at least 20 characters long"}
                    {errors.description.type === "maxLength" &&
                      "Product description must be less than 300 characters long"}
                    {errors.description.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Add a category of your product"
                  value={fields.category}
                  {...register("category", {
                    required: true,
                    minLength: 3,
                    maxLength: 30,
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
                {errors.category && (
                  <span className="text-red-500 text-sm font-bold">
                    {errors.category.type === "minLength" &&
                      "Product description must be at least 3 characters long"}
                    {errors.category.type === "maxLength" &&
                      "Product description must be less than 30 characters long"}
                    {errors.category.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Add a price of your product"
                  value={fields.price}
                  {...register("price", {
                    required: true,
                    min: 1,
                    max: 30000,
                    onChange: (e) => {
                      handleChange(e);
                    },
                  })}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm font-bold">
                    {errors.price.type === "min" &&
                      "Product price must be at least 1LE"}
                    {errors.price.type === "max" &&
                      "Product price must be less than 30000LE"}
                    {errors.price.type === "required" &&
                      "This field is required"}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Image
                </label>{" "}
                <div className="border rounded p-4 flex flex-col gap-4">
                  {fields?.image && (
                    <div>
                      <div className="relative group">
                        <img
                          src={URL.createObjectURL(fields.image)}
                          className="min-h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    name="image"
                    id="image"
                    className="w-full text-gray-700 font-normal"
                    {...register("image", {
                      required: true,
                      onChange: (e) => {
                        handleImageChange(e);
                      },
                    })}
                  />
                </div>
                {errors.image && (
                  <span className="text-red-500 text-sm font-bold">
                    {errors.image.message}
                  </span>
                )}
              </div>{" "}
              <div>
                <button
                  disabled={isSubmitting}
                  className={`bg-blue-500  text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline ${
                    isSubmitting ? "" : "hover:bg-blue-600"
                  }`}
                  type="submit"
                >
                  {isSubmitting ? "Loading..." : "Add Product"}
                </button>
              </div>
            </form>{" "}
          </div>
        </div>
      </section>
    )
  );
};

export default CreateNew;
