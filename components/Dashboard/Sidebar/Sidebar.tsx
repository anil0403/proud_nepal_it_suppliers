import { MdSpaceDashboard, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { BsFillLaptopFill } from 'react-icons/bs'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { FaShoppingCart } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { MdAdminPanelSettings } from 'react-icons/md'



interface SidebarProps {
    setActiveTab: any
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
    const brandNames = ['Apple', 'Samsung', 'Sony', 'LG', 'Microsoft'];
    const categories = ['Laptop', 'Desktop Computer', 'Headphone', 'Keyboard', "Mouse", "RYZEN", "INTEL"];

    return (
        <div
            className={`bg-gray-800 text-white w-64 h-[89vh] py-4 px-6 transition-all duration-300 overflow-y-scroll no-scrollbar`}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Admin Panel</h2>
            </div>
            <nav>
                <ul>
                    <li className="mb-2">
                        <div onClick={() => { setActiveTab('dashboard') }} className="flex items-center gap-2 text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                            <MdSpaceDashboard size={20} />
                            Dashboard
                        </div>
                    </li>

                    <li className="mb-2">
                        <div onClick={() => { setActiveTab('manage_brands') }} className="flex gap-2  items-center text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                            <BsFillLaptopFill size={20} />
                            Manage Brands
                        </div>
                    </li>

                    <li className="mb-2">
                        <div onClick={() => { setActiveTab('add_categories') }} className="flex gap-2 items-center text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                            <BiSolidCategoryAlt size={20} />
                            Manage Categories
                        </div>
                    </li>

                    <li className="mb-2">
                        <div onClick={() => { setActiveTab('add_products') }} className="flex gap-2 items-center text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                            <MdOutlineProductionQuantityLimits size={20} />
                            Manage Products
                        </div>
                    </li>
                    <li className="mb-2">
                        <div onClick={() => { setActiveTab('manage_cart') }} className="flex gap-2 items-center text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                            <FaShoppingCart size={20} />
                            Manage Cart
                        </div>
                    </li>
                    <li className="mb-2">
                        <div onClick={() => { setActiveTab('manage_admins') }} className="flex gap-2 items-center text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                            <MdAdminPanelSettings size={20} />
                            Manage Admins
                        </div>
                    </li>
                    <li className="mb-2">
                        <div onClick={() => { setActiveTab('manage_users') }} className="flex gap-2 items-center text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                            <FaUsers size={20} />
                            Manage Users
                        </div>
                    </li>
                    <li className="mb-2">
                        <span className="text-sm font-semibold text-gray-400">Brands</span>
                        <ul className="pl-2">
                            {brandNames.map((brand, i) => (
                                <li key={i} className="mb-1">
                                    <div onClick={() => { setActiveTab(`${brand}`) }} className="flex items-center text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h8m-8 6h16"
                                            />
                                        </svg>
                                        {brand}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="mb-2">
                        <span className="text-sm font-semibold text-gray-400">Categories</span>
                        <ul className="pl-2">
                            {categories.map((category) => (
                                <li key={category} className="mb-1">

                                    <div onClick={() => { setActiveTab(`${category}`) }} className="flex items-center text-blue-300 hover:text-blue-500 transition-all duration-300 cursor-pointer">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h8m-8 6h16"
                                            />
                                        </svg>
                                        {category}
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </li>
                    {/* Add more menu items as needed */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
