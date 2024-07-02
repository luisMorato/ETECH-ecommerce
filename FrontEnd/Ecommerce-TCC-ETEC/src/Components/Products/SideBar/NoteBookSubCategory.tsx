import { useMemo } from "react";

const NoteBookSubCategory = () => {
    const notebookSubCategories: {name: string}[] = useMemo(() => [
        {name: "NoteBooks"},
        {name: "Notebook Gamer"},
        {name: "Charges And Sources"},
    ], []);

    const currentUrl = new URL(window.location.toString());

    //Set the Notebook SubCategory in the URL State to Persist The Reloads
    const setNotebooksSubCategory = (subcategory: string) => {
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
                    onChange={(e) => setNotebooksSubCategory(e.currentTarget.id)}
                />
                <label htmlFor="subcategory">All</label>
            </div>
            {notebookSubCategories.map((subCategory) => (
                <div key={subCategory.name} className="flex gap-1.5">
                    <input
                        id={(subCategory.name).replace(/\s+/g, '')}
                        name="subcategory"
                        type="radio"
                        className="cursor-pointer"
                        checked={(subCategory.name).replace(/\s+/g, '') === currentSubCategory}
                        onChange={(e) => setNotebooksSubCategory(e.currentTarget.id)}
                    />
                    <label htmlFor="subcategory">{subCategory.name}</label>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NoteBookSubCategory