import { useMemo } from "react";

const PerfipheralSubCategory = () => {
    const peripheralSubCategories: {name: string}[] = useMemo(() => [
        {name: "Keyboard"},
        {name: "HeadSets"},
        // {name: "MicroPhones"},
        {name: "Mouse"},
        // {name: "MousePad"},
        // {name: "HeadPhones"},
        {name: "Sound Box"},
        {name: "Printers"},
        {name: "Cabinets"},
        {name: "Cables And Adapters"}
    ], []);

    const currentUrl = new URL(window.location.toString());

    //Set the Peripheral SubCategory in the URL State to Persist The Reloads
    const setPeripheralSubCategory = (subcategory: string) => {
        currentUrl.searchParams.set('subcategory', subcategory);
        window.history.pushState(null, '', currentUrl);
        window.location.reload();
    }
  
    const currentSubCategory = currentUrl.searchParams.get('subcategory');
  

    
    return (
        <div>
            <div className="flex flex-col gap-2 pl-3">
                <div className="flex gap-1.5">
                    <input
                        id={("All").toLowerCase()}
                        name="subcategory"
                        type="radio"
                        className="cursor-pointer"
                        checked={!currentSubCategory || currentSubCategory === "all" ? true : false}
                        onChange={(e) => {setPeripheralSubCategory(e.currentTarget.id)}}
                    />
                    <label htmlFor="subcategory">All</label>
                </div>
                {peripheralSubCategories.map((subCategory) => (
                    <div key={subCategory.name} className="flex gap-1.5">
                        <input
                            id={(subCategory.name).replace(/\s+/g, '')}
                            name="subcategory"
                            type="radio"
                            className="cursor-pointer"
                            checked={(subCategory.name).replace(/\s+/g, '') === currentSubCategory}
                            onChange={(e) => {setPeripheralSubCategory(e.currentTarget.id)}}
                        />
                        <label htmlFor="subcategory">{subCategory.name}</label>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default PerfipheralSubCategory;