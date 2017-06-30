---
title: Machine Learning for Africa's Grid
---
#### Results of Applying Our Skynet Model



## Summary
We demonstrated the feasibility of using Skynet to detect high voltage lines at very low resolutions using a previously unused imagery band called SAR-C. We also demonstrated that readily available optical imagery sources with existing training data, even at the highest resolutions, cannot detect power lines. However, we identified several new approaches methods that could make optical imagery workable.


## Background
### SAR-C Images
![Sentinel-1 SAR Imaging Satellite](./assets/graphics/content/Sentinel-1_radar_vision.jpg "Sentinel-1 SAR Imaging Satellite")
SAR-C images are captured in the same band of radio waves that wifi uses. In many respects, they are simpler to deal with than optical images - they don’t have clouds or shadows. They are also readily available. The ESA provides global SAR coverage with it’s Sentinel-1 constellation of satellites.

Usually, SAR images measure  “surface roughness” (though they can also be used to measure a variety of other things, like terrain altitude). Very smooth surfaces, like desert, appear black, and rough surfaces like trees appear lighter. Somewhat rough surfaces like grass are grey.
![Rainforest and desert the SAR-C band. The desert is black, while the rainforest is orange with yellow spots.](./assets/graphics/content/rainforest-desert.png "Rainforest and desert the SAR-C band. The desert is black, while the rainforest is orange with yellow spots.")
SAR reflects off of artificial surfaces like concrete  and metal, making it useful for estimating population density. This property is also uniquely useful for detecting the power grid.
![In this SAR image, the outline ot Tokyo is clearly visible agianst the less populated areas around it. The city center is brightest.](./assets/graphics/content/tokyo.png "In this SAR image, the outline ot Tokyo is clearly visible agianst the less populated areas around it. The city center is brightest.")
Since many high voltage power pylons are made of steel, their glare is visible even at very low resolutions. The power grid shows clearly as rows of dots even when it is invisible in optical images.
![In the SAR image, the powerline appears as a row of yellow dots. The powerline is not decernable from the optical image.](./assets/graphics/content/sar-optical.png "In the SAR image, the powerline appears as a row of yellow dots. The powerline is not decernable from the optical image.")
### Machine Learning Using Satellite Images and Map Features
To detect whether a tiles has a power line in it, the computer uses a labeled dataset (tiles where it’s known for sure whether or not there’s a powerline) to make a guess about whether there’s a powerline in an unlabeled tile. We label the dataset using features from maps like OpenStreetMap or the Africa Grid Explorer.
To make valid predictions, the computer must have a lot (thousands) of accurate labeled tiles. This approach works really well for finding streets and buildings because there are typically lots of accurate OSM features to use. It’s more challenging to use for power grid detection because powerlines are a lot less common.
## Results
### Optical Images
Results
Optical Images
Even with the best training data, powerlines in low resolution optical images could not be detected. However, it is possible that this is not a fundamental limitation, but caused by our data processing. Our current data processing setup imposes several limitations which, if resolved, could make optical imagery effective at this task.
Currently, we use an approach called semantic segmentation, where we ask the computer to “draw” the lines on the image. However, zoomed this far in, the difference between the physical location of the powerline and the location reported in Africa Grid Explorer is significant. The location of the line on the image therefore uncorrelated with the “correct” answer provided by the label. The program has no information it can use to make guesses.
![Despite the powerlines being clearly visible, the program cannot find them](./assets/graphics/content/failed-optical.png "Despite the powerlines being clearly visible, the program cannot find them")
We are working on switching to a different method, image classification, where the computer merely guesses whether or not the image container a power line. This has some disadvantages - it requires more labeled data and more data preprocessing. However, it should make it possible to use less accurate maps as labels.

Another contributing factor to the lack of success in using optical images is the image file format we use. Currently, all of the satellite images we use are downloaded as JPEGs, a format reduces file size by distorting sharp edges in images. Because we are trying to detect tiny objects with sharp edges (powerlines and pylons), JPEG makes them less visible.

![Applying JPEG compression added noise around the edge of this letter T](./assets/graphics/content/jpeg-issue.png "Applying JPEG compression added noise around the edge of this letter T")
