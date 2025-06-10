const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 ">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="Giphy logo" className="w-7 h-auto" />
        <img src="/giphy.svg" alt="Giphy logo" className="hidden dark:block" />
        <img
          src="/giphy-dark.svg"
          alt="Giphy logo"
          className="block dark:hidden"
        />
      </div>
    </header>
  );
};

export default Header;
