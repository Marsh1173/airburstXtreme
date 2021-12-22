type ImageName = 'bubbleSVG' | 'bubble1' | 'ball' | 'bounce' | 'balloonPop';

export class ImageHandler {
    private static imageToUrlMap: Record<ImageName, string> = {
        bubbleSVG: 'images/bubbles.svg',
        bubble1: 'images/bubble_1.png',
        bounce: 'images/bounce.png',
        ball: 'images/ball.png',
        balloonPop: 'images/balloonPop.png',
    };
    private static blankImage = document.createElement('img');

    public static readonly images = Object.fromEntries(
        Object.keys(ImageHandler.imageToUrlMap).map((key) => [key, ImageHandler.blankImage]),
    ) as Record<ImageName, HTMLImageElement>;

    public async load(): Promise<void> {
        await Promise.all(
            Object.keys(ImageHandler.images).map(
                (img: string) =>
                    new Promise<HTMLImageElement>((resolve, reject) => {
                        const imgElement = document.createElement('img');
                        imgElement.onload = () => {
                            ImageHandler.images[img as ImageName] = imgElement;
                            resolve(imgElement);
                        };
                        const failed = () => {
                            reject();
                        };
                        imgElement.onerror = failed;
                        imgElement.onabort = failed;
                        imgElement.src = ImageHandler.imageToUrlMap[img as ImageName];
                    }),
            ),
        );
    }
}
