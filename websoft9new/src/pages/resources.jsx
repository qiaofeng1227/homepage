import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { normalizedData } from "@utils";
import Seo from "@components/seo";
import Layout from "@layout";
import Header from "@layout/header/layout-01";
import Footer from "@layout/footer/layout-01";
import HeroArea from "@containers/hero/layout-01";
import PartnerArea from "@containers/partner/layout-01";
import ITSolutionArea from "@containers/it-solution/layout-01";
import AboutServiceWrap from "@containers/about-service-wrap";
import AboutArea from "@containers/about/layout-01";
import ITServiceArea from "@containers/it-service/layout-01";
import FunfactArea from "@containers/funfact/layout-01";
import CtaArea from "@containers/cta/layout-01";
import CaseStudyArea from "@containers/case-study/layout-01";
import TestimonialArea from "@containers/testimonial/layout-01";
import BlogArea from "@containers/blog/layout-01";
import ContactArea from "@containers/contact/layout-01";
import {Trans, useTranslation,Link, useI18next} from 'gatsby-plugin-react-i18next';

const ResourcesPage = ({ location, data }) => {
    const content = normalizedData(data?.page.content || []);
    const globalContent = normalizedData(data?.allGeneral.nodes || []);
    const {language, languages, changeLanguage } = useI18next();
    
    return (
        <Layout location={location}>
            <Seo title="Home" />
            <Header
                data={{
                    ...globalContent["header"],
                    ...globalContent["menu"],
                }}
            />
            <main className="site-wrapper-reveal">

                <HeroArea data={content["hero-section"]} />

                <PartnerArea data={{items: data.allContentfulBaseBrand.nodes,}} />
                
                <ITSolutionArea
                    data={{
                        ...content["feature-section"],
                        items: data.allItSolution.nodes,
                    }}
                />
                

                <ContactArea data={content["contact-section"]} />
            </main>
            <Footer data={{ ...data.site.siteMetadata }} />
        </Layout>
    );
};

export const query = graphql`
    query ResourcesPageQuery($language: String!) {
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        allContentfulBaseBrand(
            filter: {key: {in: ["alibabacloud", "aws", "tencentcloud", "huaweicloud", "azure"]}, node_locale: {eq: $language}}
            ) {
            nodes {
                    id:key
                    image:logo {
                        src:url
                    }
                    path:storeurl
                }
            }
        allGeneral {
            nodes {
                section
                ...HeaderOne
            }
        }
        site {
            ...Site
        }
        page(title: { eq: "infotechno" }, pageType: { eq: "frontpage" }) {
            content {
                ...PageContent
            }
        }
        allItSolution(
            sort: { order: DESC, fields: id }
            filter: { is_featured: { eq: true } }
            limit: 3
        ) {
            nodes {
                ...ItSolutionTwo
            }
        }
    }
`;

ResourcesPage.propTypes = {
    location: PropTypes.shape({}),
    data: PropTypes.shape({
        page: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        allGeneral: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                socials: PropTypes.arrayOf(PropTypes.shape({})),
            }),
        }),
    }),
};

export default ResourcesPage;
