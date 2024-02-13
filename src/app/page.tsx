import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature } from "@/types";
import Link from "next/link";
"use client"; 
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

const Home = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random values for translation (adjust as needed)
      const randomX = Math.random() * 100 - 50; // Random value between -50 and 50
      const randomY = Math.random() * 100 - 50; // Random value between -50 and 50
      const randomZ = Math.random() * 100 - 50; // Random value between -50 and 50

      // Update translate values
      setTranslateValues({ x: randomX, y: randomY, z: randomZ });
    }, 3000); // Run every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const homepage = getListPage("homepage/_index.md");
  const testimonial = getListPage("sections/testimonial.md");
  const callToAction = getListPage("sections/call-to-action.md");
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;
  const [translateValues, setTranslateValues] = useState({ x: 0, y: 0, z: 0 });
  
  
 



  return (
    <>
      <SeoMeta />
      <section className="section pt-14">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-5 md:col-4 mb-8 text-center">
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
              <div className="lg:col-7 md:col-8 mb-8 text-center">
              
            
            {banner.image && (
              <div className="col-8">
                <ImageFallback
                  src={banner.image}
                  className="mx-auto"
                  width="800"
                  height="420"
                  alt="banner image"
                  style={{ transform: 'translate3d(16.814px, -16.814px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d', willChange: 'transform' }}
                    
                  priority
                />
              </div>
            )}
            </div>
          </div>
        </div>
      </section>

      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
                <ImageFallbackWithTranslate
                
                 src={banner.image}
                 className="mx-auto"
                 width="800"
                 height="420"
                 alt="banner image"
                 priority
                 translateValues={translateValues}
               />
                
                
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <Link
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <Testimonials data={testimonial} />
      <CallToAction data={callToAction} />
    </>
  );
};

const ImageFallbackWithTranslate = ({ src, className, width, height, alt, priority, translateValues }) => {
  return (
    <ImageFallback
      src={src}
      className={className}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
      style={{
        transform: `translate3d(${translateValues.x}px, ${translateValues.y}px, ${translateValues.z}px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    />
  );
};
export default Home;
