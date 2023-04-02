import { Emitter } from './emitter'
import { MediaDevice } from './media-device'
import { socket } from './socket'
import { socketConfig } from './constants'

export class PeerConnection extends Emitter {
  private pc: RTCPeerConnection
  private remoteId: string
  public mediaDevice: MediaDevice

  constructor(remoteId: string) {
    super()
    this.remoteId = remoteId

    this.pc = new RTCPeerConnection(socketConfig)
    this.pc.onicecandidate = ({ candidate }) => {
      socket.emit('call', {
        to: this.remoteId,
        candidate,
      })
    }
    this.pc.ontrack = ({ streams }) => {
      this.emit('remoteStream', streams[0])
    }

    this.mediaDevice = new MediaDevice()
    this.getDescription = this.getDescription.bind(this)
  }

  start(isCaller: boolean, config: unknown) {
    this.mediaDevice
      .on('stream', (stream) => {
        stream.getTracks().forEach((t) => {
          this.pc.addTrack(t, stream)
        })

        this.emit('localStream', stream)

        isCaller ? socket.emit('request', { to: this.remoteId }) : this.createOffer()
      })
      .start(config)

    return this
  }

  stop(isCaller?: boolean) {
    if (isCaller) {
      socket.emit('end', { to: this.remoteId })
    }
    this.mediaDevice.stop()
    this.pc.restartIce()
    this.off()

    return this
  }

  createOffer() {
    this.pc.createOffer().then(this.getDescription).catch(console.error)

    return this
  }

  createAnswer() {
    this.pc.createAnswer().then(this.getDescription).catch(console.error)

    return this
  }

  getDescription(desc: RTCLocalSessionDescriptionInit) {
    this.pc.setLocalDescription(desc)

    socket.emit('call', { to: this.remoteId, sdp: desc })

    return this
  }

  setRemoteDescription(desc: RTCSessionDescriptionInit) {
    this.pc.setRemoteDescription(new RTCSessionDescription(desc))

    return this
  }

  addIceCandidate(candidate: RTCIceCandidateInit) {
    if (candidate) this.pc.addIceCandidate(new RTCIceCandidate(candidate))

    return this
  }
}
