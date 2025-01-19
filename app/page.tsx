import ImageSlider from "@/app/components/ImageSlider";
import SecondHeader from "@/app/components/secondaryheader"
import TopProducts from "./components/Top-products";
import Texts from "@/app/components/HomeTexts";

export default async function Home() {
 
  return (

    <div>
      <ImageSlider />
      <SecondHeader />
      <TopProducts />
      <Texts />
      </div>
  )

}