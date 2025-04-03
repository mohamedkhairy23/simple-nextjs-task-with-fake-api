"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const productData = await res.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <></>;
  }

  return (
    <>
      {/* SEO Metadata */}
      <Head>
        <title>{`${product.title} | Best Price Online - FakeStore`}</title>
        <meta name="description" content={product.description} />
        <meta
          name="keywords"
          content={`${product.category}, ${product.title}, online shopping`}
        />
        <meta name="author" content="FakeStore" />
        {/* Open Graph and Twitter Cards for better sharing */}
        <meta property="og:title" content={`${product.title} | Buy Online`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`https://yourdomain.com/product/${id}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* Product Image */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <Image
              src={product.image}
              alt={`Image of ${product.title}`}
              width={300}
              height={800}
              className="mx-auto"
              loading="lazy"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4 capitalize">{product.category}</p>

            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
            </div>

            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={
                    index < Math.round(product.rating.rate)
                      ? "currentColor"
                      : "none"
                  }
                  stroke={
                    index < Math.round(product.rating.rate)
                      ? "none"
                      : "currentColor"
                  }
                  className="size-6 text-yellow-500"
                  aria-label={
                    index < Math.round(product.rating.rate)
                      ? "Star filled"
                      : "Star empty"
                  }
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
