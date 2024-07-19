import { useEffect, useMemo, useState } from "react";
import { userProps } from "../../../interfaces/userProps";
import TableCells from "../../Layout/TableCells";
import { IoIosSearch } from "react-icons/io";
import { MdArrowBackIosNew, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineArrowForwardIos } from "react-icons/md";
import TableButton from "../../Layout/TableButton";

interface usersListProps {
    token: string | undefined
}

const UsersList = ({ token }: usersListProps) => {
  const currentUrl = useMemo(() => new URL(window.location.toString()), []);

  const [users, setUsers] = useState<userProps[]>([]);
  const [quantity, setQuantity] = useState<number>();

  const currentSearch = currentUrl.searchParams.get('search');
  const [userSearch, setUserSearch] = useState(currentSearch || '');

  const currentPage = currentUrl.searchParams.get('page');
  const pages = useMemo(() => quantity && Math.ceil(quantity / 10), [quantity]) ?? 0;
  const [page, setPage] = useState<number>(Number(currentPage) || 1);
  
  //Fetch All Users Registered in the Database (Only Admin is Allowed)
  useEffect(() => {
    const fetchUsers = async () => {
      const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/user/all`);

      url.searchParams.set('pageIndex', String(page - 1));
      url.searchParams.set('perPage', String(10));
      
      if(userSearch !== ''){
        url.searchParams.set('search', userSearch);
      }

      currentUrl.searchParams.set('page', String(page));
      window.history.pushState(null, '', currentUrl);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });

        const resJson = await response.json();

        if(response.ok){
          const { users: apiUsers, quantity: apiQuantity } = resJson;
          setQuantity(apiQuantity);
          setUsers(apiUsers);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    fetchUsers();
  }, [token, page, userSearch, currentUrl]);

    const nextPage = () => {
      setPage((prevValue) => prevValue >= pages ? prevValue : prevValue + 1);
    }

    const goToFirstPage = () => {
      setPage(1);
    }

    const prevPage = () => {
      setPage((prevValue) => prevValue <= 1 ? prevValue : prevValue - 1);
    }

    const goToLastPage = () => {
      setPage(pages);
    }

  return users && (
    <div className="text-black py-5 max-sm:px-5 max-xl:h-fit max-xl:overflow-x-scroll">
      <h1 
        className="relative text-3xl font-medium w-fit
        after:absolute
        after:top-full
        after:left-0
        after:bg-mainBlue
        after:h-0.5
        after:w-full"
      >Database Users</h1>
      <div className="relative flex items-center gap-1 px-3 my-5 max-w-[272px] text-neutral-400 border border-neutral-400 rounded-2xl sm:max-w-80">
          <span className="group-focus:text-black">
              <IoIosSearch size={25} />
          </span>
          <input
              name="searchDbProduct"
              type="text"
              placeholder="Search User..."
              value={userSearch}
              className="bg-transparent py-1 focus:outline-none flex-1 group"
              onChange={(e) => setUserSearch(e.target.value)}
          />
      </div>
      <div className="border border-neutral-400 rounded-2xl w-fit">
        <table>
          <thead>
            <tr className="border-b border-neutral-400">
              <TableCells>Id</TableCells>
              <TableCells>Name</TableCells>
              <TableCells>Email</TableCells>
              <TableCells className="text-center">State</TableCells>
              <TableCells className="text-center">Role</TableCells>
            </tr>
          </thead>
          <tbody>
              {users.map((user) => (
                <tr className="border-b border-neutral-400" key={user.id}>
                  <TableCells>{ user.id }</TableCells>
                  <TableCells>{ user.name }</TableCells>
                  <TableCells>{ user.email }</TableCells>
                  <TableCells className="text-center">{ user.state ? user.state : <span className="text-neutral-400">Not Setted</span> }</TableCells>
                  <TableCells className="text-center">{ user.role }</TableCells>
                </tr>
              ))}
          </tbody>
          <tfoot>
              <tr>
                <td colSpan={4} className="pl-4 py-2 font-medium">Showing {users.length} of {quantity} Items</td>
                <td className="flex items-center gap-3 py-2">
                    <span className="text-nowrap font-medium">Page {page} of {pages}</span>
                    <div className="flex items-center">
                        <TableButton
                            disabled={page === 1}
                            onClick={goToFirstPage}
                        >
                            <MdKeyboardDoubleArrowLeft size={25} />
                        </TableButton>
                        <TableButton
                            disabled={page === 1}
                            onClick={prevPage}
                        >
                            <MdArrowBackIosNew size={15} />
                        </TableButton>
                        <TableButton
                            disabled={page >= pages}
                            onClick={nextPage}
                        >
                            <MdOutlineArrowForwardIos size={15} />
                        </TableButton>
                        <TableButton
                            disabled={page >= pages}
                            onClick={goToLastPage}
                        >
                            <MdKeyboardDoubleArrowRight size={25} />
                        </TableButton>
                    </div>
                  </td>
              </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default UsersList;