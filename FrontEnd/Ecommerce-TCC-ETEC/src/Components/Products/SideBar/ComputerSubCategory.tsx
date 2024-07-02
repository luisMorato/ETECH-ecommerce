import { useMemo } from "react";

interface HardwareSubcategories {
  name: string
}

const ComputerSubCategory = () => {
  const computerSubCategories: HardwareSubcategories[] = useMemo(() => [
    {name: "Gamer Computer"},
    {name: "Computer WorkStation"},
    {name: "House And Office Computer"},
  ], []);

  const currentUrl = new URL(window.location.toString());

  //Set the Computer SubCategory in the URL State to Persist The Reloads
  const setComputerSubCategory = (subcategory: string) => {
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
                  onChange={(e) => setComputerSubCategory(e.currentTarget.id)}
              />
              <label htmlFor="subcategory">All</label>
          </div>
          {computerSubCategories.map((subCategory) => (
              <div key={subCategory.name} className="flex gap-1.5">
                  <input
                      id={(subCategory.name).replace(/\s+/g, '')}
                      name="subcategory"
                      type="radio"
                      className="cursor-pointer"
                      checked={(subCategory.name).replace(/\s+/g, '') === currentSubCategory}
                      onChange={(e) => setComputerSubCategory(e.currentTarget.id)}
                  />
                  <label htmlFor="subcategory">{subCategory.name}</label>
              </div>
          ))}
      </div>
    </div>
  )
}

export default ComputerSubCategory