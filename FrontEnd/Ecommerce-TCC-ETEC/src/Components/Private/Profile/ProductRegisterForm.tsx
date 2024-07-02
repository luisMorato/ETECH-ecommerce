import { 
  ChangeEvent, 
  FormEvent, 
  useEffect, 
  useState
} from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "react-toastify";

import { DbProducts } from "../../../interfaces/productsProps";
import { categoriesAndSubCategories } from "../../../interfaces/categoriesProps";

import Button from "../../../Components/Layout/Button";

import { checkTextLength } from "../../../utils/checkTextLength";
import { captilze } from "../../../utils/captalize";
import Brands from "../../Products/SideBar/Brands";

interface productRegisterFormProps {
    token: string | undefined
}

const ProductRegisterForm = ({ token }: productRegisterFormProps) => {
    const [productToRegister, setProductToRegister] = useState<Omit<DbProducts, 'id'>>({
        name: '',
        price: 0,
        image: [],
        desc: [],
        stock: 0,
        brand: '',
        category: '',
        subCategory:  ''
    });

    const [categoriesAndSubcategories, setCategoriesAndSubcategories] = useState<categoriesAndSubCategories[]>([]);

    const handleBrandChange = (brand: string) => {
      setProductToRegister({
        ...productToRegister,
        brand: brand
      })
    }

    //Handle the Change From the Inputs in the Form Component
    const handleFormEdit = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, name: string) => {
      setProductToRegister({
        ...productToRegister,
        [name]: e.target.value
      });
    }

    //Handle a Description Topic Add
    const handleDescAdd = () => {
      const descInputValue = (document.getElementById('descInput') as HTMLInputElement).value;

      if(!descInputValue){
        toast.error('Type Some Description to Add');
        return;
      }

      setProductToRegister({
        ...productToRegister,
        desc: [...productToRegister.desc, descInputValue]
      });

      (document.getElementById('descInput') as HTMLInputElement).value = '';
    }

    //Remove a Description Topic
    const removeDescItem = (index: number) => {
      setProductToRegister({
        ...productToRegister,
        desc: productToRegister.desc.filter((_, i) => i !== index)
      });
    }
  
    //Handle the File Input Change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
      if (e.target.files && e.target.files.length > 0) {
        FileValidation(e.target.files, e);

        setProductToRegister({
          ...productToRegister,
          [name]: [...e.target.files]
        });
      }
    }

    //Make the Valitdation Of the Images Selected, checking the MimeType | Quantity of Images | Width and Height
    const FileValidation = (files: FileList, e: ChangeEvent<HTMLInputElement>) => {
      //Check if the quantity of files is more than 4
      if (files.length > 4) {
        toast.error('You can only select up to 4 files');
        e.target.value = '';
        return;
      }

      const validTypes = ["image/jpg", "image/jpeg", "image/png"];

      for(let i=0; i < files.length; i++){
        if(!validTypes.includes(files[i].type)){
          toast.error('Invalid File Type Found');
          e.target.value = '';
          return;
        }
      }

      // for(let i=0; i < files.length; i++){
      //   //Check image width and height
      //   const img = new Image();
      //   const objectUrl = URL.createObjectURL(files[i]);

      //   const { naturalWidth, naturalHeight } = img;
      //   if (naturalWidth !== 1000 || naturalHeight !== 1000) {
      //       toast.error("Por favor, selecione uma imagem com tamanho de 1000x1000 pixels.");
      //       e.target.value = '';
      //       return;
      //   }
      //   URL.revokeObjectURL(objectUrl);
      // }
    }
    
    //Send the data to the Backend To Add a New Product
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = `${import.meta.env.VITE_BACKEND_URL}/products`

        if(productToRegister.desc.length === 0){
          toast.error('Description Is Needed');
          return;
        }

        const formData = new FormData();
            
        Object.keys(productToRegister).forEach((key) => {
          const value = productToRegister[key as keyof Omit<DbProducts, 'id'>];
          if (Array.isArray(value) && value.every(item => item instanceof File)) {
            value.forEach((file) => {
              formData.append('image', file);
            })
          } else {
            formData.append(key, String(value));
          }
        });
        
        try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                  "authorization": `Bearer ${token}`,
              },
              body: formData,
            });

            const resJson = await response.json();
            const { message } = resJson;
        
            if(!response.ok){
              toast.error(message);
              return;
            }

            toast.success(message);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    //Fetch the existing Category and Subcategory
    useEffect(() => {
      const fetchCategories = async () => {
          const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/categories`);

          const response = await fetch(url, {
            method: "GET",
            headers: {
              "content-type": "application/json",
            }
          });

          const resJson = await response.json();

          if(response.ok){
            const { categoriesandSubCategories } = resJson;
            setCategoriesAndSubcategories(categoriesandSubCategories);
          }
        }

        fetchCategories();
    }, []);
  
    return (
      <div className="flex flex-col gap-8 bg-white text-black rounded-xl p-5 mt-5 h-fit w-[550px]">
        <h1 
          className="relative text-3xl font-medium w-fit pb-0.5
          after:absolute
          after:top-full
          after:left-0
          after:bg-mainBlue
          after:h-0.5
          after:w-full"
        >Product Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium">Product Name:</label>
              <input
                name="name"
                type="text" className="focus:outline-none border border-neutral-400 text-neutral-400 placeholder:text-neutral-400 py-1 px-3 rounded-2xl"
                placeholder="Product Name"
                onChange={(e) => handleFormEdit(e, e.target.name)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="Price" className="font-medium">Product Price:</label>
              <input
                name="price"
                type="text"
                className="focus:outline-none border border-neutral-400 text-neutral-400 placeholder:text-neutral-400 py-1 px-3 rounded-2xl"
                placeholder="Price"
                onChange={(e) => handleFormEdit(e, e.target.name)}
              />
            </div>
            <div className="flex items-end gap-1">
              <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="desc" className="font-medium">Description Item:</label>
                <textarea
                  name="desc"
                  id="descInput"
                  placeholder="Description Topic"
                  className="focus:outline-none border border-neutral-400 text-neutral-400 placeholder:text-neutral-400 py-1 px-3 rounded-2xl h-28"
                ></textarea>
              </div>
              <Button 
                type="button" 
                onClick={() => handleDescAdd()} 
                className="border py-1 px-3 w-fit bg-neutral-200 text-black rounded-2xl"
              >Add</Button>
            </div>
            <div>
              <p className="font-medium">Items:</p>
              <ul className="list-disc px-4">
                {productToRegister.desc.length > 0 ?
                  productToRegister.desc.map((descItem, index) => (
                    <li className="flex items-center gap-2 text-black" key={descItem}>
                      <span>- {checkTextLength(descItem, 60)}</span>
                      <button
                        type="button"
                        className="text-red-600 hover:scale-125"
                        onClick={() => removeDescItem(index)}
                      >
                        <FaX size={10} />
                      </button>
                    </li>
                  )) 
                :
                  (<p>No Description Items Added</p>)
                }
              </ul>
            </div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="stock" className="font-medium">Stock Quantity:</label>
              <input
                name="stock"
                type="text"
                className="focus:outline-none border border-neutral-400 text-neutral-400 placeholder:text-neutral-400 py-1 px-3 rounded-2xl"
                placeholder="Stock Quantity"
                onChange={(e) => handleFormEdit(e, e.target.name)}
              />
            </div>
            <div>
                <Brands 
                  setBrand={handleBrandChange}
                  currentBrand={productToRegister.brand}
                />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="font-medium">Category:</label>
              <select
                name="category"
                id="category"
                className="border border-neutral-400 font-medium py-1 px-2 rounded-2xl overflow-hidden"
                onChange={(e) => handleFormEdit(e, e.target.name)}
              >
                <option value="default" className="text-black font-medium">Select Category</option>
                {categoriesAndSubcategories.map((category) => (
                  <option 
                    key={category.id} 
                    value={category.name} 
                    className="text-black font-medium"
                  >
                    {captilze(category.name)}
                  </option>
                ))}
              </select>
            </div>

            {productToRegister.category && 
              <div className="flex flex-col gap-1">
                <label htmlFor="subCategory" className="font-medium">SubCategory:</label>
                <select
                  name="subCategory"
                  id="subCategory"
                  className="border border-neutral-400 font-medium py-1 px-2 rounded-2xl overflow-hidden"
                  onChange={(e) => handleFormEdit(e, e.target.name)}
                >
                  <option value="default" className="text-black font-medium">Select SubCategory</option>
                  {categoriesAndSubcategories.map((category) => (
                    productToRegister.category.includes(category.name) &&
                    category.subCategories.map((subCategory) => (
                      <option 
                        key={subCategory.id} 
                        value={subCategory.name} 
                        className="text-black font-medium"
                      >
                        {subCategory.name}
                      </option>
                    ))
                  ))}
                </select>
              </div>
            }
            
            <div className="flex flex-col gap-1 mt-3">
              <label htmlFor="image" className="font-medium">Select Images:</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                multiple
                className={`border border-neutral-200 rounded-md 
                file:font-medium
                file:text-black/90
                file:bg-neutral-200 
                file:rounded-md 
                file:border-none 
                file:cursor-pointer 
                file:py-1 
                file:mr-4
                hover:file:bg-neutral-300
                `}
                onChange={(e) => handleFileChange(e, e.target.name)}
              />
              <span className="font-medium text-neutral-400 text-sm">PNG, JPG (1000x1000px)</span>
            </div>
            <Button type="submit">Cadastrar</Button>
        </form>
      </div>
    )
}

export default ProductRegisterForm;