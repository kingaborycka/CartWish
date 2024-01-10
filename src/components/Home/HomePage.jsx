import React from 'react'
import HeroSection from './HeroSection';

import iphone from "../../assets/iphone-14-pro.webp"
import mac from "../../assets/mac-system-cut.jfif"
import FeaturedProducts from './FeaturedProducts';

const HomePage = () => {
  return (
    <div>
        <HeroSection 
          title="Buy IPhone 14 Pro" 
          subtitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
          Laboriosam dicta dolorem saepe officiis, eaque nam?"
          link="/product/659158cd08ad77a57bbac65d"
          image={iphone}
        />

        <FeaturedProducts/>

        <HeroSection 
          title="Build the ultimate setup" 
          subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini."
          link="/product/659158cd08ad77a57bbac665"
          image={mac}
        />
    </div>
  )
}

export default HomePage