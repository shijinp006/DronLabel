import { Navbar } from "../Navbar/navbar";
import { HeroPage } from "../HeroPage/heropage";
import { BestSellers } from "../Bestseller/bestSeller";
export const Display = () => {
    return (<>

        <div >
            <div>  <Navbar /></div>
            <div >  <HeroPage /></div>
            <div >  <BestSellers /></div>

        </div>
    </>
    )
}