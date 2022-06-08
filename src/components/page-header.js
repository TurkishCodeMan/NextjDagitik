function PageHeader({
  bgurl = "/dr.png",
  title = "Sağlık Hakkında",
  description = "Sağlığın başlangıcı hastalığı tanımaktır.",
}) {
  return (
    <div
      className={`relative w-full text-center z-0 my-3 rounded-md overflow-hidden`}
      style={{ backgroundImage: `url(${bgurl})` }}
  

    >
      <div className="overlay z-10 bg-gray-700 opacity-50 absolute w-full h-full"></div>
      <div className="w-full h-full z-50 relative">
        <span className="text-lightBlue-500 bg-lightBlue-200 text-xs font-bold inline-block py-1  uppercase last:mr-0 mr-1 leading-tight rounded px-2">
          Blog Yazıları
        </span>
        <h3 className="text-3xl font-bold mt-3 mb-1 text-white">
          {title}
        </h3>
        <p className="mt-2 mb-4 text-lg leading-relaxed text-white">
          {description}
        </p>
      </div>
    </div>
  );
}

export default PageHeader;
