import Emitter from './emitter'

type MediaType = 'Video' | 'Audio'

export class MediaDevice extends Emitter {
  private stream: MediaStream | undefined

  start(_?: unknown) {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        this.stream = stream
        this.emit('stream', stream)
      })
      .catch(console.error)

    return this
  }

  toggle(type: MediaType, on?: unknown) {
    if (this.stream) {
      this.stream[`get${type}Tracks`]().map((t: MediaStreamTrack) => ({
        ...t,
        enabled: on ? on : !t.enabled,
      }))
    }

    return this
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop())
    }
    this.off()

    return this
  }
}
