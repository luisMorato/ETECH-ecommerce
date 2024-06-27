import { useMemo } from "react"

const HardwareSubCategory = () => {
    const hardwareSubCategories: {name: string}[] = useMemo(() => [
        {name: "SSD"},
        {name: "Hard Drive"},
        {name: "RAM Memory"},
        {name: "Video Card"},
        {name: "Motherboards"},
        {name: "Processors"},
        {name: "Power Supply"}
    ], []);

    const currentUrl = new URL(window.location.toString());

    //Set the Hardware SubCategory in the URL State to Persist The Reloads
    const setHardwareSubCategory = (subcategory: string) => {
        currentUrl.searchParams.set('subcategory', subcategory);
        window.history.pushState(null, '', currentUrl);
        window.location.reload();
    }
  
    const currentSubCategory = currentUrl.searchParams.get('subcategory');

    return (
        <div className="flex flex-col gap-2 pl-3">
            <div className="flex gap-1.5">
                <input
                    id={("All").toLowerCase()}
                    name="subcategory"
                    type="radio"
                    className="cursor-pointer"
                    checked={!currentSubCategory || currentSubCategory === "all" ? true : false}
                    onChange={(e) => setHardwareSubCategory(e.currentTarget.id)}
                />
                <label htmlFor="subcategory">All</label>
            </div>
            {hardwareSubCategories.map((subCategory) => (
                <div key={subCategory.name} className="flex gap-1.5">
                    <input
                        id={(subCategory.name).replace(/\s+/g, '').toLowerCase()}
                        name="subcategory"
                        type="radio"
                        className="cursor-pointer"
                        checked={(subCategory.name).replace(/\s+/g, '').toLowerCase() === currentSubCategory}
                        onChange={(e) => setHardwareSubCategory(e.currentTarget.id)}
                    />
                    <label htmlFor="subcategory">{subCategory.name}</label>
                </div>
            ))}
        </div>
    )
}

export default HardwareSubCategory;