function Header() {
    return ( 
        <div className="flex justify-between items-center">
            <div className="bg-pink-50 py-6 px-8">
                <button className="font-semibold tracking-tighter text-xl text-orange-600">#ConnectUs</button>
            </div>
            <div className="mr-8">
                <p className="inline text-sm">Total Employees: </p>
                <span className="text-lg">24</span>
            </div>
        </div>
     );
}

export default Header;