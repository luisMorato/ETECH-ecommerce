import { useMemo } from "react";
import { setUrlParam } from "../../../utils/SetUrlParam";

const MonitorsSubCategory = () => {
    const monitorSubCategories: {name: string}[] = useMemo(() => [
        {name: "Gamer Monitors"},
        {name: "Home And Office Monitor"},
        {name: "Monitor And TV Support"},
        {name: "Monitor Accessories"}
      ], []);

    const currentUrl = new URL(window.location.toString());

    //Set the Monitor SubCategory in the URL State to Persist The Reloads
    // const setMonitorSubCategory = (subcategory: string) => {
    //     currentUrl.searchParams.set('subcategory', subcategory);
    //     window.history.pushState(null, '', currentUrl);
    //     window.location.reload();
    // }
  
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
                        defaultChecked
                        checked={!currentSubCategory || currentSubCategory === "all" ? true : false}
                        onChange={(e) => setUrlParam('subcategory', e.currentTarget.id)}
                    />
                    <label htmlFor="subcategory">All</label>
                </div>
                {monitorSubCategories.map((subCategory) => (
                    <div key={subCategory.name} className="flex gap-1.5">
                        <input
                            id={(subCategory.name).replace(/\s+/g, '')}
                            name="subcategory"
                            type="radio"
                            className="cursor-pointer"
                            checked={(subCategory.name).replace(/\s+/g, '') === currentSubCategory}
                            onChange={(e) => setUrlParam('subcategory', e.currentTarget.id)}
                        />
                        <label htmlFor="subcategory">{subCategory.name}</label>
                    </div>
                ))}
            </div>
      </div>
    )
}

export default MonitorsSubCategory;