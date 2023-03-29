const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-900">
      <div className="max-w-7xl px-6 pb-8 pt-8">
        <div className="text-center">
          <p className="text-xs text-gray-400">
          <a href="https://offerzen.gitbook.io/programmable-banking-community-wiki/developer-tools/community-apps">Programmable Banking Community Apps - </a>
          {new Date().getFullYear()} &copy; Made by Badass Zebras </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
