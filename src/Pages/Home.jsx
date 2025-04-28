import {Carousel} from '../Components/Carousel';
import { TopHotels } from '../Components/TopHotels';
import { AboutUs } from './AboutUs';
import { ContactUs } from './ContactUs';
export function Home() {

    return (
        <div>
            <Carousel/>

            <TopHotels/>
            <hr className="w-full h-0.2 bg-[#2c4c74] " />
            <AboutUs/>
            <hr className="w-full h-0.2 bg-[#2c4c74] " />
            <ContactUs />
        </div>
    );
}