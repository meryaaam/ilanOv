import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Button, Feature } from "@/types";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { transform } from "framer-motion"
import AnimatedImage from "@/helpers/AnimatedImage";

const Home = () => {

  const transformer = transform([0, 100], [0, 360], { clamp: true })
  const rotate = transformer(500) // 180

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


  return (
    <>
      <SeoMeta />
      <section className="section pt-14">
        <div className="container">
          <div className="row justify-center">
            <div className="lg:col-6 md:col-6 mb-6 text-center">

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
                      <AnimatedImage
                        src={banner.image}

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


export default Home;
