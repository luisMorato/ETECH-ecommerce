import { useMemo } from "react";

const SmartphoneSubCategory = () => {
  const smartphoneBrands: HardwareBrands[] = useMemo(() => [
    {name: "Apple"},
    {name: "ASUS"},
    {name: "Razer"},
    {name: "Samsung"},
    {name: "Sony"},
    {name: "Xiaomi"}
  ], []);
  
  return (
    <div>SmartphoneSubCategory</div>
  )
}

export default SmartphoneSubCategory;