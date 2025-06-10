const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 ">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Giphy logo" className="w-7 h-auto" />
        <img src="/giphy.svg" alt="Giphy logo" />
      </div>
    </header>
  );
};

export default Header;
