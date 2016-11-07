## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

###Part 1: Optimized PageSpeed Insights score for index.html

1. Moved analytics code at the bottom of the page.
2. Moved all the styles on this page.
3. Loading google font in more optimised way.
4. Added media print seperately.
5. Copressed and resized all images.
6. Loading scripts asynchronously. 

Click [here](https://manishbisht.me/Udacity/FrontEnd%20Web%20Developer%20Nanodegree/P4%20-Website%20Optimization/) to view the complete optimised page.
 
Google PageSpeed Insights Desktop: 91/100 , Mobile : 90/100
 
###Part 2: Optimize Frames per Second in pizza.html

1. Used more performant DOM element selectors getElementsbyClassName.
2. Removed unwanted calculations from the ChangePizzaSizes loop.
3. Removed determineDx function and optimised calculations.
4. Moved repeted calculations outside of the loop in updatePositions function. 
5. Added a scroll function to use the requestAnimationFrame API to optimize concurrent animations. 
 

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>