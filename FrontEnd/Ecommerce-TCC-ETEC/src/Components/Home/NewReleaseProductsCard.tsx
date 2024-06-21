interface newReleaseProductsCardProps {
  fisrtLine: string,
  title: string,
  thirdLine: string,
  imgSrc: string,
}

const NewReleaseProductsCard = ({ fisrtLine, title, thirdLine, imgSrc }: newReleaseProductsCardProps) => {
  return (
    <div className="first:bg-black first:text-white flex flex-col justify-center gap-12 pt-5 cursor-pointer bg-white text-black w-[400px] h-[600px] rounded-2xl">
      <div className="ml-7">
        <span className="font-medium">{fisrtLine}</span>
        <h2 className="text-3xl font-bold">{title}</h2>
        <span className="text-nowrap font-medium">{thirdLine}</span>
      </div>
      <div className="flex items-end self-center mt-20 w-[300px] h-[300px]">
        <img 
          src={imgSrc}
          alt="product-productName" 
          className="flex-1"
        />
      </div>
    </div>
  )
}

export default NewReleaseProductsCard;