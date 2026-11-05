import Image from "next/image";

function Avarta({img}) {
  return (
    <div
      className="w-12 h-12"
      style={{
        maskImage: "url('/circle.png')",
        WebkitMaskImage: "url('/circle.png')",
        maskSize: "cover",
        WebkitMaskSize: "cover",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <img
        src={img}
       
        alt="avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default Avarta;
