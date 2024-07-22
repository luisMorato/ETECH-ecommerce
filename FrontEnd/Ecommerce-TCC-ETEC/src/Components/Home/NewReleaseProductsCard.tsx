interface newReleaseProductsCardProps {
  fisrtLine: string,
  title: string,
  thirdLine: string,
  imgSrc: string,
}

const NewReleaseProductsCard = ({ fisrtLine, title, thirdLine, imgSrc }: newReleaseProductsCardProps) => {
  return (
    <div 
      className="first:bg-black first:text-white flex flex-col justify-center gap-12 pt-5 px-8 cursor-pointer bg-white text-black rounded-2xl h-[550px] last:h-[500px] w-[360px]
      max-sm:w-[340px]
      sm:w-fit
      md:h-[600px]
      md:last:h-[600px]
      md:last:justify-self-start"
    >
      <div>
        <span className="font-medium">{fisrtLine}</span>
        <h2 className="text-3xl font-bold">{title}</h2>
        <span className="text-nowrap font-medium">{thirdLine}</span>
      </div>
      <div className="flex items-end self-center mt-20 h-[300px] w-[280px]
      lg:w-[300px]">
        <img
          draggable={false}
          src={imgSrc}
          alt="product-productName" 
          className="flex-1"
        />
      </div>
    </div>
  )
}

export default NewReleaseProductsCard;