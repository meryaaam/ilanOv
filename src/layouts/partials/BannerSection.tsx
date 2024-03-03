import LineDrawingAnimation from "@/components/LineDrawingAnimation";
import AnimatedImage from "@/helpers/AnimatedImage"; 
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import { Button,  Feature } from "@/types";
import Link from "next/link";
import { motion } from 'framer-motion';
import AnimatedSvg from "@/helpers/AnimatedSvg";
import { Banner } from "@/helpers/Banner";

const homepage = getListPage("homepage/_index.md");
 const { frontmatter } = homepage;
const {
  banner,
  features,
}: {
  banner: { title: string; image: string; dark:string ;content?: string; button?: Button };
  features: Feature[];

} = frontmatter;

const BannerSection = () => {
  return (
    <>
   
       <section className="section pt-14">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-6 md:col-6 mb-6 text-center">
             
              <br/>
              
                <h1 
                  className="mb-4 text-h3 lg:text-h1"
                  dangerouslySetInnerHTML={markdownify(banner.title)}
                />
               
                  
                <p
                  className="mb-8"
                  dangerouslySetInnerHTML={markdownify(banner.content ?? "")}
                />

                {banner.button!.enable && (
                  <Link
                    className="btn btn-primary"
                    href={banner.button!.link}
                    target={
                      banner.button!.link.startsWith("http") ? "_blank" : "_self"
                    }
                    rel="noopener"
                  >
                    {banner.button!.label}

                  </Link>
                )}
              </div>

              <div className="lg:col-6 md:col-6 mb-8 text-center">
               {banner.image && (
                    <div className="col-10"> 
                      <AnimatedImage /> 
                    </div>
                  )}

                
            </div>
            
          </div>
        </div>
      </section>
      
    </>
  );
};

export default BannerSection;
