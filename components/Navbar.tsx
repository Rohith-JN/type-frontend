const Navbar = () => {

  return (
    <div className="w-full flex justify-center items-center fixed top-4">
      <div className="w-3/5 h-10 rounded flex flex-row">
        <div className="flex-row flex justify-between w-full items-center h-16">
          <h1 className="text-5xl text-tertiary font-lexend">Type</h1>
          <div className="w-2/5 h-12 bg-sub-alt rounded-xl mt-2 flex flex-row justify-around items-center">
            <h1 className="text-sub text-lg hover:text-white cursor-pointer font-lexend">type</h1>
            <h1 className="text-sub text-lg hover:text-white cursor-pointer font-lexend">account</h1>  
            <h1 className="text-sub text-lg hover:text-white cursor-pointer font-lexend">leaderboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;