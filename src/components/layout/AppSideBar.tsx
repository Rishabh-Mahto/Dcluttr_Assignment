import { ChevronsUpDownIcon, Users } from "lucide-react";
import { Sidebar } from "./SideNav";
import mamaEarthImg from "@/assets/mamaEarthImg.png";
import boatImg from "@/assets/boatImg.png";
import perforaImg from "@/assets/perforaImg.png";
import { useState } from "react";
import { Plus } from "lucide-react";
import { ChevronsLeft } from "lucide-react";

const FixedSideBar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const [selectedImage, setSelectedImage] = useState(perforaImg);
  const companyImages = [perforaImg, mamaEarthImg, boatImg];

  // Move selected image to the top
  const nonSelectedImages = companyImages.filter(
    (img) => img !== selectedImage
  );

  return (
    <div className="flex flex-col pb-7 h-screen items-center justify-between ">
      <div>
        {" "}
        {/* Selected Brand - Moved to the Top */}
        <div className="my-5">
          <img
            src={selectedImage}
            alt="Selected Brand"
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 rounded-[12px] border-2 border-green-600 cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          {nonSelectedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Company ${index}`}
              className="w-10 h-10 rounded-[12px] my-1.5 border-1 border-[#D9D9D9] cursor-pointer"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div className="w-10 h-10 border-1 border-[#D9D9D9] items-center flex justify-center rounded-[12px] mt-1.5 cursor-pointer">
          <Plus className="w-5 h-5 text-[#1D874F]" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-[18px]">
        <Users size={20} className="text-[#b3aeae]" />
        <div className="flex items-center justify-center text-[12px] font-semibold bg-[#9106FF] w-7 h-7 text-white rounded-full">
          SS
        </div>
      </div>
    </div>
  );
};

function AppSideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="max-w-[288px] h-full bg-[#FFFFFF]">
      <div className="flex w-full">
        <div className="w-[51px]">
          {" "}
          <FixedSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        {isOpen ? (
          <div className=" flex flex-col w-[237px] h-screen">
            <div className=" flex items-center h-[80px] w-full p-5 bg-[#FFFFFF]">
              <div className="flex w-[180px] justify-between items-center border-1 border-grey-400 rounded-[12px] h-[36px] p-1.5">
                {" "}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-[5px] text-[11px] font-semibold bg-[#309E96] w-6 h-6 text-white rounded-[7px]">
                    SS
                  </div>
                  <p className="text-sm font-semibold text-[#031B15]">
                    Test_brand
                  </p>
                </div>
                <ChevronsUpDownIcon className="ml-3 h-4 w-4 text-[#031B15] " />{" "}
              </div>
              <ChevronsLeft
                className="ml-2 h-4 w-4 text-[#027056] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <Sidebar />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AppSideBar;
