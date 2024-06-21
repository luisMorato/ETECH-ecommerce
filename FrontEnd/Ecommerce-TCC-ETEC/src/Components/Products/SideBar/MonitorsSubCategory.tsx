import { useMemo } from "react";

const MonitorsSubCategory = () => {
    const monitorSubCategories: {name: string}[] = useMemo(() => [
        {name: "Gamer Monitors"},
        {name: "Home and Office Monitor"},
        {name: "Monitor and TV Support"},
        {name: "Monitor Accessories"}
      ], []);

    const currentUrl = new URL(window.location.toString());

    const setMonitorSubCategory = (subcategory: string) => {
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
                        defaultChecked
                        checked={!currentSubCategory || currentSubCategory === "all" ? true : false}
                        onChange={(e) => setMonitorSubCategory(e.currentTarget.id)}
                    />
                    <label htmlFor="subcategory">All</label>
                </div>
                {monitorSubCategories.map((subCategory) => (
                    <div key={subCategory.name} className="flex gap-1.5">
                        <input
                            id={(subCategory.name).replace(/\s+/g, '').toLowerCase()}
                            name="subcategory"
                            type="radio"
                            className="cursor-pointer"
                            checked={(subCategory.name).replace(/\s+/g, '').toLowerCase() === currentSubCategory}
                            onChange={(e) => setMonitorSubCategory(e.currentTarget.id)}
                        />
                        <label htmlFor="subcategory">{subCategory.name}</label>
                    </div>
                ))}
            </div>
      </div>
    )
}

export default MonitorsSubCategory;