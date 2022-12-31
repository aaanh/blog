---
title: 'Developing a Photo Reel with REST API Cloud Storage'
date: '2022-12-31T15:30:00'
tags: ['api', 'web', 'dev']
draft: false
summary: 'Gotta show off the nice photos.'
---

When I have some free time, I sometimes go out and take photos of the sceneries and the urban landscapes with my camera setups. Usually afterwards I would just post on the usual social media, like Facebook or Instagram. After uploading for a while, I have come to the realization that hosting and serving the images on the usual platform is not the best way because the purpose of the content would get diluted by the noisy neighbours.

I also figured that hosting these on a specialized infrastructure and website would force me to learn new development techniques and knowledge plus the caveats that come with it. So, I set out to build one from scratch.

## Planning

My planning process is as follows:

- Figure out where to host the images
  - What requirements the image hosting infra needs to satisfy?
    - Basic GUI for uploading
    - Rate limiting
    - API support
    - Organization: by year, by tag
  - The pricing
    - Free-tier (cuz I'm always broke 🙏)
  - As long as it uses REST API, we're in business
- Developing the frontend gallery
  - Definitely React/Nextjs (at that time, I didn't know anything else)
  - Simple styling with vanilla Tailwindcss
  - Dynamically loading to save bandwidth and improve performance
  - Dynamically render the images according to the `year` tag
  - Retrieve the image list from the hosting platform
  - Simple gallery that renders the image in auto-sized columns
  - Hover image to zoom in

## Development

For serving an image to a visitor of your website, hosting the images is only half of the equation. Accessing a hosted resource on the cloud can simply be done with a HTTP request even from a terminal shell. Now, a low-tech option is hosting it on a baremetal server off the coast of the Bahamas and serve the assets via static URL with an Apache or NGINX server. Graduating from priamry school, I'd get into hosting a database, more specifically in this case, a NoSQL database for the images. But then, to communicate with the database, I'd need to develop a backend server that supports CRUD operations and REST API, not to mention I'd also have to model the object storage. At this point, I got too lazy so the best thing I had in mind is to outsource that whole headaches to some SaaS products. These SaaS products would usually come with a Content Delivery Network (CDN). [Read more](https://en.wikipedia.org/wiki/Content_delivery_network).

After researching for an image hosting platform and disenchanted by the operational overheading of self-hosting a database + backend, I narrowed down to 2 options: Cloudflare and Cloudinary. Cloudflare, unfortunately as much as I like it, does not have a free-tier plan for images hosting and serving. So, I went with Cloudinary -- which meant that I had to learn a whole new platform from the start.

I created a free account on Cloudinary and set up the stuff. First impression, the UI is a bit busy, but nowhere near the confundus puddle of confusion on AWS. I uploaded some images and tagged them and use the unique API URL to query the data. Everything seemed to go smoothly. The endpoint I tested returned a JSON object containing the all the uploaded images. See the following example.

The cURL request

```sh
curl --location --request GET 'https://api.cloudinary.com/v1_1/some_cloud_name/resources/image' \
--header 'Authorization: Basic SOME=64BIT=ENCODED=SECRET'
```

The response body

```json
{
  "resources": [
      {
        "asset_id": "some_hex_id",
        "public_id": "2022/some_file_name.jpg",
        "format": "jpg",
        "version": 1672194970,
        "resource_type": "image",
        "type": "upload",
        "created_at": "2022-12-28T02:36:10Z",
        "bytes": 1153399,
        "width": 4032,
        "height": 3024,
        "folder": "2022",
        "url": "http://res.cloudinary.com/some_cloud_name/image/upload/some_unique_id/2022/some_file_name.jpg",
        "secure_url": "https://res.cloudinary.com/some_cloud_name/image/upload/some_unique_id/2022/some_file_name.jpg"
      },
    ]
  ...
}
```

LGTM! So I dug further into the documentation and found out how to query by tag -- which is important for me to query the images by year. I also noticed the "Transformations" doc and decided to check out what it is. To my pleasant surprise, Cloudinary has a feature where you can add query params to the request and it would respond with the resized images.

Then, I crafted a GET request with the fetch API + useSWR on the Nextjs application. Like so...

```jsx
export default async (req, res) => {

  const response = await getStaticProps(req.query.year)

  const data = response.props.images.resources?.map((image) => {
    return {
      url: (image.secure_url.substring(0, 45) + "/w_500,c_scale" + image.secure_url.substring(45)),
      public_id: image.public_id,
      folder: image.folder,
      width: image.width,
      height: image.height,
      format: image.format,
    }
  })

  res.status(200).json(data)
}
```

This acts as a middleware that queries my Cloudinary library for images, does some magical string operations that I cooked up and have now forgotten how to generate the correct URL, and outputs that to the Nextjs API endpoint. So every time, I want to retrieve the data, I could fetch the application URL instead of going directly to the Cloudinary endpoint which would save me on the number of requests.

After verifying that the images matching the query are soundly returned in the response body, all that was left was to design the frontend for which I mushed and mashed together some HTML code and Tailwindcss classes. Bing, bam, boom.

## Conclusion

In terms of performance, I have not got to optimizing that much but the website should load almost instantly on first visit because of the minimal size of frontend code that I used for the design. The images on the other hand took quite a bit more, on average 1-2 seconds for the images in a tagged year to load.

I have never reached the rate limitation of the free-tier quota and averages at around 1% plan usage per month. The images were exported in JPG format with Best Quality selected in Lightroom and average at around 1MB each for a running total of ~35 images rendered on the frontend. Disregarding the intial upload size, the images are already transformed into even smaller files in size at around 500KB.

Visit the photo gallery at: [https://photos.aaanh.ca](https://photos.aaanh.ca)

Source code is available at: [ [Github](https://github.com/aaanh/my-photo-reel) ]