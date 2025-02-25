import React from "react"
import { Meteor } from "meteor/meteor";
import { Helmet } from "react-helmet";

export default SEO = ({ title, description, url, image }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <link rel="canonical" href={Meteor.absoluteUrl(url)} />
            <meta name="description" content={description} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image:src" content={image} />

            <meta property="og:title" content={title} />
            <meta property="og:url" content={Meteor.absoluteUrl(url)} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </Helmet>
    )
};