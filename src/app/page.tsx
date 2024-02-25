import { getListPage } from "@/lib/contentParser"; 
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature } from "@/types"; 
import { transform } from "framer-motion" 
import { Features } from "@/partials/Features"; 
import { StreamlinedExperience } from "@/partials/StreamlinedExperience"; 
import BannerSection from "@/partials/BannerSection"; 
import LayoutCards from "@/partials/LayoutCards";
 
const Home = () => {

  const transformer = transform([0, 100], [0, 360], { clamp: true })
  const rotate = transformer(500)  

  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; dark:string ;content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;
 
  return (
    <>
      <SeoMeta /> 
      <BannerSection />  
      <LayoutCards features={features}/>         
      <Testimonials data={testimonial} />
      <Features   />
      <div className="relative z-10   overflow-x-clip "> 
        <StreamlinedExperience />
      </div>
      <CallToAction data={callToAction} />
    </>
  );
};


export default Home;
