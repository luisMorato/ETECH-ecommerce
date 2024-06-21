import { useMemo } from "react";
import NewReleaseProductsCard from "./NewReleaseProductsCard";

const NewRelease = () => {
  const products = useMemo(() => [
    {
      fisrtLine: "Clear Sound",
      title: "AirPods Max",
      thirdLine: "From $650 or $27,10/mo. for 24 mo.",
      imgSrc: "/Images/AirPods-Max.png",
    },
    {
      fisrtLine: "SmartPhones",
      title: "Iphone 15 Pro Max",
      thirdLine: "From $1000 or $41,66/mo. for 24 mo.",
      imgSrc: "/Images/Iphone-15-Pro-Max.png",
    },
    {
      fisrtLine: "NoteBooks",
      title: "MacBook Pro",
      thirdLine: "From $3250 or $135,41/mo. for 24 mo.",
      imgSrc: "/Images/MacBook-Pro.png",
    },
  ], []);

  return (
    <div id="newlyReleased" className="flex items-center justify-center gap-5 w-4/5 mx-auto mt-5">
        {products.map((product) => (
            <NewReleaseProductsCard 
              key={product.title}
              fisrtLine={product.fisrtLine}
              title={product.title}
              thirdLine={product.thirdLine}
              imgSrc={product.imgSrc}
            />
        ))}
    </div>
  )
}

export default NewRelease;