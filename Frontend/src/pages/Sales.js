import React, { useState, useEffect, useContext } from "react";
import AddSale from "../components/AddSale";
import AuthContext from "../AuthContext";

const Sales = () => {
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [sales, setAllSalesData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSalesData();
      await fetchProductsData();
      await fetchStoresData();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePage]);
  
  // Fetching Data of All Sales
  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/sales/get/${authContext.user}`);
      // console.log("response is ",response)
      if (!response.ok) throw new Error('Failed to fetch sales data');
      const data = await response.json();
      console.log("store data is ",data)
      setAllSalesData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetching Data of All Products
  const fetchProductsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/product/get/${authContext.user}`);
      if (!response.ok) throw new Error('Failed to fetch products data');
      const data = await response.json();
      setAllProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetching Data of All Stores
  const fetchStoresData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/store/get/${authContext.user}`);
      if (!response.ok) throw new Error('Failed to fetch stores data');
      const data = await response.json();
      setAllStores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setShowSaleModal(!showSaleModal);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        {showSaleModal && (
          <AddSale
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            stores={stores}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        
        {/* Loading Indicator */}
        {loading && <div className="text-center">Loading...</div>}
        
        {/* Error Message */}
        {error && <div className="text-red-500 text-center">{error}</div>}
        
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Sales</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addSaleModalSetting}
              >
                Add Sales
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Store Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock Sold
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Sales Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Sale Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {sales.map((element) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.productID?.name || 'no product name'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.storeID?.name || 'no store data'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.stockSold}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(element.saleDate).toLocaleDateString()} {/* Format the date */}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    ${element.totalSaleAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sales;
