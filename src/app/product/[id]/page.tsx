import { useRouter } from "next/router";
import { Card } from "@/components/ui/card";

const productImgs =  [
  "/products/z1.png",
  "/products/z6.png",
  "/products/6d2.png",
  "/products/z8.png",
  
  "/products/z5.png",
  "/products/z2.png",
  "/products/z3.png",
  "/products/z4.png",
  
  
  "/products/z7.png",


  "/products/1d.png",
  "/products/3d.png",
  "/products/2b.png",
  
  // "/products/5d.png",
  
  "/products/1b.png",
  "/products/8b.png",
  "/products/2d.png",
  "/products/7b.png",
  "/products/4d.png",
  // "/products/3b.png",

  "/products/4b.png",
  "/products/4b.png",
  "/products/6b.png",
  
  "/products/5b.png",
  "/products/7d.png",
  "/products/1b.png",

  
  
  // "/products/1.jpg",
  
  // "/products/4.jpg",
  // "/products/3.jpg",

    "/products/5b.png",
  "/products/6b.png",
  "/products/7b.png",
  "/products/2b.png",

  "/products/9b.png",
  
  "/products/6.webp",
  "/products/7.webp",
  "/products/5.jfif",
  "/products/2.jpg",
  "/products/1b.jfif",
  "/products/2b.jfif",
  "/products/3b.jfif",
  "/products/4b.jfif",
  "/products/5b.jfif",
  "/products/6b.jfif",
  "/products/7b.jfif",
  "/products/9b.jfif",
  "/products/8b.jfif",
  "https://discount-drugmart.com/wp-content/uploads/2024/05/View-All.png",
  "https://winternetweb.com/wp-content/uploads/2024/09/IMG_4223-scaled.jpeg",

]

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const img = productImgs[id % productImgs.length];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Card className="w-80 h-80 flex items-center justify-center mb-6">
        <img src={img} alt={`Product ${id + 1}`} className="object-cover w-full h-full" />
      </Card>
      <h1 className="text-2xl font-bold mb-2 text-type2">Product #{id + 1}</h1>
      <p className="text-type1 text-lg mb-4">This is a placeholder for the product description.</p>
      <button className="bg-green-700 text-white px-6 py-2 rounded shadow">Add to Cart</button>
    </div>
  );
}
