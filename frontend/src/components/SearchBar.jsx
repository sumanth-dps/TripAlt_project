//003566
//F5CC00
import SearchBarCore from "./SearchBarCore";

const SearchBar = ({ minimal = false, onSearch, value }) => {

  if (minimal) {
    return (
      <div className="w-full mt-5 px-4 lg:px-10 relative overflow-visible z-50">
        <div className="w-full xl:w-3/4 2xl:w-2/3 mx-auto">
          <SearchBarCore 
            onSearch={onSearch} 
            value={value}   
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-visible z-50">
      <div className="w-full xl:w-3/4 2xl:w-2/3 mx-auto flex flex-col items-center md:items-start bg-blue-50 pb-8 px-4 lg:px-10 gap-6 xl:rounded-b-xl pt-10">

        <h1 className="text-3xl sm:text-4xl md:text-[40px] leading-tight font-semibold text-black text-center md:text-left py-8 mt-10">
          Book top-rated budget hotels <br className="hidden sm:block" /> in India.
        </h1>

        <SearchBarCore 
          onSearch={onSearch} 
          value={value}
        />
      </div>
    </div>
  );
};

export default SearchBar;
