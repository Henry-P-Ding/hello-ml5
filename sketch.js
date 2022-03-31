// Image classifier method from MobileNet
// note: global variables are defined outside of the scope, but their value can not be set.
let classifier;

// variable with image to be classified
let imgs;

let imageCounter;

// p5 function that preloads these files before classifying the image
// can load larger things asynchronously
function preload() {
    classifier = ml5.imageClassifier('MobileNet');
    const IMAGE_PATHS = ['images/bird.jpeg', 'images/panda.webp', 'images/mouse.webp', 'images/tiger.jpeg', 'images/hippo.jpeg']
    imgs = []
    IMAGE_PATHS.forEach(element => {
        console.log(element)
        imgs.push(loadImage(element));
    });
    console.log(imgs)
}

// setup is called once the program starts
function setup() {
    createCanvas(400, 200 * imgs.length);
    imageCounter = 1;
    for (let i = 0; i < imgs.length; i++) {
        classifier.classify(imgs[i], gotResult);
        imgs[i].resize(100, 100);
        image(imgs[i], 0, 150 * i);
    }
}

// function that draws on the webpage with results
function gotResult(error, results) {
    if (error) { 
        console.error(error);
    } else {
        console.log(results)
        // template literals are enclosed by a back tick `
        text(`Label: ${results[0].label}`, 0, 150 * imageCounter - 30);
        text(`Confidence: ${nf(results[0].confidence, 0, 2)}`, 0, 150 * imageCounter - 15);
        imageCounter += 1;
    }
}

