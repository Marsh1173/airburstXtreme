type AudioName = 'tick' | 'click';

export class AudioHandler {
    private static audioToUrlMap: Record<AudioName, string> = {
        tick: 'sounds/tick.wav',
        click: 'sounds/click.wav',
    };
    private static blankAudio = document.createElement('audio');

    public readonly audios = Object.fromEntries(
        Object.keys(AudioHandler.audioToUrlMap).map((key) => [key, AudioHandler.blankAudio]),
    ) as Record<AudioName, HTMLAudioElement>;

    public async load(): Promise<void> {
        /*await Promise.all(
            Object.keys(this.audios).map(
                (audio: string) =>
                    new Promise<HTMLAudioElement>((resolve, reject) => {
                        const audioElement = document.createElement('audio');
                        audioElement.onload = () => {
                            this.audios[audio as AudioName] = audioElement;
                            resolve(audioElement);
                        };
                        const failed = () => {
                            reject();
                        };
                        audioElement.onerror = failed;
                        audioElement.onabort = failed;
                        audioElement.src = AudioHandler.audioToUrlMap[audio as AudioName];
                    }),
            ),
        );*/
    }
}
